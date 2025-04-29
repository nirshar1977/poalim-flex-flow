
import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { RiskProfile, getRiskLevelColor, getRiskLevelHoverCard } from '@/services/riskProfiles';
import { AlertCircle, Clock, DollarSign, Percent, Shield } from 'lucide-react';

interface UserRiskTooltipProps {
  children: React.ReactNode;
  profile: RiskProfile;
  className?: string;
}

const riskLevelText = {
  low: 'סיכון נמוך',
  medium: 'סיכון בינוני',
  high: 'סיכון גבוה'
};

const UserRiskTooltip: React.FC<UserRiskTooltipProps> = ({ children, profile, className }) => {
  // Format currency with commas
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL').format(amount);
  };
  
  // Get Hebrew risk level text
  const getRiskLevelText = (riskLevel: string) => {
    return riskLevelText[riskLevel as keyof typeof riskLevelText] || 'לא ידוע';
  };

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span className={className}>{children}</span>
      </HoverCardTrigger>
      <HoverCardContent 
        align="start" 
        className={`${getRiskLevelHoverCard(profile.riskLevel)} w-80 p-4 border-2 shadow-lg`}
      >
        <div className="space-y-4 text-right">
          <div className="flex justify-between items-center">
            <Badge className={`${getRiskLevelColor(profile.riskLevel)}`}>
              {getRiskLevelText(profile.riskLevel)}
            </Badge>
            <h3 className="text-lg font-bold">{profile.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center justify-end gap-1">
              <span>{profile.creditScore}</span>
              <span className="font-semibold">דירוג אשראי:</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <span>{`${profile.dtiRatio}%`}</span>
              <span className="font-semibold">יחס חוב להכנסה:</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <span>{`${profile.ltvRatio}%`}</span>
              <span className="font-semibold">יחס הלוואה לשווי:</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <span>{`${profile.employmentYears} שנים`}</span>
              <span className="font-semibold">יציבות תעסוקתית:</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm">פרטי הלוואה:</span>
            <div className="flex justify-between text-xs">
              <span>{`${formatCurrency(profile.requestedLoanAmount)} ₪`}</span>
              <span>סכום מבוקש</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>{`${profile.downPaymentPercent}%`}</span>
              <span>הון עצמי</span>
            </div>
            {profile.recommendedInterestRate && (
              <div className="flex justify-between text-xs">
                <span>{`${profile.recommendedInterestRate}%`}</span>
                <span>ריבית מומלצת</span>
              </div>
            )}
          </div>

          {profile.flags && profile.flags.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <span className="font-semibold text-sm block mb-1">דגלים:</span>
              <ul className="text-xs space-y-1">
                {profile.flags.map((flag, index) => (
                  <li key={index} className="flex items-center gap-1 justify-end">
                    <span>{flag}</span>
                    {profile.riskLevel === 'high' ? (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    ) : profile.riskLevel === 'medium' ? (
                      <Clock className="h-3 w-3 text-yellow-500" />
                    ) : (
                      <Shield className="h-3 w-3 text-green-500" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserRiskTooltip;
