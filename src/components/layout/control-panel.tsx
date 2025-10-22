import { useDashboardStore } from "@/store/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIME_RANGE_OPTIONS = [
  { label: "Last 24 Hours", value: "24h" as const },
  { label: "Last 7 Days", value: "7d" as const },
  { label: "Last 30 Days", value: "30d" as const },
  { label: "All Time", value: "all" as const },
];

const COUNTRY_OPTIONS = [
  { label: "All Countries", value: "all" as const },
  { label: "USA", value: "usa" as const },
  { label: "United Kingdom", value: "uk" as const },
  { label: "Germany", value: "germany" as const },
  { label: "Canada", value: "canada" as const },
  { label: "France", value: "france" as const },
];

export function ControlPanel() {
  const { timeRange, country, setTimeRange, setCountry } = useDashboardStore();

  return (
    <div className="border-b bg-background px-6 py-4">
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
    </div>
  );
}
