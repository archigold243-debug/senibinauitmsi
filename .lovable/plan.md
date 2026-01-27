
## Plan: Add Google Scholar Link to Lecturer Detail View

### Overview
Add a Google Scholar URL field for each lecturer that displays as a clickable button in the detailed view on the Lecturers page. This allows visitors to easily access the lecturer's research profile and publications on Google Scholar.

---

### Database Change

**Add new column to `user_credentials` table via migration:**

```sql
ALTER TABLE user_credentials 
ADD COLUMN google_scholar_url TEXT;
```

This column will store the full Google Scholar profile URL (e.g., `https://scholar.google.com/citations?user=XXXXXXX`)

---

### Changes Summary

| File | Changes |
|------|---------|
| Database Migration | Add `google_scholar_url` column to `user_credentials` |
| `src/hooks/useRooms.ts` | Add `google_scholar_url` to interface and fetch query |
| `src/contexts/RoomContext.tsx` | Add field to `LecturerData` interface and converter |
| `src/pages/LecturerAdminPanel.tsx` | Add input field for Google Scholar URL |
| `src/pages/Lecturers.tsx` | Add "Research Profile" section with link button |

---

### Technical Details

#### 1. Update `src/hooks/useRooms.ts`

Add to `UserCredential` interface:
```typescript
export interface UserCredential {
  // ...existing fields
  google_scholar_url?: string;  // NEW
}
```

Update the Supabase query to include the new field:
```typescript
.select('id, title, username, surname, photo_url, roomID, floor, email, google_scholar_url, lecturer_expertise(expertise:expertise(name))')
```

#### 2. Update `src/contexts/RoomContext.tsx`

Add to `LecturerData` interface:
```typescript
export interface LecturerData {
  // ...existing fields
  google_scholar_url?: string;  // NEW
}
```

Update `convertUserToLecturer` function:
```typescript
const convertUserToLecturer = (user: UserCredential): LecturerData => ({
  // ...existing fields
  google_scholar_url: user.google_scholar_url || '',
});
```

#### 3. Update `src/pages/LecturerAdminPanel.tsx`

Add input field for Google Scholar URL in the edit form, and update the save function to persist this data.

#### 4. Update `src/pages/Lecturers.tsx`

Add a "Research Profile" section below expertise in the detailed modal:

```tsx
import { GraduationCap, ExternalLink } from 'lucide-react';

{/* Research Profile Section - only shows if URL exists */}
{selectedLecturer.google_scholar_url && (
  <div className="pt-3 border-t border-border">
    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
      <GraduationCap className="h-4 w-4" />
      Research Profile
    </h4>
    <a
      href={selectedLecturer.google_scholar_url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-primary hover:underline 
                 bg-primary/10 px-4 py-2 rounded-lg transition-colors hover:bg-primary/20"
    >
      <span>View Publications on Google Scholar</span>
      <ExternalLink className="h-4 w-4" />
    </a>
  </div>
)}
```

---

### Visual Result

**Lecturer Detail Modal (with Google Scholar link):**

```text
┌─────────────────────────────────────────────────────┐
│  Lecturer Details                              [X]  │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐                                       │
│  │  Photo   │  Dr. John Smith                       │
│  │          │  Associate Professor                  │
│  └──────────┘                                       │
│                                                     │
│  ✉️ john.smith@uitm.edu.my                          │
│  📍 Room: A1-01  🏢 First Floor                     │
│                                                     │
│  ── Areas of Expertise ──                           │
│  [Sustainable Design] [Urban Planning] [BIM]        │
│                                                     │
│  ── Research Profile ──                             │
│  🎓 [View Publications on Google Scholar ↗]         │
│                                                     │
│  [Go to Room]  [Done]                               │
└─────────────────────────────────────────────────────┘
```

**Admin Panel (new field):**

```text
┌─────────────────────────────────────────────────────┐
│  Edit Lecturers                                     │
├─────────────────────────────────────────────────────┤
│  ...existing fields...                              │
│                                                     │
│  Google Scholar URL                                 │
│  [https://scholar.google.com/citations?user=...]    │
│                                                     │
│  [Save] [Cancel]                                    │
└─────────────────────────────────────────────────────┘
```

---

### No Changes To
- Announcements feature (recent/past split, markdown links, layout)
- 3D model viewer
- Welcome title or sidebar
- Floor pages or hotspots
- Any other existing features

