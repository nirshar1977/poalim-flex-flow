
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import PaymentSummary from './PaymentSummary';
import PaymentConfirmation from './PaymentConfirmation';

interface PaymentFormProps {
  currentPayment: number;
  setCurrentPayment: (value: number) => void;
  reductionAmount: number;
  setReductionAmount: (value: number) => void;
  repayMonths: number;
  setRepayMonths: (value: number) => void;
  reducedPayment: number;
  futurePayment: number;
  isConfirming: boolean;
  handleApply: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  currentPayment,
  setCurrentPayment,
  reductionAmount,
  setReductionAmount,
  repayMonths,
  setRepayMonths,
  reducedPayment,
  futurePayment,
  isConfirming,
  handleApply,
  handleConfirm,
  handleCancel
}) => {
  return (
    <>
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
          onValueChange={(value) => {
            setCurrentPayment(value[0]);
          }}
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
          onValueChange={(value) => {
            setReductionAmount(value[0]);
          }}
          className="mb-6"
        />

        <div className="flex justify-between mb-2">
          <label className="text-gray-600">לפרוס את ההפרש על פני:</label>
          <span className="font-bold">{repayMonths} חודשים</span>
        </div>
        <Slider
          value={[repayMonths]}
          min={3}
          max={24}
          step={1}
          onValueChange={(value) => {
            setRepayMonths(value[0]);
          }}
          className="mb-6"
        />
      </div>

      <PaymentSummary
        currentPayment={currentPayment}
        reducedPayment={reducedPayment}
        reductionAmount={reductionAmount}
        futurePayment={futurePayment}
        repayMonths={repayMonths}
      />

      {!isConfirming ? (
        <Button onClick={handleApply} className="w-full bg-poalim-red hover:bg-poalim-red/90">
          הפחת את התשלום הקרוב
        </Button>
      ) : (
        <PaymentConfirmation
          reductionAmount={reductionAmount}
          repayMonths={repayMonths}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PaymentForm;
