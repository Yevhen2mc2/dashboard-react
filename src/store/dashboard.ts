import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PanelMode = 'classic' | 'modular';
type TimeRange = '24h' | '7d' | '30d' | 'all';
type Country = 'all' | 'usa' | 'uk' | 'germany' | 'canada' | 'france';

interface DashboardStore {
  panelMode: PanelMode;
  setPanelMode: (mode: PanelMode) => void;
  
  // Global Filters
  timeRange: TimeRange;
  country: Country;
  setTimeRange: (range: TimeRange) => void;
  setCountry: (country: Country) => void;
  setFilters: (filters: { timeRange?: TimeRange; country?: Country }) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      // Panel Mode
      panelMode: 'classic',
      setPanelMode: (mode: PanelMode) => set({ panelMode: mode }),
      
      // Global Filters
      timeRange: '24h',
      country: 'all',
      setTimeRange: (range: TimeRange) => set({ timeRange: range }),
      setCountry: (country: Country) => set({ country }),
      setFilters: (filters: { timeRange?: TimeRange; country?: Country }) =>
        set((state) => ({
          timeRange: filters.timeRange ?? state.timeRange,
          country: filters.country ?? state.country,
        })),
    }),
    {
      name: 'dashboard-store',
      version: 1,
    }
  )
);
