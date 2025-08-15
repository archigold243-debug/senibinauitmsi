import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function LecturerAdminPanel({ lecturers, updateLecturer }) {
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPhotoURL, setLocalPhotoURL] = useState<string | null>(null);

  const handleEdit = (lecturer: any) => {
    setEditId(lecturer.id);
    setForm({
      username: lecturer.username || "",
      surname: lecturer.surname || "",
      floor: lecturer.floor || "",
      roomID: lecturer.roomID || "",
      photo: lecturer.photo || "",
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({});
    setSelectedFile(null);
    setLocalPhotoURL(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setLocalPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (editId && form.username?.trim() && form.surname?.trim()) {
      let photoUrl = form.photo ?? "";

      // Upload new photo if selected
      if (selectedFile) {
        const filePath = `${editId}/${selectedFile.name}`;
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
        // ✅ Direct Supabase update for roomID and other fields
        const { error: updateError } = await supabase
          .from("user_credentials")
          .update({
            username: form.username!.trim(),
            surname: form.surname!.trim(),
            floor: form.floor ?? "",
            roomID: form.roomID ?? "",
            photo: photoUrl,
          })
          .eq("id", editId);

        if (updateError) {
          console.error("Supabase update error:", updateError);
          toast.error("Failed to update lecturer in database");
          return;
        }

        // Sync UI state
        await updateLecturer(editId, {
          username: form.username!.trim(),
          surname: form.surname!.trim(),
          floor: form.floor ?? "",
          roomID: form.roomID ?? "",
          photo: photoUrl,
        });

        toast.success("Lecturer info updated!");
        handleCancel();
      } catch (error) {
        toast.error("Failed to update lecturer");
        console.error("Update error:", error);
      }
    } else {
      toast.error("Full name and surname are required");
    }
  };

  return (
    <div>
      <h2>Lecturer Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Floor</th>
            <th>Room ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer) => (
            <tr key={lecturer.id}>
              <td>
                {editId === lecturer.id ? (
                  <>
                    {localPhotoURL ? (
                      <img src={localPhotoURL} alt="Preview" width={50} />
                    ) : lecturer.photo ? (
                      <img src={lecturer.photo} alt="Lecturer" width={50} />
                    ) : null}
                    <input type="file" onChange={handleFileChange} />
                  </>
                ) : lecturer.photo ? (
                  <img src={lecturer.photo} alt="Lecturer" width={50} />
                ) : null}
              </td>
              <td>
                {editId === lecturer.id ? (
                  <input
                    value={form.username || ""}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                ) : (
                  lecturer.username
                )}
              </td>
              <td>
                {editId === lecturer.id ? (
                  <input
                    value={form.surname || ""}
                    onChange={(e) =>
                      setForm({ ...form, surname: e.target.value })
                    }
                  />
                ) : (
                  lecturer.surname
                )}
              </td>
              <td>
                {editId === lecturer.id ? (
                  <input
                    value={form.floor || ""}
                    onChange={(e) =>
                      setForm({ ...form, floor: e.target.value })
                    }
                  />
                ) : (
                  lecturer.floor
                )}
              </td>
              <td>
                {editId === lecturer.id ? (
                  <input
                    value={form.roomID || ""}
                    onChange={(e) =>
                      setForm({ ...form, roomID: e.target.value })
                    }
                  />
                ) : (
                  lecturer.roomID
                )}
              </td>
              <td>
                {editId === lecturer.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(lecturer)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}