namespace LargeScaleApp.Api.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public string? Category { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdated { get; set; }
        public string? Description { get; set; }
        public string? Manufacturer { get; set; }
        public string? SKU { get; set; }
        public decimal Weight { get; set; }
        public string? Dimensions { get; set; }
        public string? Color { get; set; }
        public string? Material { get; set; }
        public int WarrantyMonths { get; set; }
        public bool IsActive { get; set; }
        public decimal Rating { get; set; }
        public decimal Discount { get; set; }
        public int SupplierId { get; set; }
        public string? BatchNumber { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? CountryOfOrigin { get; set; }
        public bool IsFeatured { get; set; }
        public int MaxOrderQuantity { get; set; }
        public int LeadTimeDays { get; set; }
    }
}