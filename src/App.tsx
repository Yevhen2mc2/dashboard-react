import { ThemeProvider } from '@/components/layout/theme-provider.tsx';
import { Header } from '@/components/layout/header.tsx';
import { ControlPanel } from '@/components/layout/control-panel.tsx';
import { OverviewCards } from '@/components/dashboard/overview-cards.tsx';
import { LoanIssuanceChart } from '@/components/dashboard/loan-issuance-chart.tsx';
import { LoanTypeChart } from '@/components/dashboard/loan-type-chart.tsx';
import { AgeDistributionChart } from '@/components/dashboard/age-distribution-chart.tsx';
import { RegionTreemap } from '@/components/dashboard/region-treemap.tsx';
import { InterestRateChart } from '@/components/dashboard/interest-rate-chart.tsx';
import { RealTimeApplications } from '@/components/dashboard/real-time-applications.tsx';
import { useLoanDashboardData } from '@/hooks';
import { useDashboardStore } from '@/store/dashboard';

function App() {
  const dashboardData = useLoanDashboardData();
  const { panelMode } = useDashboardStore();

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <ControlPanel />
        <main className="flex-1 container mx-auto px-4 py-6">
          {panelMode === 'classic' ? (
            <div className="flex flex-col gap-6">
              <OverviewCards overviewData={dashboardData.overviewData} />
              <LoanIssuanceChart issuanceData={dashboardData.issuanceData} />
              <LoanTypeChart loanTypeData={dashboardData.loanTypeData} />
              <AgeDistributionChart
                ageDistribution={dashboardData.ageDistribution}
              />
              <RegionTreemap regionData={dashboardData.regionData} />
              <InterestRateChart
                interestRateData={dashboardData.interestRateData}
              />
              <RealTimeApplications
                liveApplications={dashboardData.liveApplications}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <OverviewCards overviewData={dashboardData.overviewData} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LoanIssuanceChart
                    issuanceData={dashboardData.issuanceData}
                  />
                </div>
                <div className="lg:col-span-1">
                  <LoanTypeChart loanTypeData={dashboardData.loanTypeData} />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <AgeDistributionChart
                    ageDistribution={dashboardData.ageDistribution}
                  />
                </div>
                <div className="lg:col-span-2">
                  <RegionTreemap regionData={dashboardData.regionData} />
                </div>
              </div>
              <InterestRateChart
                interestRateData={dashboardData.interestRateData}
              />
              <RealTimeApplications
                liveApplications={dashboardData.liveApplications}
              />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
