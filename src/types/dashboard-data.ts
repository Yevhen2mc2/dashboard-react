// Type definitions for all dashboard data blocks

export type LoanType = 'Personal' | 'Auto' | 'Mortgage' | 'Business' | 'Student';
export type AgeGroup = '18-25' | '26-35' | '36-45' | '46-60' | '60+';
export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';
export type PaymentStatus = 'Current' | 'Late' | 'Default' | 'Restructured';

// Block 1: Overview Cards
export interface OverviewData {
  totalActiveLoans: number;
  totalLoanAmount: number;
  averageInterestRate: number;
  defaultRate: number;
}

// Block 2: Loan Issuance Over Time (LineChart)
export interface IssuanceDataPoint {
  timestamp: string;
  newLoans: number;
  loanAmount: number;
}

// Block 3: Loans by Type (PieChart)
export interface LoanTypeData {
  loanType: LoanType;
  count: number;
  amount: number;
}

// Block 4: Borrower Age Distribution (BarChart)
export interface AgeDistributionData {
  ageGroup: AgeGroup;
  borrowersCount: number;
}

// Block 5: Loans by Region (Treemap)
export interface RegionData {
  region: string;
  loanAmount: number;
}

// Block 6: Interest Rate vs Loan Type (ComposedChart)
export interface InterestRateData {
  loanType: LoanType;
  averageRate: number;
  issuedAmount: number;
}

// Block 7: Real-Time Loan Applications
export interface LiveApplication {
  applicationId: string;
  timestamp: string;
  loanType: LoanType;
  requestedAmount: number;
  status: ApplicationStatus;
}

// Block 8: Portfolio Yield (LineChart)
export interface PortfolioYieldData {
  month: string;
  yieldPercentage: number;
}

// Block 9: High-Risk Clients (Table)
export interface HighRiskClient {
  clientId: string;
  name: string;
  loanType: LoanType;
  amount: number;
  riskScore: number;
  paymentStatus: PaymentStatus;
}

// Main hook return type
export interface DashboardData {
  overviewData: OverviewData;
  issuanceData: IssuanceDataPoint[];
  loanTypeData: LoanTypeData[];
  ageDistribution: AgeDistributionData[];
  regionData: RegionData[];
  interestRateData: InterestRateData[];
  liveApplications: LiveApplication[];
  portfolioYield: PortfolioYieldData[];
  highRiskClients: HighRiskClient[];
}

