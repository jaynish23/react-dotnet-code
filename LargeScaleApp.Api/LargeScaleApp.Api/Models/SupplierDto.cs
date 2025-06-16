namespace LargeScaleApp.Api.Models
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string? ContactName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool IsActive { get; set; }
        public string? SupplierType { get; set; }
        public int LeadTimeDays { get; set; }
        public int MinOrderQuantity { get; set; }
        public int MaxOrderQuantity { get; set; }
        public string? PaymentTerms { get; set; }
        public string? TaxId { get; set; }
        public string? Website { get; set; }
        public decimal Rating { get; set; }
        public DateTime? ContractStartDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public string? Notes { get; set; }
        public string? PreferredContactMethod { get; set; }
        public DateTime? LastOrderDate { get; set; }
        public string? SupplierCategory { get; set; }
    }
}