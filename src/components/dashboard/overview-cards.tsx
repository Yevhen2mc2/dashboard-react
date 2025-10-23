import { useState, useEffect } from "react";
import { useLoanDashboardData } from "@/hooks";
import { OverviewCard } from "./overview-card";
import { FileText, DollarSign, Percent, AlertTriangle } from "lucide-react";

interface TrendHistory {
  totalActiveLoans: number[];
  totalLoanAmount: number[];
  averageInterestRate: number[];
  defaultRate: number[];
}

const MAX_TREND_POINTS = 12;

export function OverviewCards() {
  const { overviewData } = useLoanDashboardData();

  // Track trend history for sparklines
  const [trendHistory, setTrendHistory] = useState<TrendHistory>({
    totalActiveLoans: [],
    totalLoanAmount: [],
    averageInterestRate: [],
    defaultRate: [],
  });

  // Update trend history when data changes
  useEffect(() => {
    setTrendHistory((prev) => {
      const addPoint = (arr: number[], newValue: number) => {
        const updated = [...arr, newValue];
        return updated.slice(-MAX_TREND_POINTS);
      };

      return {
        totalActiveLoans: addPoint(
          prev.totalActiveLoans,
          overviewData.totalActiveLoans,
        ),
        totalLoanAmount: addPoint(
          prev.totalLoanAmount,
          overviewData.totalLoanAmount,
        ),
        averageInterestRate: addPoint(
          prev.averageInterestRate,
          overviewData.averageInterestRate,
        ),
        defaultRate: addPoint(prev.defaultRate, overviewData.defaultRate),
      };
    });
  }, [overviewData]);

  // Calculate percentage changes
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
        trendData={trendHistory.totalActiveLoans}
        changePercent={calculateChange(trendHistory.totalActiveLoans)}
        formatValue={formatNumber}
      />

      <OverviewCard
        title="Total Loan Amount"
        value={overviewData.totalLoanAmount}
        icon={DollarSign}
        trendData={trendHistory.totalLoanAmount}
        changePercent={calculateChange(trendHistory.totalLoanAmount)}
        formatValue={formatCurrency}
      />

      <OverviewCard
        title="Average Interest Rate"
        value={overviewData.averageInterestRate}
        icon={Percent}
        trendData={trendHistory.averageInterestRate}
        changePercent={calculateChange(trendHistory.averageInterestRate)}
        formatValue={formatPercent}
      />

      <OverviewCard
        title="Default Rate"
        value={overviewData.defaultRate}
        icon={AlertTriangle}
        trendData={trendHistory.defaultRate}
        changePercent={calculateChange(trendHistory.defaultRate)}
        formatValue={formatPercent}
        isNegativeGood={true}
      />
    </div>
  );
}
