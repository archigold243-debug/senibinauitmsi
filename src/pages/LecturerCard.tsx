
import React from 'react';
import { Button } from '@/components/ui/button';

interface LecturerCardProps {
  photo: string;
  displayName: string;
  surname: string;
  role: string;
  floor: string;
  roomID: string;
  onClick: (floor: string, roomID: string) => void;
  loadingPriority?: boolean;
}

const LecturerCard: React.FC<LecturerCardProps> = ({
  photo,
  displayName,
  surname,
  role,
  floor,
  roomID,
  onClick,
  loadingPriority = false,
}) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <div className="w-24 h-32 flex-shrink-0">
      <img
        src={photo.startsWith('http') ? photo : `/${photo}`}
        alt={displayName}
        className="w-full h-full object-cover rounded-lg border border-muted"
        loading={loadingPriority ? 'eager' : 'lazy'}
      />
    </div>
    <div className="flex-1">
      <div className="font-medium">{displayName}</div>
      <div className="text-sm text-gray-600">{surname}</div>
      <div className="text-xs text-gray-400 mb-2">{role}</div>
      <Button
        size="sm"
        className="mt-1"
        variant="secondary"
        onClick={() => onClick(floor, roomID)}
      >
        Go to Room
      </Button>
    </div>
  </div>
);

export default LecturerCard;
