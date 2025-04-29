export interface RiskProfile {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  creditScore: number;
  dtiRatio: number; // Debt to income ratio (%)
  ltvRatio: number; // Loan to value ratio (%)
  employmentYears: number;
  downPaymentPercent: number;
  financialReservesMonths: number;
  monthlyIncome: number;
  flags: string[];
  occupation: string;
  age: number;
  familyStatus: string;
  propertyValue: number;
  requestedLoanAmount: number;
  recommendedInterestRate?: number;
  loanTerm: number;
  loanType: 'fixed' | 'variable';
  propertyLocation: string;
  // New fields for AI prediction
  predictedFinancialStress: {
    periods: { month: string; reason: string }[];
    nextStressPeriod?: string;
  };
  // Early repayment options
  earlyRepaymentOptions: {
    maxAmount: number;
    interestSavings: number;
    bankFee: number;
    feePercentage: number;
  };
  // Restrict flex usage
  restrictFlexUsage?: boolean;
}

export const riskProfiles: RiskProfile[] = [
  {
    id: "low-risk",
    name: "דן ישראלי",
    riskLevel: "low",
    creditScore: 780,
    dtiRatio: 25,
    ltvRatio: 55,
    employmentYears: 7,
    downPaymentPercent: 45,
    financialReservesMonths: 8,
    monthlyIncome: 28000,
    flags: ["השקעה מוצלחת בשוק ההון", "תיק נכסים מגוון"],
    occupation: "מנהל בכיר בחברת היי-טק",
    age: 42,
    familyStatus: "נשוי + 2",
    propertyValue: 3200000,
    requestedLoanAmount: 1760000,
    recommendedInterestRate: 2.8,
    loanTerm: 20,
    loanType: "fixed",
    propertyLocation: "רמת אביב, תל אביב",
    predictedFinancialStress: {
      periods: [],
      nextStressPeriod: undefined
    },
    earlyRepaymentOptions: {
      maxAmount: 200000,
      interestSavings: 52000,
      bankFee: 1200,
      feePercentage: 0.6
    }
  },
  {
    id: "medium-risk",
    name: "מיכל כהן",
    riskLevel: "medium",
    creditScore: 710,
    dtiRatio: 35,
    ltvRatio: 68,
    employmentYears: 2.5,
    downPaymentPercent: 32,
    financialReservesMonths: 4,
    monthlyIncome: 15000,
    flags: ["עצמאית עם הכנסה יציבה יחסית", "איחור קל בתשלומי אשראי בעבר"],
    occupation: "מעצבת גרפית עצמאית",
    age: 36,
    familyStatus: "רווקה",
    propertyValue: 1800000,
    requestedLoanAmount: 1224000,
    recommendedInterestRate: 3.5,
    loanTerm: 25,
    loanType: "fixed",
    propertyLocation: "ראשון לציון, מרכז",
    predictedFinancialStress: {
      periods: [
        { month: "אוקטובר 2025", reason: "ירידה צפויה בהכנסות מלקוחות עסקיים" },
        { month: "פברואר 2026", reason: "תשלומי מס שנתיים" }
      ],
      nextStressPeriod: "אוקטובר 2025"
    },
    earlyRepaymentOptions: {
      maxAmount: 80000,
      interestSavings: 18500,
      bankFee: 640,
      feePercentage: 0.8
    }
  },
  {
    id: "high-risk",
    name: "יוסי לוי",
    riskLevel: "high",
    creditScore: 640,
    dtiRatio: 47,
    ltvRatio: 85,
    employmentYears: 0.8,
    downPaymentPercent: 15,
    financialReservesMonths: 1,
    monthlyIncome: 12000,
    flags: ["החלפת מקום עבודה לאחרונה", "חובות בכרטיסי אשראי", "מסגרת אשראי מנוצלת במלואה"],
    occupation: "איש מכירות",
    age: 29,
    familyStatus: "נשוי",
    propertyValue: 1500000,
    requestedLoanAmount: 1275000,
    recommendedInterestRate: 5.2,
    loanTerm: 30,
    loanType: "variable",
    propertyLocation: "באר שבע, דרום",
    predictedFinancialStress: {
      periods: [
        { month: "אוגוסט 2025", reason: "תקופת מכירות חלשה" },
        { month: "דצמבר 2025", reason: "הוצאות רפואיות צפויות" },
        { month: "מרץ 2026", reason: "חידוש חוזה שכירות משרד" }
      ],
      nextStressPeriod: "אוגוסט 2025"
    },
    earlyRepaymentOptions: {
      maxAmount: 30000,
      interestSavings: 9800,
      bankFee: 450,
      feePercentage: 1.5
    },
    restrictFlexUsage: true
  }
];

export const getRiskProfile = (profileId: string): RiskProfile | undefined => {
  return riskProfiles.find(profile => profile.id === profileId);
};

export const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getRiskLevelHoverCard = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'low':
      return 'border-green-200 bg-green-50';
    case 'medium':
      return 'border-yellow-200 bg-yellow-50';
    case 'high':
      return 'border-red-200 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('he-IL').format(amount);
};

export const calculateBankFee = (amount: number, months: number, basePercentage: number): number => {
  // The longer the repayment period, the higher the fee
  const monthMultiplier = 1 + (months * 0.05);
  return Math.round(amount * basePercentage * monthMultiplier / 100);
};
