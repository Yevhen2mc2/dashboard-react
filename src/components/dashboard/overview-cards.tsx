import { useLoanDashboardData } from "@/hooks";
import { OverviewCard } from "./overview-card";
import { FileText, DollarSign, Percent, AlertTriangle } from "lucide-react";

export function OverviewCards() {
  const { overviewData } = useLoanDashboardData();

  const calculateChange = (history: number[]): number => {
    if (history.length < 2) return 0;
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    return ((current - previous) / previous) * 100;
  };

  // Format functions
  const formatNumber = (value: number | string): string => {
    return typeof value === "number" ? value.toLocaleString("en-US") : value;
  };

  const formatCurrency = (value: number | string): string => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `$${(num / 1000000).toFixed(1)}M`;
  };

  const formatPercent = (value: number | string): string => {
    return `${value}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <OverviewCard
        title="Total Active Loans"
        value={overviewData.totalActiveLoans}
        icon={FileText}
        trendData={overviewData.totalActiveLoansTrend}
        changePercent={calculateChange(overviewData.totalActiveLoansTrend)}
        formatValue={formatNumber}
      />

      <OverviewCard
        title="Total Loan Amount"
        value={overviewData.totalLoanAmount}
        icon={DollarSign}
        trendData={overviewData.totalLoanAmountTrend}
        changePercent={calculateChange(overviewData.totalLoanAmountTrend)}
        formatValue={formatCurrency}
      />

      <OverviewCard
        title="Average Interest Rate"
        value={overviewData.averageInterestRate}
        icon={Percent}
        trendData={overviewData.averageInterestRateTrend}
        changePercent={calculateChange(overviewData.averageInterestRateTrend)}
        formatValue={formatPercent}
      />

      <OverviewCard
        title="Default Rate"
        value={overviewData.defaultRate}
        icon={AlertTriangle}
        trendData={overviewData.defaultRateTrend}
        changePercent={calculateChange(overviewData.defaultRateTrend)}
        formatValue={formatPercent}
        isNegativeGood={true}
      />
    </div>
  );
}
