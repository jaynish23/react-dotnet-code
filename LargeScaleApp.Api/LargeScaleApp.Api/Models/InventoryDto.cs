namespace LargeScaleApp.Api.Models
{
    public class InventoryDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int WarehouseId { get; set; }
        public int Quantity { get; set; }
        public DateTime LastUpdated { get; set; }
        public string? StockStatus { get; set; }
        public int ReorderLevel { get; set; }
        public int ReorderQuantity { get; set; }
        public DateTime? LastRestockDate { get; set; }
        public int SupplierId { get; set; }
        public string? BatchNumber { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? StorageLocation { get; set; }
        public decimal UnitCost { get; set; }
        public decimal TotalCost { get; set; }
        public bool IsDamaged { get; set; }
        public string? DamageNotes { get; set; }
        public DateTime? LastAuditDate { get; set; }
        public string? AuditStatus { get; set; }
        public string? InventoryType { get; set; }
    }
}