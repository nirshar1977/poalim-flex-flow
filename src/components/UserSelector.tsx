
import React from 'react';
import { mockUsers, UserMortgageProfile } from '../services/mockUserData';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import UserRiskTooltip from '@/components/UserRiskTooltip';
import { riskProfiles, RiskProfile } from '@/services/riskProfiles';

interface UserSelectorProps {
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ selectedUserId, onSelectUser }) => {
  // Function to handle user selection and dispatch event for other components to listen
  const handleUserSelection = (userId: string) => {
    onSelectUser(userId);
    
    // Dispatch custom event so HeroSection can update too
    const event = new CustomEvent('userSelectionChanged', {
      detail: { userId }
    });
    
    window.dispatchEvent(event);
  };
  
  // Get risk profile for each user
  const getUserRiskProfile = (user: UserMortgageProfile): RiskProfile => {
    return riskProfiles.find(profile => profile.id === user.riskProfileId) || riskProfiles[0];
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">בחר משתמש להדגמה:</h3>
      <div className="flex flex-wrap gap-3">
        {mockUsers.map((user) => {
          const riskProfile = getUserRiskProfile(user);
          return (
            <UserRiskTooltip 
              key={user.id}
              profile={riskProfile}
            >
              <Button
                variant={selectedUserId === user.id ? "default" : "outline"}
                className={selectedUserId === user.id 
                  ? "bg-poalim-red hover:bg-poalim-red/90" 
                  : "border-gray-300"}
                onClick={() => handleUserSelection(user.id)}
              >
                <UserRound className="mr-2 h-4 w-4" />
                {user.name}
              </Button>
            </UserRiskTooltip>
          );
        })}
      </div>
    </div>
  );
};

export default UserSelector;
