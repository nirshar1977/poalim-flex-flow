
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const PaymentCalculator: React.FC = () => {
  const { toast } = useToast();
  const [currentPayment, setCurrentPayment] = useState(5200);
  const [reductionAmount, setReductionAmount] = useState(1500);
  const [repayMonths, setRepayMonths] = useState(12);
  
  // Calculate adjusted payments
  const reducedPayment = currentPayment - reductionAmount;
  const monthlyExtra = Math.ceil(reductionAmount / repayMonths);
  const futurePayment = currentPayment + monthlyExtra;

  const handleApply = () => {
    toast({
      title: "בקשת גמישות נשלחה בהצלחה!",
      description: `התשלום הקרוב הופחת ב-${reductionAmount} ₪. ההפרש יתחלק על פני ${repayMonths} החודשים הבאים.`,
      duration: 5000,
    });
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
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="text-gray-600">סכום תשלום חודשי נוכחי:</label>
                <span className="font-bold">{currentPayment} ₪</span>
              </div>
              <Slider
                value={[currentPayment]}
                min={2000}
                max={10000}
                step={100}
                onValueChange={(value) => setCurrentPayment(value[0])}
                className="mb-6"
              />

              <div className="flex justify-between mb-2">
                <label className="text-gray-600">סכום להפחתה מהתשלום הנוכחי:</label>
                <span className="font-bold text-poalim-red">{reductionAmount} ₪</span>
              </div>
              <Slider
                value={[reductionAmount]}
                min={500}
                max={Math.min(3000, currentPayment - 1000)}
                step={100}
                onValueChange={(value) => setReductionAmount(value[0])}
                className="mb-6"
              />

              <div className="flex justify-between mb-2">
                <label className="text-gray-600">לפרוס את ההפרש על פני:</label>
                <span className="font-bold">{repayMonths} חודשים</span>
              </div>
              <Slider
                value={[repayMonths]}
                min={3}
                max={24}
                step={1}
                onValueChange={(value) => setRepayMonths(value[0])}
                className="mb-6"
              />
            </div>

            <div className="bg-white p-4 rounded-xl mb-6">
              <h4 className="text-lg font-bold text-poalim-darkText mb-4">סיכום</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-poalim-lightRed p-3 rounded-lg">
                  <p className="text-sm text-gray-600">תשלום נוכחי</p>
                  <p className="text-xl font-bold text-poalim-darkText">{currentPayment} ₪</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">תשלום מופחת</p>
                  <p className="text-xl font-bold text-green-600">{reducedPayment} ₪</p>
                  <p className="text-xs text-green-500">חיסכון: {reductionAmount} ₪</p>
                </div>
              </div>
              
              <div className="text-center p-3 rounded-lg border border-poalim-red bg-poalim-lightRed/30">
                <p className="text-sm text-gray-600">תשלום בחודשים הבאים</p>
                <p className="text-lg font-bold text-poalim-red">{futurePayment} ₪</p>
                <p className="text-xs text-gray-500">למשך {repayMonths} חודשים</p>
              </div>
            </div>

            <Button onClick={handleApply} className="w-full bg-poalim-red hover:bg-poalim-red/90">
              הפחת את התשלום הקרוב
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none card-shadow overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-poalim-darkText mb-6">השוואת תשלומים</h3>
            
            <div className="bg-white rounded-xl p-4 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={generateChartData()}
                  margin={{ top: 10, right: 0, left: 0, bottom: 30 }}
                >
                  <defs>
                    <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D0021B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#D0021B" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorExtra" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D0021B" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#D0021B" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickMargin={10} />
                  <YAxis 
                    domain={[0, Math.max(currentPayment, futurePayment) * 1.2]}
                    axisLine={false}
                    tickFormatter={(value) => `${value} ₪`}
                  />
                  <Tooltip formatter={(value) => [`${value} ₪`]} />
                  <Area 
                    type="monotone" 
                    dataKey="תשלום" 
                    stackId="1"
                    stroke="#D0021B" 
                    fill="url(#colorBase)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="תוספת" 
                    stackId="1"
                    stroke="#D0021B" 
                    fill="url(#colorExtra)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="h-3 w-10 rounded-full bg-poalim-red mb-2"></div>
                <p className="text-sm text-gray-600">תשלום בסיסי</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-3 w-10 rounded-full bg-poalim-red/60 mb-2"></div>
                <p className="text-sm text-gray-600">תוספת החזר הפרש</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PaymentCalculator;
