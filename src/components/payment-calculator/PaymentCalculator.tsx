
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { usePaymentCalculator } from './usePaymentCalculator';
import PaymentForm from './PaymentForm';
import PaymentChart from './PaymentChart';
import UserSelector from '@/components/UserSelector';

const PaymentCalculator: React.FC = () => {
  const {
    selectedUserId,
    handleSelectUser,
    currentUser,
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
    generateChartData,
    remainingFlexCount,
    MAX_FLEX_PER_YEAR,
    totalPostponedAmount
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

      <UserSelector selectedUserId={selectedUserId} onSelectUser={handleSelectUser} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none card-shadow">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-poalim-darkText mb-2">פרטי המשכנתא</h3>
            <div className="mb-6 bg-poalim-lightRed/30 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">לקוח:</span>
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">יתרה לתשלום:</span>
                <span className="font-medium">{currentUser.totalBalance.toLocaleString()} ₪</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">תשלום חודשי:</span>
                <span className="font-medium">{currentUser.currentPayment.toLocaleString()} ₪</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">משך זמן נותר:</span>
                <span className="font-medium">{Math.floor(currentUser.remainingMonths / 12)} שנים ו-{currentUser.remainingMonths % 12} חודשים</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">גמישות שנוצלה השנה:</span>
                <span className="font-medium">{currentUser.flexUsedThisYear} מתוך {MAX_FLEX_PER_YEAR}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-poalim-darkText mb-6">הגדרת הפחתת תשלום</h3>
            
            <PaymentForm
              currentPayment={currentPayment}
              setCurrentPayment={setCurrentPayment}
              reductionAmount={reductionAmount}
              setReductionAmount={setReductionAmount}
              postponeMonths={postponeMonths}
              setPostponeMonths={setPostponeMonths}
              repayMonths={repayMonths}
              setRepayMonths={setRepayMonths}
              reducedPayment={reducedPayment}
              futurePayment={futurePayment}
              isConfirming={isConfirming}
              handleApply={handleApply}
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
              remainingFlexCount={remainingFlexCount}
              MAX_FLEX_PER_YEAR={MAX_FLEX_PER_YEAR}
              totalPostponedAmount={totalPostponedAmount}
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
