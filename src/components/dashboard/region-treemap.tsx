import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ResponsiveContainer, Treemap } from 'recharts';
import { MapPin } from 'lucide-react';
import type { RegionData } from '@/types/dashboard-data';

const chartConfig = {
  loanAmount: {
    label: 'Loan Amount',
  },
};

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

interface RegionTreemapProps {
  regionData: RegionData[];
}

// Custom content component for Treemap cells - hide root node
const CustomizedContent = (props: any) => {
  const { depth, x, y, width, height, index, name, value } = props;

  // Don't render the root node (depth 0) - this is the transparent background element
  if (depth !== 1) return null;

  // Only show label if cell is large enough
  const showLabel = width > 60 && height > 40;

  // Format currency
  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(0)}K`;
    }
    return `$${val}`;
  };

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLORS[index % COLORS.length],
          stroke: 'var(--background)',
          strokeWidth: 2,
        }}
      />
      {showLabel && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 8}
            textAnchor="middle"
            fill="var(--background)"
            fontSize={14}
            fontWeight={600}
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 8}
            textAnchor="middle"
            fill="var(--background)"
            fontSize={12}
          >
            {formatValue(value)}
          </text>
        </>
      )}
    </g>
  );
};

export function RegionTreemap({ regionData }: RegionTreemapProps) {
  // Format data for treemap
  const chartData = regionData.map((item) => ({
    name: item.region,
    value: item.loanAmount,
    size: item.loanAmount,
  }));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Loans by Region
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={chartData}
              dataKey="size"
              isAnimationActive={false}
              aspectRatio={4 / 3}
              stroke="var(--background)"
              fill="var(--chart-1)"
              content={<CustomizedContent />}
            />
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
