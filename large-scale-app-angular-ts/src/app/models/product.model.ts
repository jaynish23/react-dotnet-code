export interface ProductDto {
  id: number;
  productName: string | null;
  category: string | null;
  price: number;
  stock: number;
  createdDate: string;
  lastUpdated: string;
  description: string | null;
  manufacturer: string | null;
  sku: string | null;
  weight: number;
  dimensions: string | null;
  color: string | null;
  material: string | null;
  warrantyMonths: number;
  isActive: boolean;
  rating: number;
  discount: number;
  supplierId: number;
  batchNumber: string | null;
  expiryDate: string | null;
  countryOfOrigin: string | null;
  isFeatured: boolean;
  maxOrderQuantity: number;
  leadTimeDays: number;
}
