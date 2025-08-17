import React, { useState } from "react";
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

  const startEdit = (lect) => {
    setEditId(lect.id);
    setForm({ ...lect });
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
        photo_url: safeName,
      }));

      toast.info("Image selected; will be uploaded to Supabase on save");
    }
  };

  const handleSave = async () => {
    if (editId && form.username?.trim() && form.surname?.trim()) {
      let photoUrl = form.photo_url ?? "";

      if (selectedFile) {
        const filePath = `${editId}/${form.photo_url}`;
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

      try {
        // ✅ First update Supabase directly (respects RLS)
        const { error: dbError } = await supabase
          .from("user_credentials")
          .update({
            floor: form.floor ?? "",
            roomID: form.roomID ?? "",
            photo_url: photoUrl,
          })
          .eq("id", editId);

        if (dbError) {
          console.error("Supabase update error:", dbError);
          toast.error("Failed to update lecturer in database");
          return;
        }

        // ✅ Then update local state
        await updateLecturer(editId, {
          username: form.username!.trim(),
          surname: form.surname!.trim(),
          floor: form.floor ?? "",
          roomID: form.roomID ?? "",
          photo_url: photoUrl,
        });

        toast.success("Lecturer info updated!");
        setEditId(null);
        setForm({});
        setSelectedFile(null);
        setLocalPhotoURL(null);
      } catch (error) {
        toast.error("Failed to update lecturer");
        console.error("Update error:", error);
      }
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
          {lecturers.map((lect) =>
            editId === lect.id ? (
              <div
                key={lect.id}
                className="p-4 border rounded-lg bg-muted/20 flex flex-col gap-2"
              >
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[180px]">
                    <Label htmlFor={`username-${lect.id}`}>
                      Name <span className="text-xs text-gray-400">(fixed)</span>
                    </Label>
                    <Input
                      id={`username-${lect.id}`}
                      name="username"
                      value={lect.username}
                      readOnly
                      tabIndex={-1}
                      className="bg-gray-100 text-gray-500 cursor-not-allowed border-dashed border-2 border-gray-300 opacity-80"
                    />
                  </div>
                  <div className="flex-1 min-w-[160px]">
                    <Label htmlFor={`surname-${lect.id}`}>
                      Surname <span className="text-xs text-gray-400">(fixed)</span>
                    </Label>
                    <Input
                      id={`surname-${lect.id}`}
                      name="surname"
                      value={lect.surname}
                      readOnly
                      tabIndex={-1}
                      className="bg-gray-100 text-gray-500 cursor-not-allowed border-dashed border-2 border-gray-300 opacity-80"
                    />
                  </div>
                  <div className="flex-1 min-w-[180px] flex flex-col gap-2">
                    <Label>Current Photo</Label>
                    <img
                      src={localPhotoURL || form.photo_url || lect.photo_url || "/placeholder.svg"}
                      alt={form.username ?? lect.username}
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
                        name="photo_url"
                        value={form.photo_url ?? ""}
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
                      value={form.roomID ?? ""}
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
                  Note: <b>Name and Surname</b> are fixed. <b>Room ID</b> can be updated when lecturers move rooms.
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
                      src={lect.photo_url || "/placeholder.svg"}
                      alt={lect.username}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-semibold">
                        {lect.title ? `${lect.title} ` : ''}{lect.username}{" "}
                        <span className="text-gray-400 font-normal">
                          {lect.surname}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Floor: {lect.floor} | Room: {lect.roomID}
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
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LecturerAdminPanel;
