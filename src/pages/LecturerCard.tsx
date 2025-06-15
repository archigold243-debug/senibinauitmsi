
import React from 'react';
import { Button } from '@/components/ui/button';

interface LecturerCardProps {
  photo: string;
  displayName: string;
  surname: string;
  role: string;
  floor: string;
  roomId: string;
  onClick: (floor: string, roomId: string) => void;
  loadingPriority?: boolean;
}

const LecturerCard: React.FC<LecturerCardProps> = ({
  photo,
  displayName,
  surname,
  role,
  floor,
  roomId,
  onClick,
  loadingPriority = false,
}) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <img
      src={`/${photo}`}
      alt={displayName}
      className="w-16 h-16 rounded-full object-cover border border-muted"
      loading={loadingPriority ? 'eager' : 'lazy'}
    />
    <div className="flex-1">
      <div className="font-medium">{displayName}</div>
      <div className="text-sm text-gray-600">{surname}</div>
      <div className="text-xs text-gray-400 mb-2">{role}</div>
      <Button
        size="sm"
        className="mt-1"
        variant="secondary"
        onClick={() => onClick(floor, roomId)}
      >
        Go to Room
      </Button>
    </div>
  </div>
);

export default LecturerCard;
