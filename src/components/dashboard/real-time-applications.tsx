import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type {
  LiveApplication,
  ApplicationStatus,
} from '@/types/dashboard-data';
import { Activity } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';

interface RealTimeApplicationsProps {
  liveApplications: LiveApplication[];
}

const chartConfig = {
  applications: {
    label: 'Applications',
    color: 'var(--chart-1)',
  },
  approved: {
    label: 'Approved',
    color: 'var(--chart-2)',
  },
  pending: {
    label: 'Pending',
    color: 'var(--chart-3)',
  },
  rejected: {
    label: 'Rejected',
    color: 'var(--chart-4)',
  },
};

function getStatusBadgeStyle(status: ApplicationStatus) {
  switch (status) {
    case 'Approved':
      return {
        backgroundColor: 'var(--chart-2)',
        borderColor: 'var(--chart-2)',
        color: 'white',
      };
    case 'Pending':
      return {
        backgroundColor: 'var(--chart-3)',
        borderColor: 'var(--chart-3)',
        color: 'white',
      };
    case 'Rejected':
      return {
        backgroundColor: 'var(--chart-4)',
        borderColor: 'var(--chart-4)',
        color: 'white',
      };
  }
}

export function RealTimeApplications({
  liveApplications,
}: RealTimeApplicationsProps) {
  const chartData = useMemo(() => {
    const grouped = new Map<
      string,
      { timestamp: string; approved: number; pending: number; rejected: number }
    >();

    liveApplications.forEach((app) => {
      // Extract minute from timestamp (HH:MM)
      const minute = app.timestamp.slice(0, 5);

      if (!grouped.has(minute)) {
        grouped.set(minute, {
          timestamp: minute,
          approved: 0,
          pending: 0,
          rejected: 0,
        });
      }

      const entry = grouped.get(minute)!;
      if (app.status === 'Approved') entry.approved++;
      else if (app.status === 'Pending') entry.pending++;
      else if (app.status === 'Rejected') entry.rejected++;
    });

    return Array.from(grouped.values()).sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp)
    );
  }, [liveApplications]);

  const recentApplications = useMemo(
    () => [...liveApplications].reverse().slice(0, 15),
    [liveApplications]
  );

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Real-Time Loan Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => {
                    return `${value} applications`;
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="approved"
              stackId="1"
              stroke="var(--chart-2)"
              fill="var(--chart-2)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="pending"
              stackId="1"
              stroke="var(--chart-3)"
              fill="var(--chart-3)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="rejected"
              stackId="1"
              stroke="var(--chart-4)"
              fill="var(--chart-4)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ChartContainer>

        <div>
          <h3 className="text-sm font-bold mb-3">Recent Applications</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplications.map((app) => (
                <TableRow key={app.applicationId}>
                  <TableCell className="font-mono text-xs">
                    {app.applicationId}
                  </TableCell>
                  <TableCell>{app.timestamp}</TableCell>
                  <TableCell>{app.loanType}</TableCell>
                  <TableCell>${app.requestedAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge style={getStatusBadgeStyle(app.status)}>
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
