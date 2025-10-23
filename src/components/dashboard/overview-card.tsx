import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Line, LineChart } from "recharts";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trendData: number[];
  changePercent: number;
  formatValue?: (value: number | string) => string;
  isNegativeGood?: boolean; // For metrics like default rate where lower is better
}

export function OverviewCard({
  title,
  value,
  icon: Icon,
  trendData,
  changePercent,
  formatValue,
  isNegativeGood = false,
}: OverviewCardProps) {
  const formattedValue = formatValue ? formatValue(value) : value;

  // Determine if change is positive (green) or negative (red)
  const isPositive = isNegativeGood ? changePercent < 0 : changePercent > 0;
  const changeColor = isPositive
    ? "text-green-600 dark:text-green-500"
    : "text-red-600 dark:text-red-500";
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;

  // Prepare chart data
  const chartData = trendData.map((value, index) => ({
    index,
    value,
    label: `Point ${index + 1}`,
  }));

  return (
    <Card className="">
      <CardContent className="px-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              {formattedValue}
            </h3>
          </div>
          <Icon className="size-6 text-primary" />
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}
          >
            <ChangeIcon className="size-4" />
            <span>{Math.abs(changePercent).toFixed(2)}%</span>
          </div>

          <div className="flex-1 ml-4">
            <ChartContainer
              config={{
                value: {
                  label: title,
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-14 w-full"
            >
              <LineChart data={chartData}>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => {
                        return formatValue
                          ? formatValue(value as number)
                          : value;
                      }}
                    />
                  }
                  cursor={false}
                  offset={0}
                  position={{ y: -60 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
