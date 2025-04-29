
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Minus, Plus } from 'lucide-react';
import PaymentSummary from './PaymentSummary';
import PaymentConfirmation from './PaymentConfirmation';

interface PaymentFormProps {
  currentPayment: number;
  setCurrentPayment: (value: number) => void;
  reductionAmount: number;
  setReductionAmount: (value: number) => void;
  postponeMonths: number;
  setPostponeMonths: (value: number) => void;
  repayMonths: number;
  setRepayMonths: (value: number) => void;
  reducedPayment: number;
  futurePayment: number;
  isConfirming: boolean;
  handleApply: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  remainingFlexCount: number;
  MAX_FLEX_PER_YEAR: number;
  totalPostponedAmount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  currentPayment,
  setCurrentPayment,
  reductionAmount,
  setReductionAmount,
  postponeMonths,
  setPostponeMonths,
  repayMonths,
  setRepayMonths,
  reducedPayment,
  futurePayment,
  isConfirming,
  handleApply,
  handleConfirm,
  handleCancel,
  remainingFlexCount,
  MAX_FLEX_PER_YEAR,
  totalPostponedAmount
}) => {
  const handleIncrementMonths = () => {
    if (postponeMonths < Math.min(3, remainingFlexCount)) {
      setPostponeMonths(postponeMonths + 1);
    }
  };

  const handleDecrementMonths = () => {
    if (postponeMonths > 1) {
      setPostponeMonths(postponeMonths - 1);
    }
  };

  return (
    <>
      {remainingFlexCount < MAX_FLEX_PER_YEAR && (
        <Alert className="mb-4 bg-poalim-lightRed/30 border-poalim-red">
          <Calendar className="h-4 w-4 text-poalim-red" />
          <AlertDescription className="text-poalim-darkText">
            נותרו לך {remainingFlexCount} פעמים להשתמש בגמישות משכנתא השנה
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <label className="text-gray-600">סכום תשלום חודשי נוכחי:</label>
          <span className="font-bold">{currentPayment} ₪</span>
        </div>
        <Slider
          value={[currentPayment]}
          min={2000}
          max={10000}
          step={100}
          onValueChange={(values) => setCurrentPayment(values[0])}
          className="mb-6"
        />

        <div className="flex justify-between mb-2">
          <label className="text-gray-600">סכום להפחתה מהתשלום הנוכחי:</label>
          <span className="font-bold text-poalim-red">{reductionAmount} ₪</span>
        </div>
        <Slider
          value={[reductionAmount]}
          min={500}
          max={Math.min(3000, currentPayment - 1000)}
          step={100}
          onValueChange={(values) => setReductionAmount(values[0])}
          className="mb-6"
        />

        <div className="flex justify-between mb-2">
          <label className="text-gray-600">מספר חודשים להפחתת תשלום:</label>
          <span className="font-bold">{postponeMonths} {postponeMonths === 1 ? 'חודש' : 'חודשים'}</span>
        </div>
        
        {/* Month selector with plus/minus buttons */}
        <div className="flex items-center justify-center mb-6 bg-gray-100 rounded-md p-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleDecrementMonths} 
            disabled={postponeMonths <= 1}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="px-6 font-bold text-lg">
            {postponeMonths}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleIncrementMonths} 
            disabled={postponeMonths >= Math.min(3, remainingFlexCount)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between mb-2">
          <label className="text-gray-600">לפרוס את ההפרש על פני:</label>
          <span className="font-bold">{repayMonths} חודשים</span>
        </div>
        <Slider
          value={[repayMonths]}
          min={3}
          max={24}
          step={1}
          onValueChange={(values) => setRepayMonths(values[0])}
          className="mb-6"
        />
      </div>

      <PaymentSummary
        currentPayment={currentPayment}
        reducedPayment={reducedPayment}
        reductionAmount={reductionAmount}
        futurePayment={futurePayment}
        repayMonths={repayMonths}
        postponeMonths={postponeMonths}
        totalPostponedAmount={totalPostponedAmount}
      />

      {!isConfirming ? (
        <Button onClick={handleApply} className="w-full bg-poalim-red hover:bg-poalim-red/90">
          הפחת את התשלום הקרוב
        </Button>
      ) : (
        <PaymentConfirmation
          reductionAmount={reductionAmount}
          repayMonths={repayMonths}
          postponeMonths={postponeMonths}
          totalPostponedAmount={totalPostponedAmount}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PaymentForm;
