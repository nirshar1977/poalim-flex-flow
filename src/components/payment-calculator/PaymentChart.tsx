
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';

interface PaymentChartProps {
  data: Array<{
    name: string;
    תשלום: number;
    תוספת: number;
  }>;
  maxValue: number;
  postponeMonths: number;
  repayMonths: number;
  monthlyExtra: number;
}

const PaymentChart: React.FC<PaymentChartProps> = ({ 
  data, 
  maxValue,
  postponeMonths,
  repayMonths,
  monthlyExtra
}) => {
  // Calculate where the transition happens
  const transitionPoint = postponeMonths;
  const totalDisplayedMonths = Math.min(postponeMonths + repayMonths, postponeMonths + 6);

  // Enhanced tooltip formatting
  const formatTooltip = (value: number, name: string) => {
    switch(name) {
      case 'תשלום':
        return [`${value.toLocaleString()} ₪`, 'תשלום בסיסי'];
      case 'תוספת':
        return [`${value.toLocaleString()} ₪`, 'תוספת החזר'];
      default:
        return [`${value.toLocaleString()} ₪`, name];
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              domain={[0, maxValue * 1.2]}
              axisLine={false}
              tickFormatter={(value) => `${value} ₪`}
            />
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'right',
                direction: 'rtl'
              }}
              labelStyle={{
                fontWeight: 'bold',
                marginBottom: '5px'
              }}
            />
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
            
            {/* Reference line to show the transition */}
            {postponeMonths > 0 && (
              <ReferenceLine 
                x={data[transitionPoint-1]?.name} 
                stroke="#D0021B" 
                strokeDasharray="3 3"
                strokeWidth={2}
                >
                <Label 
                  value="סיום הפחתה" 
                  position="insideTopRight"
                  fill="#D0021B"
                  fontSize={12}
                />
              </ReferenceLine>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 text-center">
        <div className="bg-gray-100 p-3 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">סיכום התשלומים</h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white p-2 rounded-lg">
              <p className="text-sm text-gray-600">תקופת הפחתה</p>
              <p className="font-bold">{postponeMonths} {postponeMonths === 1 ? 'חודש' : 'חודשים'}</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <p className="text-sm text-gray-600">תקופת החזר הפרש</p>
              <p className="font-bold">{repayMonths} חודשים</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <p className="text-sm text-gray-600">תוספת חודשית</p>
              <p className="font-bold text-poalim-red">{monthlyExtra.toLocaleString()} ₪</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <p className="text-sm text-gray-600">סך החזר לחודש</p>
              <p className="font-bold text-poalim-red">{(monthlyExtra ? monthlyExtra : 0).toLocaleString()} ₪</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="h-3 w-10 rounded-full bg-poalim-red mb-2"></div>
            <p className="text-sm text-gray-600">תשלום בסיסי</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 w-10 rounded-full bg-poalim-red/60 mb-2"></div>
            <p className="text-sm text-gray-600">תוספת החזר הפרש</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentChart;
