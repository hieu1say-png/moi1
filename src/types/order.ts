export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'unpaid' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cod' | 'paypal';
  date: string;
  notes?: string;
}

export interface OrderFilterParams {
  search?: string;
  status?: OrderStatus | 'all';
  dateRange?: 'all' | 'today' | '7days' | '30days' | 'this_month';
  sortBy?: 'date' | 'total' | 'orderNumber';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
