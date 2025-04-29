
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { RiskProfile, formatCurrency, calculateBankFee } from '@/services/riskProfiles';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface EarlyRepaymentFormProps {
  riskProfile: RiskProfile;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const EarlyRepaymentForm: React.FC<EarlyRepaymentFormProps> = ({ 
  riskProfile, 
  onClose,
  onConfirm
}) => {
  const [repaymentAmount, setRepaymentAmount] = useState(riskProfile.earlyRepaymentOptions.maxAmount / 2);
  const [repaymentMonths, setRepaymentMonths] = useState(1);
  
  const maxAmount = riskProfile.earlyRepaymentOptions.maxAmount;
  const baseInterestSavings = riskProfile.earlyRepaymentOptions.interestSavings;
  const feePercentage = riskProfile.earlyRepaymentOptions.feePercentage;

  // Calculate interest savings based on repayment amount
  const interestSavings = Math.round((repaymentAmount / maxAmount) * baseInterestSavings);
  
  // Calculate bank fee
  const bankFee = calculateBankFee(repaymentAmount, repaymentMonths, feePercentage);
  
  // Calculate total savings after fee
  const totalSavings = interestSavings - bankFee;

  const handleAmountChange = (value: number[]) => {
    setRepaymentAmount(value[0]);
  };

  const handleMonthsChange = (value: number[]) => {
    setRepaymentMonths(value[0]);
  };

  const handleConfirm = () => {
    onConfirm(repaymentAmount);
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <DialogTitle className="text-xl font-bold text-poalim-darkText mb-6 text-center">פירעון מוקדם</DialogTitle>
      <DialogDescription className="text-center mb-4 text-gray-600">
        פירעון מוקדם של המשכנתא יכול לחסוך לך כסף רב בריביות לאורך זמן
      </DialogDescription>
      
      <Alert className="mb-6 bg-green-50 border-green-200">
        <Coins className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-gray-700">
          פירעון מוקדם של המשכנתא יכול לחסוך לך כסף רב בריביות לאורך זמן
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">{formatCurrency(repaymentAmount)} ₪</span>
            <label className="text-gray-600">סכום לפירעון מוקדם:</label>
          </div>
          <Slider
            value={[repaymentAmount]}
            min={10000}
            max={maxAmount}
            step={5000}
            onValueChange={handleAmountChange}
            className="mb-4"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">{repaymentMonths}</span>
            <label className="text-gray-600">מספר תשלומים להפחתה:</label>
          </div>
          <Slider
            value={[repaymentMonths]}
            min={1}
            max={6}
            step={1}
            onValueChange={handleMonthsChange}
            className="mb-4"
          />
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-bold text-green-600 mb-4 text-center">סיכום חיסכון</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-600 text-right">חיסכון בריבית:</p>
              <p className="text-xl font-bold text-green-600 text-left">{formatCurrency(interestSavings)} ₪</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-600 text-right">עמלת פירעון מוקדם:</p>
              <p className="text-xl font-bold text-poalim-red text-left">{formatCurrency(bankFee)} ₪</p>
              <p className="text-xs text-gray-500 text-left">({feePercentage}% מהסכום)</p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg mt-3">
            <div className="flex justify-between">
              <p className="text-lg font-bold text-green-600">{formatCurrency(totalSavings)} ₪</p>
              <p className="text-sm font-bold">סה״כ חיסכון נטו:</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleConfirm} className="flex-1 bg-poalim-red hover:bg-poalim-red/90">
            אישור פירעון מוקדם
          </Button>
          <Button 
            onClick={onClose}
            variant="outline" 
            className="flex-1 border-poalim-red text-poalim-red hover:bg-poalim-lightRed"
          >
            ביטול
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EarlyRepaymentForm;
