
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePaymentCalculator = () => {
  const { toast } = useToast();
  const [currentPayment, setCurrentPayment] = useState(5200);
  const [reductionAmount, setReductionAmount] = useState(1500);
  const [repayMonths, setRepayMonths] = useState(12);
  const [isConfirming, setIsConfirming] = useState(false);
  
  // Calculate adjusted payments
  const reducedPayment = currentPayment - reductionAmount;
  const monthlyExtra = Math.ceil(reductionAmount / repayMonths);
  const futurePayment = currentPayment + monthlyExtra;

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
