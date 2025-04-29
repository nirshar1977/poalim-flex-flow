
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { UserMortgageProfile } from '@/services/mockUserData';
import { useToast } from '@/hooks/use-toast';
import { DialogTitle } from '@/components/ui/dialog';

interface RestrictedUserFormProps {
  user: UserMortgageProfile;
  onClose: () => void;
}

const RestrictedUserForm: React.FC<RestrictedUserFormProps> = ({ user, onClose }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "פנייתך נשלחה בהצלחה",
      description: "יועץ משכנתאות יצור איתך קשר בהקדם להצעת פתרונות מותאמים אישית",
      duration: 5000,
    });
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <DialogTitle className="text-xl font-bold text-poalim-darkText mb-4 text-center">בקשה לייעוץ פיננסי</DialogTitle>
      
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-gray-700">
          זיהינו שהמצב הפיננסי שלך מורכב. יועץ המשכנתאות שלנו ישמח להציע לך פתרונות מותאמים אישית.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">שם מלא</label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">מספר טלפון</label>
          <input
            type="tel"
            defaultValue="050-1234567"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">זמן מועדף לשיחה</label>
          <select className="w-full p-2 border border-gray-300 rounded-md text-right">
            <option>בוקר (9:00-12:00)</option>
            <option>צהריים (12:00-16:00)</option>
            <option>אחר הצהריים (16:00-19:00)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-right">הערות נוספות</label>
          <textarea
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        
        <div className="pt-4 flex gap-4">
          <Button type="submit" className="flex-1 bg-poalim-red hover:bg-poalim-red/90">
            שלח בקשה
          </Button>
          <Button 
            type="button"
            onClick={onClose} 
            variant="outline" 
            className="flex-1 border-poalim-red text-poalim-red hover:bg-poalim-lightRed"
          >
            ביטול
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestrictedUserForm;
