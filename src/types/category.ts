export type CategoryStatus = 'active' | 'inactive';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: CategoryStatus;
  createdAt: string;
  icon?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  status: CategoryStatus;
}
