import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { PieChartIcon } from 'lucide-react';
import type { LoanTypeData } from '@/types/dashboard-data';
const chartConfig = {
  Personal: {
    label: 'Personal',
    color: 'hsl(var(--chart-1))',
  },
  Auto: {
    label: 'Auto',
    color: 'hsl(var(--chart-2))',
  },
  Mortgage: {
    label: 'Mortgage',
    color: 'hsl(var(--chart-3))',
  },
  Business: {
    label: 'Business',
    color: 'hsl(var(--chart-4))',
  },
  Student: {
    label: 'Student',
    color: 'hsl(var(--chart-5))',
  },
};

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

interface LoanTypeChartProps {
  loanTypeData: LoanTypeData[];
}

export function LoanTypeChart({ loanTypeData }: LoanTypeChartProps) {
  // Format data for the chart
  const chartData = loanTypeData.map((item) => ({
    name: item.loanType,
    value: item.amount,
    count: item.count,
  }));

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5" />
          Loans by Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, props) => {
                    const count = props.payload?.count || 0;
                    return (
                      <div className="flex flex-col gap-1">
                        <span>{formatCurrency(value as number)}</span>
                        <span className="text-xs text-muted-foreground">
                          {count.toLocaleString()} loans
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(_entry) => ''}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
