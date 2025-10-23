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
  ApplicationStatus,
  PaymentStatus,
} from '@/types/dashboard-data';

type Country = 'all' | 'usa' | 'uk' | 'germany' | 'canada' | 'france';
type TimeRange = '24h' | '7d' | '30d' | 'all';

const COUNTRY_SCALE: Record<Country, number> = {
  usa: 1.5,
  uk: 1.2,
  germany: 1.1,
  canada: 1.0,
  france: 0.8,
  all: 1.3,
};

const LOAN_TYPES: LoanType[] = [
  'Personal',
  'Auto',
  'Mortgage',
  'Business',
  'Student',
];

// Helper: Apply smooth variance to a number
function applyVariance(value: number, variancePercent: number): number {
  const variance = (Math.random() - 0.5) * 2 * variancePercent;
  return value * (1 + variance / 100);
}

// Helper: Add new value to trend array and keep max 12 points
function addToTrend(trend: number[], newValue: number): number[] {
  const updated = [...trend, newValue];
  return updated.slice(-12);
}

// Block 1: Update Overview Data (±1-2% variance)
export function updateOverviewData(current: OverviewData): OverviewData {
  const totalActiveLoans = Math.floor(
    applyVariance(current.totalActiveLoans, 2)
  );
  const totalLoanAmount = Math.floor(applyVariance(current.totalLoanAmount, 2));
  const averageInterestRate = parseFloat(
    applyVariance(current.averageInterestRate, 1).toFixed(2)
  );
  const defaultRate = parseFloat(
    applyVariance(current.defaultRate, 1.5).toFixed(2)
  );

  return {
    totalActiveLoans,
    totalLoanAmount,
    averageInterestRate,
    defaultRate,
    totalActiveLoansTrend: addToTrend(
      current.totalActiveLoansTrend,
      totalActiveLoans
    ),
    totalLoanAmountTrend: addToTrend(
      current.totalLoanAmountTrend,
      totalLoanAmount
    ),
    averageInterestRateTrend: addToTrend(
      current.averageInterestRateTrend,
      averageInterestRate
    ),
    defaultRateTrend: addToTrend(current.defaultRateTrend, defaultRate),
  };
}

// Block 2: Update Issuance Data (add new point, remove oldest)
export function updateIssuanceData(
  current: IssuanceDataPoint[],
  _country: Country,
  timeRange: TimeRange
): IssuanceDataPoint[] {
  if (current.length === 0) return current;

  let timestamp: string;

  // Get current time for timestamp
  const now = new Date();
  switch (timeRange) {
    case '24h':
      // For hourly data, increment by 1 hour
      timestamp = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      break;
    case '7d':
    case '30d':
      // For daily data, keep incrementing days
      // Since we're simulating, just use current time
      timestamp = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      break;
    case 'all':
      // For monthly data
      timestamp = now.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      });
      break;
    default:
      timestamp = now.toISOString();
  }

  // Generate new values with some variance from the last point
  const lastPoint = current[current.length - 1];
  const newPoint: IssuanceDataPoint = {
    timestamp,
    newLoans: Math.max(10, Math.floor(applyVariance(lastPoint.newLoans, 10))),
    loanAmount: Math.max(
      100000,
      Math.floor(applyVariance(lastPoint.loanAmount, 10))
    ),
  };

  // Add new point and remove oldest
  const updated = [...current.slice(1), newPoint];
  return updated;
}

// Block 3: Update Loan Type Data (±5% keeping total = 100%)
export function updateLoanTypeData(current: LoanTypeData[]): LoanTypeData[] {
  return current.map((item) => ({
    ...item,
    count: Math.floor(applyVariance(item.count, 5)),
    amount: Math.floor(applyVariance(item.amount, 5)),
  }));
}

// Block 4: Update Age Distribution (small random variations)
export function updateAgeDistribution(
  current: AgeDistributionData[]
): AgeDistributionData[] {
  return current.map((item) => ({
    ...item,
    borrowersCount: Math.floor(applyVariance(item.borrowersCount, 3)),
  }));
}

// Block 5: Update Region Data (slight fluctuations maintaining proportions)
export function updateRegionData(current: RegionData[]): RegionData[] {
  return current.map((item) => ({
    ...item,
    loanAmount: Math.floor(applyVariance(item.loanAmount, 4)),
  }));
}

// Block 6: Update Interest Rate Data (slight rate/amount changes)
export function updateInterestRateData(
  current: InterestRateData[]
): InterestRateData[] {
  return current.map((item) => ({
    ...item,
    averageRate: parseFloat(applyVariance(item.averageRate, 2).toFixed(2)),
    issuedAmount: Math.floor(applyVariance(item.issuedAmount, 3)),
  }));
}

// Block 7: Add Live Application (add new, keep rolling window of ~50)
export function addLiveApplication(
  current: LiveApplication[],
  country: Country
): LiveApplication[] {
  const scale = COUNTRY_SCALE[country];
  const statuses: ApplicationStatus[] = ['Pending', 'Approved', 'Rejected'];

  const now = new Date();
  const newApplication: LiveApplication = {
    applicationId: faker.string.alphanumeric(8).toUpperCase(),
    timestamp: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    loanType: faker.helpers.arrayElement(LOAN_TYPES),
    requestedAmount: Math.floor(
      faker.number.int({ min: 5000, max: 500000 }) * scale
    ),
    status: faker.helpers.arrayElement(statuses),
  };

  // Keep only last 50 applications
  const updated = [...current, newApplication];
  if (updated.length > 50) {
    return updated.slice(-50);
  }
  return updated;
}

// Block 8: Update Portfolio Yield (±0.3% on recent months)
export function updatePortfolioYield(
  current: PortfolioYieldData[]
): PortfolioYieldData[] {
  return current.map((item, index) => {
    // Only update the last 3 months
    if (index >= current.length - 3) {
      return {
        ...item,
        yieldPercentage: parseFloat(
          applyVariance(item.yieldPercentage, 0.3).toFixed(2)
        ),
      };
    }
    return item;
  });
}

// Block 9: Update High-Risk Clients (randomly update few rows)
export function updateHighRiskClients(
  current: HighRiskClient[]
): HighRiskClient[] {
  const paymentStatuses: PaymentStatus[] = [
    'Current',
    'Late',
    'Default',
    'Restructured',
  ];

  // Update 2-3 random clients
  const numToUpdate = faker.number.int({ min: 2, max: 3 });
  const indicesToUpdate = Array.from({ length: numToUpdate }, () =>
    faker.number.int({ min: 0, max: current.length - 1 })
  );

  return current.map((client, index) => {
    if (indicesToUpdate.includes(index)) {
      // Randomly update risk score or payment status
      const updateType = Math.random();

      if (updateType < 0.5) {
        // Update risk score (±10-30 points)
        return {
          ...client,
          riskScore: Math.max(
            600,
            Math.min(
              850,
              client.riskScore + faker.number.int({ min: -30, max: 30 })
            )
          ),
        };
      } else {
        // Update payment status
        return {
          ...client,
          paymentStatus: faker.helpers.arrayElement(paymentStatuses),
        };
      }
    }
    return client;
  });
}
