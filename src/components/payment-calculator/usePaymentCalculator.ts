
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getDefaultUser, getUser, UserMortgageProfile } from '@/services/mockUserData';

export const usePaymentCalculator = () => {
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string>(getDefaultUser().id);
  const [currentUser, setCurrentUser] = useState<UserMortgageProfile>(getDefaultUser());
  const [currentPayment, setCurrentPayment] = useState(currentUser.currentPayment);
  const [reductionAmount, setReductionAmount] = useState(currentUser.recommendedReduction || 1500);
  const [repayMonths, setRepayMonths] = useState(12);
  const [isConfirming, setIsConfirming] = useState(false);
  
  // Update user data when selectedUserId changes
  useEffect(() => {
    const user = getUser(selectedUserId);
    if (user) {
      setCurrentUser(user);
      setCurrentPayment(user.currentPayment);
      setReductionAmount(user.recommendedReduction || Math.round(user.currentPayment * 0.25));
    }
  }, [selectedUserId]);

  // Calculate adjusted payments
  const reducedPayment = currentPayment - reductionAmount;
  const monthlyExtra = Math.ceil(reductionAmount / repayMonths);
  const futurePayment = currentPayment + monthlyExtra;

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleApply = () => {
    setIsConfirming(true);
  };
  
  const handleConfirm = () => {
    toast({
      title: "בקשת גמישות נשלחה בהצלחה!",
      description: `התשלום הקרוב הופחת ב-${reductionAmount} ₪. ההפרש יתחלק על פני ${repayMonths} החודשים הבאים.`,
      duration: 5000,
    });
    setIsConfirming(false);
  };
  
  const handleCancel = () => {
    setIsConfirming(false);
  };

  // Generate chart data
  const generateChartData = () => {
    const data = [];
    
    // Current month with reduced payment
    data.push({
      name: 'חודש נוכחי',
      תשלום: reducedPayment,
      תוספת: 0
    });

    // Future months with increased payment
    for (let i = 1; i <= 6; i++) {
      data.push({
        name: `חודש ${i + 1}`,
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
    repayMonths,
    setRepayMonths,
    reducedPayment,
    monthlyExtra,
    futurePayment,
    isConfirming,
    handleApply,
    handleConfirm,
    handleCancel,
    generateChartData
  };
};
