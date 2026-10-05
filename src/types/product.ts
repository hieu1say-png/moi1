export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice?: number;
  stock: number;
  status: ProductStatus;
  image: string;
  description: string;
  salesCount: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  sku?: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image?: string;
  description?: string;
}

export interface ProductFilterParams {
  search?: string;
  category?: string;
  status?: string;
  sortBy?: 'name' | 'price' | 'stock' | 'createdAt' | 'salesCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
