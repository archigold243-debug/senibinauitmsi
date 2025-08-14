import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRoomContext } from "@/contexts/RoomContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const LecturerAdminPanel: React.FC = () => {
  const { lecturers, updateLecturer } = useRoomContext();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<(typeof lecturers)[0]>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPhotoURL, setLocalPhotoURL] = useState<string | null>(null);

  // Store user_credentials mapping
  const [credentialsMap, setCredentialsMap] = useState<Record<string, { photo: string; roomID: string }>>({});

  // Fetch user_credentials once on mount
  useEffect(() => {
    const fetchCredentials = async () => {
      const { data, error } = await supabase.from("user_credentials").select("id, photo, roomID");
      if (error) {
        console.error(error);
        toast.error("Failed to fetch user credentials");
        return;
      }
      const map: Record<string, { photo: string; roomID: string }> = {};
      data.forEach((row) => {
        map[row.id] = { photo: row.photo, roomID: row.roomID };
      });
      setCredentialsMap(map);
    };
    fetchCredentials();
  }, []);

  const startEdit = (lect) => {
    // Merge lecturer data with user_credentials values if present
    const creds = credentialsMap[lect.id] || {};
    setEditId(lect.id);
    setForm({
      ...lect,
      photo: creds.photo ?? lect.photo,
      roomID: creds.roomID ?? lect.roomID,
    });
    setSelectedFile(null);
    setLocalPhotoURL(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setLocalPhotoURL(URL.createObjectURL(file));

      const ext = file.name.split(".").pop();
      const safeName = `${form.id || "lecturer"}_${Date.now()}.${ext}`;
      setForm((curr) => ({
        ...curr,
        photo: safeName,
      }));

      toast.info("Image selected; will be uploaded to Supabase on save");
    }
  };

  const handleSave = async () => {
    if (editId && form.displayName?.trim() && form.surname?.trim()) {
      let photoUrl = form.photo ?? "";

      if (selectedFile) {
        const filePath = `${editId}/${form.photo}`;
        const { error: uploadError } = await supabase
          .storage
          .from("lecturer-photos")
          .upload(filePath, selectedFile, { upsert: true });

        if (uploadError) {
          toast.error("Photo upload failed");
          return;
        }

        const { data: publicData } = supabase
          .storage
          .from("lecturer-photos")
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          photoUrl = publicData.publicUrl;
        }
      }

      // Update lecturer in context
      updateLecturer(editId, {
        displayName: form.displayName!.trim(),
        surname: form.surname!.trim(),
        floor: form.floor ?? "",
        roomID: form.roomID ?? "",
        photo: photoUrl,
      });

      // Update in user_credentials table
      const { error: dbError } = await supabase
        .from("user_credentials")
        .update({
          photo: photoUrl,
          roomID: form.roomID ?? "",
        })
        .eq("id", editId);

      if (dbError) {
        console.error(dbError);
        toast.error("Failed to update user_credentials");
      }

      toast.success("Lecturer info updated!");
      setEditId(null);
      setForm({});
      setSelectedFile(null);
      setLocalPhotoURL(null);
    } else {
      toast.error("Full name and surname are required");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({});
    setSelectedFile(null);
    setLocalPhotoURL(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Lecturers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lecturers.map((lect) => {
            const creds = credentialsMap[lect.id] || {};
            return editId === lect.id ? (
              <div
                key={lect.id}
                className="p-4 border rounded-lg bg-muted/20 flex flex-col gap-2"
              >
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[180px]">
                    <Label htmlFor={`displayName-${lect.id}`}>Name</Label>
                    <Input
                      id={`displayName-${lect.id}`}
                      name="displayName"
                      value={form.displayName ?? ""}
                      onChange={handleChange}
                      className="mb-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[160px]">
                    <Label htmlFor={`surname-${lect.id}`}>Surname</Label>
                    <Input
                      id={`surname-${lect.id}`}
                      name="surname"
                      value={form.surname ?? ""}
                      onChange={handleChange}
                      className="mb-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <Label htmlFor={`floor-${lect.id}`}>Floor</Label>
                    <Input
                      id={`floor-${lect.id}`}
                      name="floor"
                      value={form.floor ?? ""}
                      onChange={handleChange}
                      className="mb-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[180px] flex flex-col gap-2">
                    <Label>Current Photo</Label>
                    <img
                      src={localPhotoURL || form.photo || creds.photo || lect.photo || "/placeholder.svg"}
                      alt={form.displayName ?? lect.displayName}
                      className="w-14 h-14 rounded-full object-cover border mb-2"
                    />
                    <div>
                      <Label htmlFor={`photo-upload-${lect.id}`}>Upload new photo</Label>
                      <Input
                        id={`photo-upload-${lect.id}`}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFile}
                        className="block w-full mb-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`photo-${lect.id}`}>Photo filename</Label>
                      <Input
                        id={`photo-${lect.id}`}
                        name="photo"
                        value={form.photo ?? ""}
                        onChange={handleChange}
                        className="mb-1"
                        placeholder="Stored filename in Supabase"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <Label htmlFor={`roomID-${lect.id}`}>Room ID</Label>
                    <Input
                      id={`roomID-${lect.id}`}
                      name="roomID"
                      value={form.roomID ?? creds.roomID ?? ""}
                      onChange={handleChange}
                      className="mb-1"
                      placeholder="Enter Room ID"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button onClick={handleSave} size="sm">
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} size="sm">
                    Cancel
                  </Button>
                </div>
                <div className="text-xs text-gray-400 mt-2 italic">
                  Note: <b>Room ID</b> links lecturers to their floor hotspot — update here if lecturer moves rooms.
                </div>
              </div>
            ) : (
              <div
                key={lect.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex flex-col sm:flex-row flex-1 gap-3 sm:items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={creds.photo || lect.photo || "/placeholder.svg"}
                      alt={lect.displayName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-semibold">
                        {lect.displayName}{" "}
                        <span className="text-gray-400 font-normal">
                          {lect.surname}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Floor: {lect.floor} | Room: {creds.roomID || lect.roomID}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="ml-3"
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(lect)}
                >
                  Edit
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LecturerAdminPanel;
