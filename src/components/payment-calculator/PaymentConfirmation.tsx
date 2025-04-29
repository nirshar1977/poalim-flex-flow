
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
  const monthlyAddition = Math.round(totalWithFees / repayMonths);
  
  return (
    <div className="space-y-4" dir='ltr'>
      <div className="bg-poalim-lightRed p-4 rounded-lg text-center">
        <h3 className="font-bold text-poalim-red flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5" />
          אישור בקשת הפחתת תשלום
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          התשלום יופחת ב-{reductionAmount.toLocaleString()} ₪ למשך {postponeMonths} {postponeMonths === 1 ? 'חודש' : 'חודשים'}
        </p>
        <div className="bg-white p-3 rounded-lg mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold">{totalPostponedAmount.toLocaleString()} ₪</span>
            <span dir='rtl' >סכום דחייה כולל:</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-poalim-red">{bankFeeAmount.toLocaleString()} ₪</span>
            <span dir='rtl' >עמלה בגין ביצוע פעולה:</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t pt-1 mt-1">
            <span className="text-lg">{totalWithFees.toLocaleString()} ₪</span>
            <span dir='rtl'>סה"כ לתשלום עתידי:</span>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-lg">{monthlyAddition.toLocaleString()} ₪</span>
            <span dir='rtl'>תוספת חודשית:</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span dir='rtl'>{repayMonths} חודשים</span>
            <span dir='rtl'>למשך:</span>
          </div>
          <p className="text-xs text-gray-600 mt-1 text-right">
            הסכום יתווסף לתשלום החודשי הרגיל שלך לאחר תקופת ההפחתה
          </p>
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
