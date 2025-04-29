
export interface UserMortgageProfile {
  id: string;
  name: string;
  currentPayment: number;
  remainingMonths: number;
  interestRate: number;
  totalBalance: number;
  loanStartDate: string;
  recommendedReduction?: number;
}

export const mockUsers: UserMortgageProfile[] = [
  {
    id: "user1",
    name: "דן ישראלי",
    currentPayment: 5200,
    remainingMonths: 240,
    interestRate: 3.5,
    totalBalance: 950000,
    loanStartDate: "2018-05-15",
    recommendedReduction: 1500,
  },
  {
    id: "user2",
    name: "מיכל כהן",
    currentPayment: 7800,
    remainingMonths: 180,
    interestRate: 2.8,
    totalBalance: 1250000,
    loanStartDate: "2020-11-03",
    recommendedReduction: 2100,
  },
  {
    id: "user3",
    name: "יוסי לוי",
    currentPayment: 3600,
    remainingMonths: 300,
    interestRate: 4.2,
    totalBalance: 780000,
    loanStartDate: "2022-02-28",
    recommendedReduction: 900,
  }
];

export const getUser = (userId: string): UserMortgageProfile | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getDefaultUser = (): UserMortgageProfile => {
  return mockUsers[0];
};
