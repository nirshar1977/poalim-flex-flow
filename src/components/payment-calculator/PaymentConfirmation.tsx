
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PaymentConfirmationProps {
  reductionAmount: number;
  repayMonths: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  reductionAmount,
  repayMonths,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-poalim-lightRed p-4 rounded-lg text-center">
        <h5 className="font-bold text-poalim-red flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5" />
          אישור בקשת הפחתת תשלום
        </h5>
        <p className="text-sm text-gray-600 mb-2">
          התשלום הקרוב יופחת ב-{reductionAmount} ₪
          <br />
          וההפרש יתחלק על פני {repayMonths} החודשים הבאים
        </p>
        <Button 
          onClick={onConfirm} 
          className="w-full bg-poalim-red hover:bg-poalim-red/90 mb-2"
        >
          אישור והפעלת הגמישות
        </Button>
        <Button 
          onClick={onCancel}
          variant="outline" 
          className="w-full border-poalim-red text-poalim-red hover:bg-poalim-lightRed"
        >
          ביטול
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
