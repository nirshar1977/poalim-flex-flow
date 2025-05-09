
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Minus, Plus, Coins, AlertCircle } from "lucide-react";
import PaymentSummary from "./PaymentSummary";
import PaymentConfirmation from "./PaymentConfirmation";
import { Slider } from "@/components/ui/slider";
import { RiskProfile } from "@/services/riskProfiles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentFormProps {
  currentPayment: number;
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
  bankFeeAmount: number;
  bankFeePercentage: number;
  currentRiskProfile?: RiskProfile;
  onShowEarlyRepayment: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
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
  remainingFlexCount,
  MAX_FLEX_PER_YEAR,
  totalPostponedAmount,
  bankFeeAmount,
  bankFeePercentage,
  currentRiskProfile,
  onShowEarlyRepayment,
}) => {
  const [activeTab, setActiveTab] = useState<string>("reduce");
  
  const handleIncrementMonths = () => {
    // Allow incrementing up to 3 or the remaining flex count (inclusive)
    if (postponeMonths < Math.min(3, remainingFlexCount)) {
      setPostponeMonths(postponeMonths + 1);
    }
  };

  const handleDecrementMonths = () => {
    // Minimum postpone months is now 1 (not 0)
    if (postponeMonths > 1) {
      setPostponeMonths(postponeMonths - 1);
    }
  };

  // Calculate the actual remaining flex count after current selection
  const effectiveRemainingFlexCount = remainingFlexCount - postponeMonths;

  // Show warning if stress period is coming
  const hasStressPeriod =
    currentRiskProfile?.predictedFinancialStress?.nextStressPeriod;

  const handleReductionAmountChange = (value: number[]) => {
    setReductionAmount(value[0]);
  };

  const handleRepayMonthsChange = (value: number[]) => {
    setRepayMonths(value[0]);
  };

  // Only show the flex count alert if there are remaining uses (or already using some)
  // and if this is not a high-risk restricted user
  const showFlexCountAlert = remainingFlexCount < MAX_FLEX_PER_YEAR && !currentRiskProfile?.restrictFlexUsage;
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "earlyRepay") {
      onShowEarlyRepayment();
    }
  };
  
  return (
    <>
      {showFlexCountAlert && (
        <Alert className="mb-4 bg-poalim-lightRed/30 border-poalim-red">
          <Calendar className="h-4 w-4 text-poalim-red" />
          <AlertDescription className="text-poalim-darkText">
            נותרו לך{" "}
            {effectiveRemainingFlexCount >= 0 ? effectiveRemainingFlexCount : 0}{" "}
            פעמים להשתמש בגמישות משכנתא השנה
          </AlertDescription>
        </Alert>
      )}

      {hasStressPeriod && (
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-800">
            <span className="font-bold">תחזית AI:</span> זיהינו תקופה פיננסית
            מאתגרת צפויה ב-
            {currentRiskProfile?.predictedFinancialStress?.nextStressPeriod}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="reduce" onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="reduce" className="text-right">הפחתת תשלום</TabsTrigger>
          <TabsTrigger value="earlyRepay" className="text-right">פירעון מוקדם</TabsTrigger>
        </TabsList>

        <TabsContent value="reduce">
          <div className="mb-8" dir='ltr'>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-lg">{currentPayment.toLocaleString()} ₪</span>
              <label className="text-gray-600 font-medium" dir='rtl'>
                סכום תשלום חודשי נוכחי:
              </label>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg mb-6 text-center">
              <span className="text-gray-500" dir='rtl'>התשלום החודשי הקבוע שלך</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-bold text-poalim-red">{reductionAmount.toLocaleString()} ₪</span>
              <label className="text-gray-600" dir='rtl'>סכום להפחתה מהתשלום הנוכחי:</label>
            </div>
            <Slider
              value={[reductionAmount]}
              max={Math.min(3000, currentPayment - 1000)}
              min={500}
              step={100}
              onValueChange={handleReductionAmountChange}
              className="mb-6"
            />

            <div className="flex justify-between mb-2" >
              <span className="font-bold" dir='rtl'>{repayMonths} חודשים</span>
              <label className="text-gray-600" dir='rtl'>לפרוס את ההפרש על פני:</label>
            </div>
            <Slider
              value={[repayMonths]}
              max={24}
              min={6}
              step={1}
              onValueChange={handleRepayMonthsChange}
              className="mb-6"
            />

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="font-bold">{bankFeeAmount.toLocaleString()} ₪</span>
                <span className="text-gray-700">עמלת הבנק ({bankFeePercentage.toFixed(1)}%):</span>
              </div>
              <p className="text-xs text-amber-600 mt-1 text-right">העמלה משתנה בהתאם למספר חודשי הפריסה</p>
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-bold">
                {postponeMonths} {postponeMonths === 1 ? "חודש" : "חודשים"}
              </span>
              <label className="text-gray-600" dir='rtl'>מספר חודשים להפחתת תשלום:</label>
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
              <div className="px-6 font-bold text-lg">{postponeMonths}</div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrementMonths}
                disabled={
                  postponeMonths >= 3 || postponeMonths >= remainingFlexCount
                }
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <PaymentSummary
            currentPayment={currentPayment}
            reducedPayment={reducedPayment}
            reductionAmount={reductionAmount}
            futurePayment={futurePayment}
            repayMonths={repayMonths}
            postponeMonths={postponeMonths}
            totalPostponedAmount={totalPostponedAmount}
            bankFeeAmount={bankFeeAmount}
          />

          {!isConfirming ? (
            <Button
              onClick={handleApply}
              className="w-full bg-poalim-red hover:bg-poalim-red/90 text-lg py-6"
            >
              הפחת את התשלום הקרוב
            </Button>
          ) : (
            <PaymentConfirmation
              reductionAmount={reductionAmount}
              repayMonths={repayMonths}
              postponeMonths={postponeMonths}
              totalPostponedAmount={totalPostponedAmount}
              bankFeeAmount={bankFeeAmount}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </TabsContent>

        <TabsContent value="earlyRepay">
          <div className="text-center py-8">
            <Coins className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">פירעון מוקדם חד פעמי</h3>
            <p className="text-gray-600 mb-6">
              באפשרותך לבצע פירעון מוקדם של המשכנתא ולחסוך בעלויות הריבית
            </p>
            <Button
              onClick={onShowEarlyRepayment}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            >
              הצג אפשרויות פירעון מוקדם
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PaymentForm;
