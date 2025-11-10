# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Running
```bash
npm run dev        # Start development server with Vite
npm run build      # TypeScript check + production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Architecture Overview

### State Management & Data Flow

**Global State (Zustand)**: The application uses Zustand with persistence for global state management in `src/store/dashboard.ts`:
- `panelMode`: Controls layout ("classic" vs "modular")
- `timeRange`: Global filter for time-based data ("24h", "7d", "30d", "all")
- `country`: Global filter for country-specific data ("all", "usa", "uk", "germany", "canada", "france")
- State persists to localStorage as `dashboard-store`

**Mock Data System**: The dashboard displays simulated real-time loan data:
- `src/lib/data-generators.ts`: Initial data generation using @faker-js/faker
- `src/lib/data-updaters.ts`: Incremental data updates to simulate live changes
- `src/hooks/useLoanDashboardData.ts`: Orchestrates data lifecycle with multiple update intervals:
  - 3s: Live applications, Overview cards
  - 10s: Issuance data, High-risk clients
  - 15s: Interest rate data
  - 30s: Loan type data, Portfolio yield
  - 60s: Age distribution, Region data

**Data Flow**: Global filters (timeRange, country) → `useLoanDashboardData` regenerates all data → Individual chart components receive filtered data as props

### Component Structure

**Layout Components** (`src/components/layout/`):
- `theme-provider.tsx`: Dark/light theme management
- `header.tsx`: Top navigation bar
- `control-panel.tsx`: Global filters and panel mode toggle
- `mode-toggle.tsx`: Theme switcher UI

**Dashboard Components** (`src/components/dashboard/`):
Each chart component is self-contained and receives pre-filtered data:
- `overview-cards.tsx`: Summary metrics with trend sparklines
- `loan-issuance-chart.tsx`: Time-series line chart
- `loan-type-chart.tsx`: Pie chart distribution
- `age-distribution-chart.tsx`: Bar chart
- `region-treemap.tsx`: Hierarchical treemap
- `interest-rate-chart.tsx`: Composed chart (bars + line)
- `real-time-applications.tsx`: Live updating table

**UI Components** (`src/components/ui/`):
- Shadcn/ui components styled with Tailwind CSS
- Configure via `components.json`
- Install new components: `npx shadcn@latest add [component-name]`

### TypeScript Types

All dashboard data types are centralized in `src/types/dashboard-data.ts`:
- Union types for enums: `LoanType`, `AgeGroup`, `ApplicationStatus`, `PaymentStatus`
- Interface per data block: `OverviewData`, `IssuanceDataPoint`, `LoanTypeData`, etc.
- Main type: `DashboardData` aggregates all data blocks

### Path Aliases

The project uses `@/` alias for absolute imports:
- Configured in `vite.config.ts` (resolve.alias)
- Declared in `tsconfig.json` (paths)
- Examples: `@/components`, `@/lib`, `@/hooks`, `@/store`, `@/types`

### Chart Library

Uses Recharts for all visualizations. Common patterns:
- Wrap charts in `<ResponsiveContainer>` for responsive sizing
- Use `<ChartContainer>` from `@/components/ui/chart` for consistent theming
- Color scheme defined in chart config objects

### React 19 Features

The project uses React 19 with React Compiler enabled:
- Configured in `vite.config.ts` via `babel-plugin-react-compiler`
- Automatic memoization - avoid manual `useMemo`/`useCallback` unless necessary
- Focus on declarative code patterns

### Styling

- **TailwindCSS v4** with Vite plugin
- **CSS Variables** for theming (light/dark mode)
- Theme configuration in Shadcn components uses CSS variables
- Base color: neutral

## Key Implementation Notes

1. **Adding New Dashboard Charts**:
   - Create type in `src/types/dashboard-data.ts`
   - Add generator function in `src/lib/data-generators.ts`
   - Add updater function in `src/lib/data-updaters.ts`
   - Add to `useLoanDashboardData` hook with appropriate interval
   - Create chart component in `src/components/dashboard/`
   - Add to App.tsx layout

2. **Filter Implementation**: Global filters in Zustand store automatically trigger data regeneration via useEffect in `useLoanDashboardData`. Country-specific scaling and region data are handled in generators.

3. **Real-time Updates**: Data updaters should maintain data shape and apply small incremental changes to simulate realistic live updates without full regeneration.

4. **Component Conventions**: Dashboard components follow pattern: accept typed props, use Recharts ResponsiveContainer, include Card wrapper from shadcn/ui.

5. **Shadcn MCP** use MCP server `.mcp.json` for manage shadcn 
