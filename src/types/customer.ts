export type CustomerStatus = 'active' | 'inactive' | 'vip';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  ordersCount: number;
  totalSpending: number;
  status: CustomerStatus;
  joinedDate: string;
  lastOrderDate?: string;
}

export interface CustomerFilterParams {
  search?: string;
  status?: CustomerStatus | 'all';
  sortBy?: 'name' | 'ordersCount' | 'totalSpending' | 'joinedDate';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
