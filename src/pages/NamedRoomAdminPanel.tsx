import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRoomContext } from "@/context/RoomContext";

export default function LecturerList() {
  const { lecturers, updateLecturer, lecturersLoading, lecturersError } =
    useRoomContext();

  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const startEdit = (lect: any) => {
    setEditId(lect.id);
    setForm({
      displayName: lect.displayName ?? "",
      surname: lect.surname ?? "",
      floor: lect.floor ?? "",
      photo: lect.photo ?? "",
      roomID: lect.roomID ?? "", // ✅ comes directly from user_credentials
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editId) return;

    // ✅ Save roomID along with other updates
    updateLecturer(editId, {
      displayName: form.displayName!.trim(),
      surname: form.surname!.trim(),
      floor: form.floor ?? "",
      photo: form.photo ?? "",
      roomID: form.roomID ?? "",
    });

    setEditId(null);
    setForm({});
  };

  if (lecturersLoading) return <p>Loading...</p>;
  if (lecturersError) return <p>Error: {lecturersError}</p>;

  return (
    <div className="space-y-4">
      {lecturers.map((lect) => (
        <div
          key={lect.id}
          className="p-4 border rounded-lg flex flex-wrap items-center gap-4"
        >
          {editId === lect.id ? (
            <>
              <div className="flex-1 min-w-[140px]">
                <Label htmlFor={`displayName-${lect.id}`}>First Name</Label>
                <Input
                  id={`displayName-${lect.id}`}
                  name="displayName"
                  value={form.displayName ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1 min-w-[140px]">
                <Label htmlFor={`surname-${lect.id}`}>Surname</Label>
                <Input
                  id={`surname-${lect.id}`}
                  name="surname"
                  value={form.surname ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1 min-w-[100px]">
                <Label htmlFor={`floor-${lect.id}`}>Floor</Label>
                <Input
                  id={`floor-${lect.id}`}
                  name="floor"
                  value={form.floor ?? ""}
                  onChange={handleChange}
                />
              </div>

              {/* ✅ Room ID now editable and synced to user_credentials */}
              <div className="flex-1 min-w-[140px]">
                <Label htmlFor={`roomID-${lect.id}`}>Room ID</Label>
                <Input
                  id={`roomID-${lect.id}`}
                  name="roomID"
                  value={form.roomID ?? ""}
                  onChange={handleChange}
                  placeholder="Enter room ID from rooms table"
                />
              </div>

              <div className="flex items-end gap-2">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 min-w-[140px]">
                <strong>{lect.displayName}</strong> {lect.surname}
              </div>
              <div className="flex-1 min-w-[100px]">{lect.floor}</div>
              <div className="flex-1 min-w-[140px]">{lect.roomID}</div>
              <Button variant="outline" onClick={() => startEdit(lect)}>
                Edit
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
