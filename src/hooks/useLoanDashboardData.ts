import { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard';
import type { DashboardData } from '@/types/dashboard-data';
import {
  generateOverviewData,
  generateIssuanceData,
  generateLoanTypeData,
  generateAgeDistribution,
  generateRegionData,
  generateInterestRateData,
  generateLiveApplications,
  generatePortfolioYield,
  generateHighRiskClients,
} from '@/lib/data-generators';
import {
  updateOverviewData,
  updateIssuanceData,
  updateLoanTypeData,
  updateAgeDistribution,
  updateRegionData,
  updateInterestRateData,
  addLiveApplication,
  updatePortfolioYield,
  updateHighRiskClients,
} from '@/lib/data-updaters';

/**
 * Main hook for managing all dashboard mock data with live updates
 * 
 * Update Intervals:
 * - 3s: Live applications
 * - 5s: Overview cards
 * - 10s: Issuance data, High-risk clients
 * - 15s: Interest rate data
 * - 30s: Loan type data, Portfolio yield
 * - 60s: Age distribution, Region data
 */
export function useLoanDashboardData(): DashboardData {
  const { timeRange, country } = useDashboardStore();
  
  // Initialize all data states
  const [overviewData, setOverviewData] = useState(() => 
    generateOverviewData(country, timeRange)
  );
  
  const [issuanceData, setIssuanceData] = useState(() => 
    generateIssuanceData(country, timeRange)
  );
  
  const [loanTypeData, setLoanTypeData] = useState(() => 
    generateLoanTypeData(country)
  );
  
  const [ageDistribution, setAgeDistribution] = useState(() => 
    generateAgeDistribution(country)
  );
  
  const [regionData, setRegionData] = useState(() => 
    generateRegionData(country)
  );
  
  const [interestRateData, setInterestRateData] = useState(() => 
    generateInterestRateData(country)
  );
  
  const [liveApplications, setLiveApplications] = useState(() => 
    generateLiveApplications(country)
  );
  
  const [portfolioYield, setPortfolioYield] = useState(() => 
    generatePortfolioYield(country, timeRange)
  );
  
  const [highRiskClients, setHighRiskClients] = useState(() => 
    generateHighRiskClients(country)
  );
  
  // Regenerate data when filters change
  useEffect(() => {
    setOverviewData(generateOverviewData(country, timeRange));
    setIssuanceData(generateIssuanceData(country, timeRange));
    setLoanTypeData(generateLoanTypeData(country));
    setAgeDistribution(generateAgeDistribution(country));
    setRegionData(generateRegionData(country));
    setInterestRateData(generateInterestRateData(country));
    setLiveApplications(generateLiveApplications(country));
    setPortfolioYield(generatePortfolioYield(country, timeRange));
    setHighRiskClients(generateHighRiskClients(country));
  }, [country, timeRange]);
  
  // Setup update intervals
  useEffect(() => {
    // 3s: Live applications
    const interval3s = setInterval(() => {
      setLiveApplications(current => addLiveApplication(current, country));
    }, 3000);
    
    // 5s: Overview cards
    const interval5s = setInterval(() => {
      setOverviewData(current => updateOverviewData(current));
    }, 5000);
    
    // 10s: Issuance data, High-risk clients
    const interval10s = setInterval(() => {
      setIssuanceData(current => updateIssuanceData(current, country, timeRange));
      setHighRiskClients(current => updateHighRiskClients(current));
    }, 10000);
    
    // 15s: Interest rate data
    const interval15s = setInterval(() => {
      setInterestRateData(current => updateInterestRateData(current));
    }, 15000);
    
    // 30s: Loan type data, Portfolio yield
    const interval30s = setInterval(() => {
      setLoanTypeData(current => updateLoanTypeData(current));
      setPortfolioYield(current => updatePortfolioYield(current));
    }, 30000);
    
    // 60s: Age distribution, Region data
    const interval60s = setInterval(() => {
      setAgeDistribution(current => updateAgeDistribution(current));
      setRegionData(current => updateRegionData(current));
    }, 60000);
    
    // Cleanup all intervals on unmount
    return () => {
      clearInterval(interval3s);
      clearInterval(interval5s);
      clearInterval(interval10s);
      clearInterval(interval15s);
      clearInterval(interval30s);
      clearInterval(interval60s);
    };
  }, [country, timeRange]); // Re-setup intervals when filters change
  
  return {
    overviewData,
    issuanceData,
    loanTypeData,
    ageDistribution,
    regionData,
    interestRateData,
    liveApplications,
    portfolioYield,
    highRiskClients,
  };
}

