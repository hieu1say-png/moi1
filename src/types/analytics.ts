export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
  expenses: number;
  profit: number;
}

export interface CategorySalesData {
  category: string;
  sales: number;
  percentage: number;
  color: string;
}

export interface OrderStatusDistribution {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CustomerGrowthPoint {
  month: string;
  newCustomers: number;
  activeCustomers: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  averageOrderValue: number;
  aovGrowth: number;
}

export type TimeFilter = '7d' | '30d' | '3m' | '12m';
