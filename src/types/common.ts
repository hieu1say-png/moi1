export type ThemeMode = 'light' | 'dark';

export type StatusType = 'active' | 'inactive' | 'pending' | 'draft' | 'archived';

export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortParams<T = string> {
  field: T;
  order: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  badge?: number | string;
}
