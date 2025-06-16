export interface InventoryDto {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  lastUpdated: string;
  stockStatus: string | null;
  reorderLevel: number;
  reorderQuantity: number;
  lastRestockDate: string | null;
  supplierId: number;
  batchNumber: string | null;
  expiryDate: string | null;
  storageLocation: string | null;
  unitCost: number;
  totalCost: number;
  isDamaged: boolean;
  damageNotes: string | null;
  lastAuditDate: string | null;
  auditStatus: string | null;
  inventoryType: string | null;
} 
