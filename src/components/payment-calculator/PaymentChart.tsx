
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PaymentChartProps {
  data: Array<{
    name: string;
    תשלום: number;
    תוספת: number;
  }>;
  maxValue: number;
}

const PaymentChart: React.FC<PaymentChartProps> = ({ data, maxValue }) => {
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
    </>
  );
};

export default PaymentChart;
