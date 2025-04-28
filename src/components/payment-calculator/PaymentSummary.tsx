
import React from 'react';

interface PaymentSummaryProps {
  currentPayment: number;
  reducedPayment: number;
  reductionAmount: number;
  futurePayment: number;
  repayMonths: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  currentPayment,
  reducedPayment,
  reductionAmount,
  futurePayment,
  repayMonths
}) => {
  return (
    <div className="bg-white p-4 rounded-xl mb-6">
      <h4 className="text-lg font-bold text-poalim-darkText mb-4">סיכום</h4>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-poalim-lightRed p-3 rounded-lg">
          <p className="text-sm text-gray-600">תשלום נוכחי</p>
          <p className="text-xl font-bold text-poalim-darkText">{currentPayment} ₪</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">תשלום מופחת</p>
          <p className="text-xl font-bold text-green-600">{reducedPayment} ₪</p>
          <p className="text-xs text-green-500">חיסכון: {reductionAmount} ₪</p>
        </div>
      </div>
      
      <div className="text-center p-3 rounded-lg border border-poalim-red bg-poalim-lightRed/30">
        <p className="text-sm text-gray-600">תשלום בחודשים הבאים</p>
        <p className="text-lg font-bold text-poalim-red">{futurePayment} ₪</p>
        <p className="text-xs text-gray-500">למשך {repayMonths} חודשים</p>
      </div>
    </div>
  );
};

export default PaymentSummary;
