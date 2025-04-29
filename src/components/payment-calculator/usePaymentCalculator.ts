
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getDefaultUser, getUser, UserMortgageProfile } from '@/services/mockUserData';
import { getRiskProfile, RiskProfile } from '@/services/riskProfiles';

export const usePaymentCalculator = () => {
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string>(getDefaultUser().id);
  const [currentUser, setCurrentUser] = useState<UserMortgageProfile>(getDefaultUser());
  const [currentPayment, setCurrentPayment] = useState(currentUser.currentPayment);
  const [reductionAmount, setReductionAmount] = useState(currentUser.recommendedReduction || 1500);
  const [postponeMonths, setPostponeMonths] = useState(1); // Always start with 1 month
  const [repayMonths, setRepayMonths] = useState(12);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEarlyRepayment, setIsEarlyRepayment] = useState(false);
  const [isRestrictedUser, setIsRestrictedUser] = useState(false);
  
  const MAX_FLEX_PER_YEAR = 3;
  const remainingFlexCount = MAX_FLEX_PER_YEAR - currentUser.flexUsedThisYear;
  
  // Get the current user's risk profile
  const currentRiskProfile: RiskProfile | undefined = getRiskProfile(currentUser.riskProfileId);
  
  // Check if the user is restricted from using flex
  const isUserRestricted = currentRiskProfile?.restrictFlexUsage || false;
  
  // Update user data when selectedUserId changes
  useEffect(() => {
    const user = getUser(selectedUserId);
    if (user) {
      setCurrentUser(user);
      setCurrentPayment(user.currentPayment);
      setReductionAmount(user.recommendedReduction || Math.round(user.currentPayment * 0.25));
      setPostponeMonths(1); // Reset postpone months to 1 when switching users
      setRepayMonths(12); // Reset repay months to default
      
      // Reset modal states when changing users
      setIsConfirming(false);
      setIsEarlyRepayment(false);
      setIsRestrictedUser(false);
    }
  }, [selectedUserId]);

  // Update reduction amount when current payment changes
  useEffect(() => {
    // When current payment changes, adjust the reduction amount to be at most 50% of current payment
    // and not less than 500 or more than 3000
    const maxReduction = Math.min(3000, Math.floor(currentPayment * 0.5));
    const safeReduction = Math.min(maxReduction, reductionAmount);
    if (safeReduction !== reductionAmount) {
      setReductionAmount(safeReduction);
    }
  }, [currentPayment]);

  // Dispatch event when values change to update hero section
  useEffect(() => {
    // Create a custom event to notify the hero section about the changes
    const event = new CustomEvent('paymentValuesChanged', {
      detail: { 
        currentPayment,
        reducedPayment: currentPayment - reductionAmount,
        reductionAmount,
        postponeMonths,
        repayMonths,
        userId: selectedUserId,
        remainingFlexCount,
        effectiveRemainingFlexCount: remainingFlexCount - postponeMonths,
        flexUsedThisYear: currentUser.flexUsedThisYear,
        MAX_FLEX_PER_YEAR,
        predictedFinancialStress: currentRiskProfile?.predictedFinancialStress,
        isUserRestricted
      }
    });
    
    window.dispatchEvent(event);
  }, [currentPayment, reductionAmount, postponeMonths, repayMonths, selectedUserId, currentUser.flexUsedThisYear, remainingFlexCount, currentRiskProfile]);

  // Calculate adjusted payments
  const reducedPayment = currentPayment - reductionAmount;
  const totalPostponedAmount = reductionAmount * postponeMonths;
  const monthlyExtra = Math.ceil(totalPostponedAmount / repayMonths);
  const futurePayment = currentPayment + monthlyExtra;
  
  // Calculate bank fees based on the postpone period and repay months
  const baseFeePercentage = 0.5; // Base fee percentage
  const bankFeePercentage = baseFeePercentage + (repayMonths * 0.1); // Fee increases with more months
  const bankFeeAmount = Math.round((totalPostponedAmount * bankFeePercentage) / 100);

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleApply = () => {
    // Check if user is restricted from using flex
    if (isUserRestricted) {
      setIsRestrictedUser(true);
      return;
    }
    
    // Check flex count
    if (postponeMonths > remainingFlexCount) {
      toast({
        title: "חריגה ממכסת הגמישות השנתית",
        description: `ניתן להשתמש בגמישות עוד ${remainingFlexCount} פעמים השנה`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    setIsConfirming(true);
  };
  
  const handleConfirm = () => {
    toast({
      title: "בקשת גמישות נשלחה בהצלחה!",
      description: `התשלום הופחת ב-${reductionAmount.toLocaleString()} ₪ למשך ${postponeMonths} חודשים. ההפרש בסך ${totalPostponedAmount.toLocaleString()} ₪ יתחלק על פני ${repayMonths} החודשים הבאים.`,
      duration: 5000,
    });
    setIsConfirming(false);
  };
  
  const handleCancel = () => {
    setIsConfirming(false);
  };
  
  const handleShowEarlyRepayment = () => {
    setIsEarlyRepayment(true);
  };
  
  const handleCloseEarlyRepayment = () => {
    setIsEarlyRepayment(false);
  };
  
  const handleEarlyRepaymentConfirm = (amount: number) => {
    toast({
      title: "בקשת פירעון מוקדם התקבלה",
      description: `בקשתך לפירעון מוקדם בסך ${amount.toLocaleString()} ₪ התקבלה ותטופל בהקדם`,
      duration: 5000,
    });
    setIsEarlyRepayment(false);
  };
  
  const handleCloseRestrictedUser = () => {
    setIsRestrictedUser(false);
  };

  // Generate chart data
  const generateChartData = () => {
    const data = [];
    
    // Current months with reduced payment
    for (let i = 0; i < postponeMonths; i++) {
      data.push({
        name: i === 0 ? 'חודש נוכחי' : `חודש ${i + 1}`,
        תשלום: reducedPayment,
        תוספת: 0
      });
    }

    // Future months with increased payment
    for (let i = 0; i < Math.min(repayMonths, 6); i++) {
      data.push({
        name: `חודש ${postponeMonths + i + 1}`,
        תשלום: currentPayment,
        תוספת: monthlyExtra
      });
    }

    return data;
  };

  return {
    currentUser,
    selectedUserId,
    handleSelectUser,
    currentPayment,
    setCurrentPayment,
    reductionAmount,
    setReductionAmount,
    postponeMonths,
    setPostponeMonths,
    repayMonths,
    setRepayMonths,
    reducedPayment,
    monthlyExtra,
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
    bankFeePercentage
  };
};
