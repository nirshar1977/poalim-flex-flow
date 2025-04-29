
import React from 'react';
import { mockUsers, UserMortgageProfile } from '../services/mockUserData';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';

interface UserSelectorProps {
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ selectedUserId, onSelectUser }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">בחר משתמש להדגמה:</h3>
      <div className="flex flex-wrap gap-3">
        {mockUsers.map((user) => (
          <Button
            key={user.id}
            variant={selectedUserId === user.id ? "default" : "outline"}
            className={selectedUserId === user.id 
              ? "bg-poalim-red hover:bg-poalim-red/90" 
              : "border-gray-300"}
            onClick={() => onSelectUser(user.id)}
          >
            <UserRound className="mr-2 h-4 w-4" />
            {user.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default UserSelector;
