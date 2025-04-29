
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PaymentConfirmationProps {
  reductionAmount: number;
  repayMonths: number;
  postponeMonths: number;
  totalPostponedAmount: number;
  bankFeeAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  reductionAmount,
  repayMonths,
  postponeMonths,
  totalPostponedAmount,
  bankFeeAmount,
  onConfirm,
  onCancel
}) => {
  const totalWithFees = totalPostponedAmount + bankFeeAmount;
  
  return (
    <div className="space-y-4">
      <div className="bg-poalim-lightRed p-4 rounded-lg text-center">
        <h5 className="font-bold text-poalim-red flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5" />
          אישור בקשת הפחתת תשלום
        </h5>
        <p className="text-sm text-gray-600 mb-2">
          התשלום יופחת ב-{reductionAmount.toLocaleString()} ₪ למשך {postponeMonths} {postponeMonths === 1 ? 'חודש' : 'חודשים'}
        </p>
        <div className="bg-white p-3 rounded-lg mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold">{totalPostponedAmount.toLocaleString()} ₪</span>
            <span>סכום דחייה כולל:</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-poalim-red">{bankFeeAmount.toLocaleString()} ₪</span>
            <span>עמלה בגין ביצוע פעולה:</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t pt-1 mt-1">
            <span className="text-lg">{totalWithFees.toLocaleString()} ₪</span>
            <span>סה"כ לתשלום עתידי:</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          סכום של {totalWithFees.toLocaleString()} ₪ יתחלק על פני {repayMonths} החודשים הבאים
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
