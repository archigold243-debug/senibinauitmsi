

## Plan: Role-Based Admin Access for Announcements

### Overview
Implement two admin roles with different access levels:
- **"admin123" (Full Admin)**: Access to all tabs (Studios, Named Rooms, Lecturers, Announcements) and can manage all announcements
- **"archisa123" (Student Announcer)**: Access ONLY to Announcements tab, can ONLY post announcements for "Students" audience, and can ONLY edit/delete their own posts

---

### Technical Approach

Since there's no database authentication, we'll track "who posted what" by storing a `posted_by` identifier in the announcements table. When a user logs in with "archisa123", we'll mark their posts with a role identifier.

---

### Changes Summary

| File | Changes |
|------|---------|
| Supabase Database | Add `posted_by` column to "Announcement Web" table |
| `src/pages/Admin.tsx` | Add role state, modify login logic, conditionally show tabs |
| `src/pages/AnnouncementAdminPanel.tsx` | Accept role prop, filter announcements, restrict audience selection |
| `src/hooks/useAnnouncements.ts` | Add `posted_by` field to add/update mutations |

---

### Step 1: Database Migration

Add a new column to track who posted each announcement:

```sql
ALTER TABLE "Announcement Web"
ADD COLUMN posted_by TEXT DEFAULT 'admin';
```

---

### Step 2: Update `src/pages/Admin.tsx`

**Add role state:**
```typescript
type AdminRole = 'admin' | 'archisa' | null;
const [userRole, setUserRole] = useState<AdminRole>(null);
```

**Update login logic:**
```typescript
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  if (password === 'admin123') {
    setIsAuthenticated(true);
    setUserRole('admin');
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_role', 'admin');
    toast.success('Access granted - Full Admin');
  } else if (password === 'archisa123') {
    setIsAuthenticated(true);
    setUserRole('archisa');
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_role', 'archisa');
    toast.success('Access granted - Student Announcer');
  } else {
    toast.error('Invalid password');
    setPassword('');
  }
};
```

**Update useEffect to restore role:**
```typescript
useEffect(() => {
  const authState = localStorage.getItem('admin_authenticated');
  const savedRole = localStorage.getItem('admin_role') as AdminRole;
  if (authState === 'true' && savedRole) {
    setIsAuthenticated(true);
    setUserRole(savedRole);
  }
}, []);
```

**Update logout to clear role:**
```typescript
const handleLogout = () => {
  setIsAuthenticated(false);
  setUserRole(null);
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_role');
  toast.success('Logged out successfully');
};
```

**Conditionally render tabs based on role:**
```typescript
{userRole === 'admin' ? (
  // Full admin - show all 4 tabs
  <Tabs defaultValue="studios" className="w-full">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="studios">Studios</TabsTrigger>
      <TabsTrigger value="named-rooms">Named Rooms</TabsTrigger>
      <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
      <TabsTrigger value="announcements">Announcements</TabsTrigger>
    </TabsList>
    {/* All tab contents */}
  </Tabs>
) : (
  // archisa role - only announcements tab
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Student Announcements</h2>
    <AnnouncementAdminPanel role="archisa" />
  </div>
)}
```

**Pass role to AnnouncementAdminPanel:**
```typescript
<AnnouncementAdminPanel role={userRole || 'admin'} />
```

---

### Step 3: Update `src/pages/AnnouncementAdminPanel.tsx`

**Accept role prop:**
```typescript
interface AnnouncementAdminPanelProps {
  role?: 'admin' | 'archisa';
}

const AnnouncementAdminPanel: React.FC<AnnouncementAdminPanelProps> = ({ role = 'admin' }) => {
```

**For "archisa" role, force audience to "students":**
```typescript
// In the form, if role is 'archisa', hide the audience checkboxes 
// and auto-set audience to ['students']
{role === 'admin' && (
  <div className="space-y-2">
    <Label>Target Audience</Label>
    {/* existing checkbox UI */}
  </div>
)}
```

**Filter announcements for archisa role:**
```typescript
// Only show announcements posted by 'archisa' for the archisa role
const filteredAnnouncements = role === 'archisa' 
  ? announcements.filter(a => a.posted_by === 'archisa')
  : announcements;
```

**Pass posted_by when adding/updating:**
```typescript
// When submitting
await addAnnouncement({
  title: title.trim(),
  description: description.trim(),
  image_url: imageUrl.trim() || undefined,
  youtube_url: youtubeUrl.trim() || undefined,
  instagram_url: instagramUrl.trim() || undefined,
  audience: role === 'archisa' ? ['students'] : (audience.length > 0 ? audience : undefined),
  posted_by: role,
});
```

---

### Step 4: Update `src/hooks/useAnnouncements.ts`

**Update Announcement interface:**
```typescript
export interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  youtube_url: string | null;
  audience?: string[] | null;
  instagram_url?: string | null;
  posted_by?: string | null;  // NEW
  created_at: string;
}
```

**Update addAnnouncementMutation to include posted_by:**
```typescript
mutationFn: async (announcement: {
  title: string;
  description: string;
  image_url?: string;
  youtube_url?: string;
  instagram_url?: string;
  audience?: string[];
  posted_by?: string;  // NEW
}) => {
  const { data, error } = await supabase
    .from('Announcement Web')
    .insert([{
      ...existing fields,
      posted_by: announcement.posted_by || 'admin',
    }])
```

---

### Visual Result

**Login with "admin123":**
```
┌─────────────────────────────────────────────┐
│ Admin Panel                         [Logout]│
├─────────────────────────────────────────────┤
│ [Studios] [Named Rooms] [Lecturers] [Announcements] │
│                                             │
│ (Full access to all tabs and announcements) │
└─────────────────────────────────────────────┘
```

**Login with "archisa123":**
```
┌─────────────────────────────────────────────┐
│ Admin Panel                         [Logout]│
├─────────────────────────────────────────────┤
│ Student Announcements                       │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Post New Announcement                   │ │
│ │ (Audience auto-set to "Students")       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Existing Announcements                      │
│ (Only shows announcements posted by archisa)│
└─────────────────────────────────────────────┘
```

---

### No Changes To
- 3D Model viewer
- Homepage layout
- Announcements display on homepage/Students page
- Studios, Named Rooms, Lecturers admin panels
- Any other existing features

