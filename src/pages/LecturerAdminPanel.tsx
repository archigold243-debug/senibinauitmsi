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

      // Suggest filename (lecturer id + extension)
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

      // If new file selected, upload to Supabase and get public URL
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

      updateLecturer(editId, {
        displayName: form.displayName!.trim(),
        surname: form.surname!.trim(),
        floor: form.floor ?? "",
        photo: photoUrl,
      });

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
          {lecturers.map((lect) =>
            editId === lect.id ? (
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
                      src={localPhotoURL || form.photo || lect.photo || "/placeholder.svg"}
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
                    <Label htmlFor={`roomID-${lect.id}`}>
                      Room ID <span className="text-xs text-gray-400">(fixed)</span>
                    </Label>
                    <Input
                      id={`roomID-${lect.id}`}
                      name="roomID"
                      value={lect.roomID}
                      readOnly
                      tabIndex={-1}
                      className="bg-gray-100 text-gray-500 cursor-not-allowed border-dashed border-2 border-gray-300 opacity-80"
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
                  Note: <b>Room ID</b> is fixed, used to connect lecturers to their floor hotspot, and cannot be changed.
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
                      src={lect.photo || "/placeholder.svg"}
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
