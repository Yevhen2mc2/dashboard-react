import { ThemeProvider } from '@/components/layout/theme-provider.tsx';
import { Header } from '@/components/layout/header.tsx';
import { ControlPanel } from '@/components/layout/control-panel.tsx';
import { OverviewCards } from '@/components/dashboard/overview-cards.tsx';
import { LoanIssuanceChart } from '@/components/dashboard/loan-issuance-chart.tsx';
import { LoanTypeChart } from '@/components/dashboard/loan-type-chart.tsx';
import { AgeDistributionChart } from '@/components/dashboard/age-distribution-chart.tsx';
import { RegionTreemap } from '@/components/dashboard/region-treemap.tsx';
import { RealTimeApplications } from '@/components/dashboard/real-time-applications.tsx';
import { useLoanDashboardData } from '@/hooks';

function App() {
  const dashboardData = useLoanDashboardData();

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <ControlPanel />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <OverviewCards overviewData={dashboardData.overviewData} />
            <LoanIssuanceChart issuanceData={dashboardData.issuanceData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LoanTypeChart loanTypeData={dashboardData.loanTypeData} />
              <AgeDistributionChart
                ageDistribution={dashboardData.ageDistribution}
              />
            </div>
            <RegionTreemap regionData={dashboardData.regionData} />
            <RealTimeApplications
              liveApplications={dashboardData.liveApplications}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
