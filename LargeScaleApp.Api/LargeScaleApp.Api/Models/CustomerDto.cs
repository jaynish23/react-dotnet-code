namespace LargeScaleApp.Api.Models
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
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
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Occupation { get; set; }
        public string? CompanyName { get; set; }
        public decimal AnnualIncome { get; set; }
        public string? CustomerType { get; set; }
        public int LoyaltyPoints { get; set; }
        public DateTime? LastPurchaseDate { get; set; }
        public bool NewsletterSubscribed { get; set; }
        public string? PreferredContactMethod { get; set; }
        public string? AccountStatus { get; set; }
        public decimal CreditLimit { get; set; }
        public string? BillingAddress { get; set; }
        public string? ShippingAddress { get; set; }
        public string? TaxId { get; set; }
        public string? CustomerSegment { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string? PreferredLanguage { get; set; }
        public string? TimeZone { get; set; }
        public string? Notes { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? ReferralSource { get; set; }
        public string? SocialMediaHandle { get; set; }
        public string? Website { get; set; }
        public string? Fax { get; set; }
        public bool IsVerified { get; set; }
        public DateTime? VerificationDate { get; set; }
        public DateTime? LastContacted { get; set; }
        public decimal CustomerRating { get; set; }
    }
}