
import React from 'react';

interface PaymentSummaryProps {
  currentPayment: number;
  reducedPayment: number;
  reductionAmount: number;
  futurePayment: number;
  repayMonths: number;
  postponeMonths: number;
  totalPostponedAmount: number;
  bankFeeAmount: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  currentPayment,
  reducedPayment,
  reductionAmount,
  futurePayment,
  repayMonths,
  postponeMonths,
  totalPostponedAmount,
  bankFeeAmount
}) => {
  const totalWithFees = totalPostponedAmount + bankFeeAmount;
  const formatCurrency = (amount: number) => amount.toLocaleString();
  
  return (
    <div className="bg-white p-4 rounded-xl mb-6 shadow-sm">
      <h4 className="text-lg font-bold text-poalim-darkText mb-4">סיכום</h4>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-poalim-lightRed p-3 rounded-lg">
          <p className="text-sm text-gray-600">תשלום נוכחי</p>
          <p className="text-xl font-bold text-poalim-darkText">{formatCurrency(currentPayment)} ₪</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">תשלום מופחת</p>
          <p className="text-xl font-bold text-green-600">{formatCurrency(reducedPayment)} ₪</p>
          <p className="text-xs text-green-500">חיסכון: {formatCurrency(reductionAmount)} ₪ לחודש</p>
          <p className="text-xs text-green-500">למשך: {postponeMonths} {postponeMonths === 1 ? 'חודש' : 'חודשים'}</p>
          <p className="text-xs font-medium text-green-600">סה״כ חיסכון: {formatCurrency(totalPostponedAmount)} ₪</p>
        </div>
      </div>
      
      <div className="text-center p-3 rounded-lg border-2 border-poalim-red bg-poalim-lightRed/30 mb-3">
        <p className="text-sm text-gray-600">תשלום לאחר תקופת ההפחתה</p>
        <p className="text-2xl font-bold text-poalim-red">{formatCurrency(futurePayment)} ₪</p>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>למשך {repayMonths} חודשים</span>
          <span>תוספת של {formatCurrency(futurePayment - currentPayment)} ₪ לחודש</span>
        </div>
      </div>
      
      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="font-bold">{formatCurrency(totalPostponedAmount)} ₪</span>
          <span>סכום דחייה כולל:</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="font-bold text-poalim-red">{formatCurrency(bankFeeAmount)} ₪</span>
          <span>עמלת בנק:</span>
        </div>
        <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-gray-300">
          <span>{formatCurrency(totalWithFees)} ₪</span>
          <span>סה"כ לפריסה:</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
