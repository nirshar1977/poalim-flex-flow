
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { usePaymentCalculator } from './usePaymentCalculator';
import PaymentForm from './PaymentForm';
import PaymentChart from './PaymentChart';

const PaymentCalculator: React.FC = () => {
  const {
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
    handleCancel,
    generateChartData
  } = usePaymentCalculator();

  const chartData = generateChartData();
  const maxPaymentValue = Math.max(currentPayment, futurePayment);

  return (
    <section id="calculator" className="section-container bg-poalim-gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-poalim-darkText mb-4">סימולטור תשלומי <span className="text-poalim-red">פועלים פלקס</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          נסו את הסימולטור שלנו כדי לראות כיצד תוכלו להתאים את תשלומי המשכנתא שלכם לצרכים הפיננסיים שלכם
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none card-shadow">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-poalim-darkText mb-6">הגדרת הפחתת תשלום</h3>
            
            <PaymentForm
              currentPayment={currentPayment}
              setCurrentPayment={setCurrentPayment}
              reductionAmount={reductionAmount}
              setReductionAmount={setReductionAmount}
              repayMonths={repayMonths}
              setRepayMonths={setRepayMonths}
              reducedPayment={reducedPayment}
              futurePayment={futurePayment}
              isConfirming={isConfirming}
              handleApply={handleApply}
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
            />
          </CardContent>
        </Card>

        <Card className="border-none card-shadow overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-poalim-darkText mb-6">השוואת תשלומים</h3>
            <PaymentChart data={chartData} maxValue={maxPaymentValue} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PaymentCalculator;
