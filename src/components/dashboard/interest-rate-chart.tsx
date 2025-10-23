import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Percent } from 'lucide-react';
import type { InterestRateData } from '@/types/dashboard-data';

const chartConfig = {
  issuedAmount: {
    label: 'Issued Amount',
    color: 'var(--chart-1)',
  },
  averageRate: {
    label: 'Average Rate',
    color: 'var(--chart-2)',
  },
};

interface InterestRateChartProps {
  interestRateData: InterestRateData[];
}

export function InterestRateChart({
  interestRateData,
}: InterestRateChartProps) {
  // 1M, 2M
  const formatYAxisAmount = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const formatYAxisRate = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="size-5" />
          Interest Rate vs Loan Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ComposedChart data={interestRateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="loanType"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxisAmount}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxisRate}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === 'issuedAmount') {
                      return `$${Number(value).toLocaleString()}`;
                    }
                    if (name === 'averageRate') {
                      return `${Number(value).toFixed(2)}%`;
                    }
                    return value;
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              yAxisId="left"
              dataKey="issuedAmount"
              fill="var(--chart-1)"
              radius={[8, 8, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="averageRate"
              stroke="var(--chart-2)"
              strokeWidth={3}
              dot={{
                fill: 'var(--chart-2)',
                r: 4,
              }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
