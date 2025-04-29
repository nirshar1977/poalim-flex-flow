
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { RiskProfile } from '@/services/riskProfiles';
import { getUser, UserMortgageProfile } from '@/services/mockUserData';
import { Calendar, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

// Generate expense data based on risk profile and seasonal patterns
const generateExpenseData = (user: UserMortgageProfile, riskProfile?: RiskProfile) => {
  const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  const data = [];
  
  // Base monthly expense as a percentage of income
  const baseExpenseRatio = riskProfile ? (0.4 + (0.1 * (riskProfile.riskLevel === 'high' ? 2 : riskProfile.riskLevel === 'medium' ? 1 : 0))) : 0.4;
  const baseExpense = Math.round((riskProfile?.monthlyIncome || 15000) * baseExpenseRatio);
  
  // Holidays and seasonal factors (Jewish calendar approximately)
  const highExpenseMonths = {
    'ספטמבר': 1.4, // Rosh Hashanah / Holidays
    'אפריל': 1.3,  // Passover
    'דצמבר': 1.25, // Hanukkah / End of year
    'אוגוסט': 1.2  // Summer vacation / Back to school
  };

  // Add financial stress periods from risk profile
  const stressPeriods: Record<string, number> = {};
  
  if (riskProfile?.predictedFinancialStress?.periods) {
    riskProfile.predictedFinancialStress.periods.forEach(period => {
      // Extract month from period string (format: "Month YYYY")
      const monthStr = period.month.split(' ')[0];
      if (months.includes(monthStr)) {
        stressPeriods[monthStr] = 1.5; // 50% increase in expenses during stress periods
      }
    });
  }
  
  // Financial volatility based on risk level
  const volatility = riskProfile?.riskLevel === 'high' ? 0.2 : 
                     riskProfile?.riskLevel === 'medium' ? 0.1 : 0.05;
  
  // Generate data for each month
  for (let i = 0; i < 12; i++) {
    const month = months[i];
    
    // Apply seasonal factors and random variations
    let expenseMultiplier = 1;
    
    // Apply high expense seasons
    if (highExpenseMonths[month]) {
      expenseMultiplier *= highExpenseMonths[month];
    }
    
    // Apply financial stress periods
    if (stressPeriods[month]) {
      expenseMultiplier *= stressPeriods[month];
    }
    
    // Add random variation based on risk profile volatility
    const randomVariation = 1 + (Math.random() * 2 - 1) * volatility;
    expenseMultiplier *= randomVariation;
    
    // Calculate final expense
    const expense = Math.round(baseExpense * expenseMultiplier);
    
    // Add income and mortgage payment
    const income = riskProfile?.monthlyIncome || 15000;
    const mortgage = user.currentPayment;
    const savings = Math.max(0, income - expense - mortgage);
    
    // Create data point
    data.push({
      name: month,
      הוצאות: expense,
      משכנתא: mortgage,
      חיסכון: savings,
      הכנסה: income,
      isStressPeriod: !!stressPeriods[month]
    });
  }
  
  return data;
};

interface CustomerTrendAnalysisProps {
  userId: string;
  riskProfile?: RiskProfile;
}

const CustomerTrendAnalysis: React.FC<CustomerTrendAnalysisProps> = ({ userId, riskProfile }) => {
  const user = getUser(userId) || { currentPayment: 0, name: '', totalBalance: 0, remainingMonths: 0, interestRate: 0, loanStartDate: '', flexUsedThisYear: 0, riskProfileId: '', id: '' };
  const expenseData = generateExpenseData(user, riskProfile);
  
  // Find months with financial stress
  const stressMonths = expenseData
    .filter(month => month.isStressPeriod)
    .map(month => month.name);
  
  // Find months with positive savings potential
  const positiveSavingsMonths = expenseData
    .filter(month => month.חיסכון > user.currentPayment * 0.5)
    .map(month => month.name);
  
  const formatTooltipValue = (value: number) => {
    return `${value.toLocaleString()} ₪`;
  };
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-poalim-darkText mb-3">ניתוח מגמות פיננסיות (AI)</h3>
      
      <div className="bg-white rounded-xl p-4 h-[300px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={expenseData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
            <Tooltip 
              formatter={(value: number, name: string) => [formatTooltipValue(value), name]}
              contentStyle={{ textAlign: 'right', direction: 'rtl' }}
            />
            <Line type="monotone" dataKey="הכנסה" stroke="#4CAF50" strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="הוצאות" stroke="#FF9800" strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="משכנתא" stroke="#D0021B" strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="חיסכון" stroke="#2196F3" strokeWidth={2} dot={{ r: 2 }} />
            
            {/* Reference lines for current month */}
            <ReferenceLine x="מאי" stroke="#666" strokeDasharray="3 3" label={{ value: 'חודש נוכחי', position: 'top', fill: '#666' }} />
            
            {/* Reference areas for stress periods could be added here */}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {stressMonths.length > 0 && (
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <div className="flex justify-end items-center gap-2 mb-2">
              <h4 className="font-bold text-amber-800">תקופות לחץ פיננסי צפויות</h4>
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              {stressMonths.map((month, index) => (
                <li key={index} className="flex justify-end items-center gap-2">
                  <span>{month}</span>
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                </li>
              ))}
            </ul>
            <p className="text-xs text-amber-600 mt-2 text-right">מומלץ להשתמש בהפחתת תשלומים בחודשים אלו</p>
          </div>
        )}
        
        {positiveSavingsMonths.length > 0 && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex justify-end items-center gap-2 mb-2">
              <h4 className="font-bold text-green-800">חודשים מומלצים לפירעון מוקדם</h4>
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              {positiveSavingsMonths.map((month, index) => (
                <li key={index} className="flex justify-end items-center gap-2">
                  <span>{month}</span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </li>
              ))}
            </ul>
            <p className="text-xs text-green-600 mt-2 text-right">פוטנציאל לביצוע פירעון מוקדם והקטנת הריבית הכוללת</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerTrendAnalysis;
