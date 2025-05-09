
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { usePaymentCalculator } from './usePaymentCalculator';
import PaymentForm from './PaymentForm';
import PaymentChart from './PaymentChart';
import UserSelector from '@/components/UserSelector';
import EarlyRepaymentForm from './EarlyRepaymentForm';
import RestrictedUserForm from './RestrictedUserForm';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import CustomerTrendAnalysis from './CustomerTrendAnalysis';

const PaymentCalculator: React.FC = () => {
  const {
    selectedUserId,
    handleSelectUser,
    currentUser,
    currentPayment,
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
    totalPostponedAmount,
    currentRiskProfile,
    isEarlyRepayment,
    handleShowEarlyRepayment,
    handleCloseEarlyRepayment,
    handleEarlyRepaymentConfirm,
    isRestrictedUser,
    handleCloseRestrictedUser,
    bankFeeAmount,
    bankFeePercentage,
    monthlyExtra
  } = usePaymentCalculator();

  const chartData = generateChartData();
  const maxPaymentValue = Math.max(currentPayment, futurePayment);

  return (
    <section id="calculator" className="section-container bg-poalim-gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-poalim-darkText mb-4">סימולטור תשלומי <span className="text-poalim-red">פועלים Flex</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          נסו את הסימולטור שלנו כדי לראות כיצד תוכלו להתאים את תשלומי המשכנתא שלכם לצרכים הפיננסיים שלכם
        </p>
      </div>

      <UserSelector selectedUserId={selectedUserId} onSelectUser={handleSelectUser} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none card-shadow">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-poalim-darkText mb-2" dir='rtl'>פרטי המשכנתא</h3>
            <div className="mb-6 bg-poalim-lightRed/30 p-4 rounded-lg" dir='ltr'>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{currentUser.name}</span>
                <span className="text-gray-600" dir='rtl'>לקוח:</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{currentUser.totalBalance.toLocaleString()} ₪</span>
                <span className="text-gray-600" dir='rtl'>יתרה לתשלום:</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{currentUser.currentPayment.toLocaleString()} ₪</span>
                <span className="text-gray-600"  dir='rtl'>תשלום חודשי:</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{Math.floor(currentUser.remainingMonths / 12)} שנים ו-{currentUser.remainingMonths % 12} חודשים</span>
                <span className="text-gray-600" dir='rtl'>משך זמן נותר:</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium" dir='rtl'>{currentUser.flexUsedThisYear} מתוך {MAX_FLEX_PER_YEAR}</span>
                <span className="text-gray-600" dir='rtl'>גמישות שנוצלה השנה:</span>
              </div>
              
              {currentRiskProfile?.predictedFinancialStress?.nextStressPeriod && (
                <div className="flex justify-between mt-2 pt-2 border-t border-red-200" >
                  <span className="font-medium text-amber-700" >{currentRiskProfile.predictedFinancialStress.nextStressPeriod}</span>
                  <span className="text-amber-700" dir='rtl'>תקופת לחץ פיננסי צפויה:</span>
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-poalim-darkText mb-6">הגדרת תשלומים</h3>
            
            <PaymentForm 
              currentPayment={currentPayment}
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
              bankFeeAmount={bankFeeAmount}
              bankFeePercentage={bankFeePercentage}
              currentRiskProfile={currentRiskProfile}
              onShowEarlyRepayment={handleShowEarlyRepayment}
            />
          </CardContent>
        </Card>

        <Card className="border-none card-shadow overflow-hidden">
          <CardContent className="p-6">
            <CustomerTrendAnalysis 
              userId={selectedUserId}
              riskProfile={currentRiskProfile}
            />
            <h3 className="text-xl font-bold text-poalim-darkText mb-6">השוואת תשלומים</h3>
            <PaymentChart 
              data={chartData} 
              maxValue={maxPaymentValue}
              postponeMonths={postponeMonths}
              repayMonths={repayMonths}
              monthlyExtra={monthlyExtra}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Early Repayment Dialog */}
      {isEarlyRepayment && (
        <AlertDialog open={isEarlyRepayment} onOpenChange={handleCloseEarlyRepayment}>
          <AlertDialogContent className="max-w-md p-0">
            {currentRiskProfile && (
              <EarlyRepaymentForm 
                riskProfile={currentRiskProfile}
                onClose={handleCloseEarlyRepayment}
                onConfirm={handleEarlyRepaymentConfirm}
              />
            )}
          </AlertDialogContent>
        </AlertDialog>
      )}
      
      {/* Restricted User Dialog */}
      {isRestrictedUser && (
        <AlertDialog open={isRestrictedUser} onOpenChange={handleCloseRestrictedUser}>
          <AlertDialogContent className="max-w-md p-0">
            <RestrictedUserForm 
              user={currentUser}
              onClose={handleCloseRestrictedUser}
            />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  );
};

export default PaymentCalculator;
