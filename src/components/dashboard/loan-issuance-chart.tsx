import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { IssuanceDataPoint } from '@/types/dashboard-data';

const chartConfig = {
  newLoans: {
    label: 'New Loans',
    color: 'hsl(var(--chart-1))',
  },
  loanAmount: {
    label: 'Loan Amount',
    color: 'hsl(var(--chart-2))',
  },
};

interface LoanIssuanceChartProps {
  issuanceData: IssuanceDataPoint[];
}

export function LoanIssuanceChart({ issuanceData }: LoanIssuanceChartProps) {
  // Format large numbers (1M, 2M, etc.)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Loan Issuance Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <LineChart data={issuanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    const formattedValue =
                      typeof value === 'number'
                        ? name === 'loanAmount'
                          ? `$${value.toLocaleString()}`
                          : value.toLocaleString()
                        : value;
                    return formattedValue;
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="newLoans"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="loanAmount"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
