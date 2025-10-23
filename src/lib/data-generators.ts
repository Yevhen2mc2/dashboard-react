import { faker } from '@faker-js/faker';
import type {
  OverviewData,
  IssuanceDataPoint,
  LoanTypeData,
  AgeDistributionData,
  RegionData,
  InterestRateData,
  LiveApplication,
  PortfolioYieldData,
  HighRiskClient,
  LoanType,
  AgeGroup,
  ApplicationStatus,
  PaymentStatus,
} from '@/types/dashboard-data';

type Country = 'all' | 'usa' | 'uk' | 'germany' | 'canada' | 'france';
type TimeRange = '24h' | '7d' | '30d' | 'all';

// Country-specific scaling factors
const COUNTRY_SCALE: Record<Country, number> = {
  usa: 1.5,
  uk: 1.2,
  germany: 1.1,
  canada: 1.0,
  france: 0.8,
  all: 1.3,
};

// Regions by country
const REGIONS: Record<Country, string[]> = {
  usa: ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'],
  uk: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Bristol'],
  germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund'],
  canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick'],
  france: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'],
  all: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'],
};

const LOAN_TYPES: LoanType[] = ['Personal', 'Auto', 'Mortgage', 'Business', 'Student'];
const AGE_GROUPS: AgeGroup[] = ['18-25', '26-35', '36-45', '46-60', '60+'];

// Helper: Get number of data points based on time range
function getDataPointCount(timeRange: TimeRange): number {
  switch (timeRange) {
    case '24h': return 24; // hourly
    case '7d': return 7; // daily
    case '30d': return 30; // daily
    case 'all': return 12; // monthly
    default: return 24;
  }
}

// Helper: Get time interval label
function getTimeLabel(index: number, timeRange: TimeRange): string {
  const now = new Date();
  switch (timeRange) {
    case '24h':
      now.setHours(now.getHours() - (23 - index));
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    case '7d':
      now.setDate(now.getDate() - (6 - index));
      return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case '30d':
      now.setDate(now.getDate() - (29 - index));
      return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'all':
      now.setMonth(now.getMonth() - (11 - index));
      return now.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    default:
      return now.toISOString();
  }
}

// Block 1: Generate Overview Data
export function generateOverviewData(country: Country, _timeRange: TimeRange): OverviewData {
  const scale = COUNTRY_SCALE[country];
  
  return {
    totalActiveLoans: Math.floor(faker.number.int({ min: 5000, max: 15000 }) * scale),
    totalLoanAmount: Math.floor(faker.number.int({ min: 50000000, max: 150000000 }) * scale),
    averageInterestRate: faker.number.float({ min: 3.5, max: 7.5, fractionDigits: 2 }),
    defaultRate: faker.number.float({ min: 1.5, max: 4.5, fractionDigits: 2 }),
  };
}

// Block 2: Generate Loan Issuance Data
export function generateIssuanceData(country: Country, timeRange: TimeRange): IssuanceDataPoint[] {
  const scale = COUNTRY_SCALE[country];
  const count = getDataPointCount(timeRange);
  
  return Array.from({ length: count }, (_, i) => ({
    timestamp: getTimeLabel(i, timeRange),
    newLoans: Math.floor(faker.number.int({ min: 50, max: 200 }) * scale),
    loanAmount: Math.floor(faker.number.int({ min: 500000, max: 2000000 }) * scale),
  }));
}

// Block 3: Generate Loan Type Data
export function generateLoanTypeData(country: Country): LoanTypeData[] {
  const scale = COUNTRY_SCALE[country];
  
  // Generate base counts
  const data = LOAN_TYPES.map((loanType) => {
    const baseCount = faker.number.int({ min: 500, max: 3000 });
    const baseAmount = faker.number.int({ min: 5000000, max: 30000000 });
    
    return {
      loanType,
      count: Math.floor(baseCount * scale),
      amount: Math.floor(baseAmount * scale),
    };
  });
  
  return data;
}

// Block 4: Generate Age Distribution Data
export function generateAgeDistribution(country: Country): AgeDistributionData[] {
  const scale = COUNTRY_SCALE[country];
  
  return AGE_GROUPS.map((ageGroup) => ({
    ageGroup,
    borrowersCount: Math.floor(faker.number.int({ min: 800, max: 2500 }) * scale),
  }));
}

// Block 5: Generate Region Data
export function generateRegionData(country: Country): RegionData[] {
  const scale = COUNTRY_SCALE[country];
  const regions = REGIONS[country];
  
  return regions.map((region) => ({
    region,
    loanAmount: Math.floor(faker.number.int({ min: 2000000, max: 15000000 }) * scale),
  }));
}

// Block 6: Generate Interest Rate Data
export function generateInterestRateData(country: Country): InterestRateData[] {
  const scale = COUNTRY_SCALE[country];
  
  return LOAN_TYPES.map((loanType) => ({
    loanType,
    averageRate: faker.number.float({ min: 3.0, max: 8.0, fractionDigits: 2 }),
    issuedAmount: Math.floor(faker.number.int({ min: 3000000, max: 20000000 }) * scale),
  }));
}

// Block 7: Generate Live Applications
export function generateLiveApplications(country: Country): LiveApplication[] {
  const scale = COUNTRY_SCALE[country];
  const count = 50;
  
  const statuses: ApplicationStatus[] = ['Pending', 'Approved', 'Rejected'];
  
  return Array.from({ length: count }, (_, i) => {
    const timestamp = new Date(Date.now() - (count - i) * 3000); // 3 seconds apart
    
    return {
      applicationId: faker.string.alphanumeric(8).toUpperCase(),
      timestamp: timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      loanType: faker.helpers.arrayElement(LOAN_TYPES),
      requestedAmount: Math.floor(faker.number.int({ min: 5000, max: 500000 }) * scale),
      status: faker.helpers.arrayElement(statuses),
    };
  });
}

// Block 8: Generate Portfolio Yield Data
export function generatePortfolioYield(_country: Country, timeRange: TimeRange): PortfolioYieldData[] {
  const count = timeRange === 'all' ? 12 : timeRange === '30d' ? 6 : 3;
  
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (count - 1 - i));
    
    return {
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      yieldPercentage: faker.number.float({ min: 4.5, max: 7.0, fractionDigits: 2 }),
    };
  });
}

// Block 9: Generate High-Risk Clients
export function generateHighRiskClients(country: Country): HighRiskClient[] {
  const scale = COUNTRY_SCALE[country];
  const count = faker.number.int({ min: 10, max: 20 });
  
  const paymentStatuses: PaymentStatus[] = ['Current', 'Late', 'Default', 'Restructured'];
  
  return Array.from({ length: count }, () => ({
    clientId: faker.string.alphanumeric(10).toUpperCase(),
    name: faker.person.fullName(),
    loanType: faker.helpers.arrayElement(LOAN_TYPES),
    amount: Math.floor(faker.number.int({ min: 50000, max: 500000 }) * scale),
    riskScore: faker.number.int({ min: 650, max: 850 }),
    paymentStatus: faker.helpers.arrayElement(paymentStatuses),
  }));
}

