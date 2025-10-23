import { useDashboardStore } from '@/store/dashboard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TIME_RANGE_OPTIONS = [
  { label: 'Last 24 Hours', value: '24h' as const },
  { label: 'Last 7 Days', value: '7d' as const },
  { label: 'Last 30 Days', value: '30d' as const },
  { label: 'All Time', value: 'all' as const },
];

const COUNTRY_OPTIONS = [
  { label: 'All Countries', value: 'all' as const },
  { label: 'USA', value: 'usa' as const },
  { label: 'United Kingdom', value: 'uk' as const },
  { label: 'Germany', value: 'germany' as const },
  { label: 'Canada', value: 'canada' as const },
  { label: 'France', value: 'france' as const },
];

export function ControlPanel() {
  const {
    timeRange,
    country,
    panelMode,
    setTimeRange,
    setCountry,
    setPanelMode,
  } = useDashboardStore();

  return (
    <div className="border-b bg-background p-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs
            value={panelMode}
            onValueChange={(value) =>
              setPanelMode(value as 'classic' | 'modular')
            }
          >
            <TabsList>
              <TabsTrigger value="modular">Modular</TabsTrigger>
              <TabsTrigger value="classic">Classic</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
