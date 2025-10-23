import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users } from 'lucide-react';
import type { AgeDistributionData } from '@/types/dashboard-data';
const chartConfig = {
  borrowersCount: {
    label: 'Borrowers',
    color: 'hsl(var(--chart-1))',
  },
};

interface AgeDistributionChartProps {
  ageDistribution: AgeDistributionData[];
}

export function AgeDistributionChart({
  ageDistribution,
}: AgeDistributionChartProps) {
  // Format Y-axis
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Borrower Age Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={ageDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ageGroup"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => {
                    return `${(value as number).toLocaleString()} borrowers`;
                  }}
                />
              }
            />
            <Bar
              dataKey="borrowersCount"
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
