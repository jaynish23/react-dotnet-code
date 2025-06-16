using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using LargeScaleApp.Api.Models;
using System.Collections.Generic;

namespace LargeScaleApp.Api.Data
{
    public class DataAccess
    {
        private readonly string _connectionString;

        public DataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException(nameof(configuration), "Connection string cannot be null.");
        }

        public List<ProductDto> GetProducts(int pageNumber, int pageSize)
        {
            var products = new List<ProductDto>();
            int startRow = (pageNumber - 1) * pageSize + 1;
            int endRow = startRow + pageSize - 1;

            string query = @"
                SELECT *
                FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, *
                    FROM Products
                ) AS P
                WHERE RowNum BETWEEN @StartRow AND @EndRow";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@StartRow", startRow);
                        cmd.Parameters.AddWithValue("@EndRow", endRow);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                products.Add(new ProductDto
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    ProductName = reader.IsDBNull(reader.GetOrdinal("ProductName")) ? null : reader.GetString(reader.GetOrdinal("ProductName")),
                                    Category = reader.IsDBNull(reader.GetOrdinal("Category")) ? null : reader.GetString(reader.GetOrdinal("Category")),
                                    Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                    Stock = reader.GetInt32(reader.GetOrdinal("Stock")),
                                    CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                    LastUpdated = reader.GetDateTime(reader.GetOrdinal("LastUpdated")),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Description")),
                                    Manufacturer = reader.IsDBNull(reader.GetOrdinal("Manufacturer")) ? null : reader.GetString(reader.GetOrdinal("Manufacturer")),
                                    SKU = reader.IsDBNull(reader.GetOrdinal("SKU")) ? null : reader.GetString(reader.GetOrdinal("SKU")),
                                    Weight = reader.GetDecimal(reader.GetOrdinal("Weight")),
                                    Dimensions = reader.IsDBNull(reader.GetOrdinal("Dimensions")) ? null : reader.GetString(reader.GetOrdinal("Dimensions")),
                                    Color = reader.IsDBNull(reader.GetOrdinal("Color")) ? null : reader.GetString(reader.GetOrdinal("Color")),
                                    Material = reader.IsDBNull(reader.GetOrdinal("Material")) ? null : reader.GetString(reader.GetOrdinal("Material")),
                                    WarrantyMonths = reader.GetInt32(reader.GetOrdinal("WarrantyMonths")),
                                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                    Rating = reader.GetDecimal(reader.GetOrdinal("Rating")),
                                    Discount = reader.GetDecimal(reader.GetOrdinal("Discount")),
                                    SupplierId = reader.GetInt32(reader.GetOrdinal("SupplierId")),
                                    BatchNumber = reader.IsDBNull(reader.GetOrdinal("BatchNumber")) ? null : reader.GetString(reader.GetOrdinal("BatchNumber")),
                                    ExpiryDate = reader.IsDBNull(reader.GetOrdinal("ExpiryDate")) ? null : reader.GetDateTime(reader.GetOrdinal("ExpiryDate")),
                                    CountryOfOrigin = reader.IsDBNull(reader.GetOrdinal("CountryOfOrigin")) ? null : reader.GetString(reader.GetOrdinal("CountryOfOrigin")),
                                    IsFeatured = reader.GetBoolean(reader.GetOrdinal("IsFeatured")),
                                    MaxOrderQuantity = reader.GetInt32(reader.GetOrdinal("MaxOrderQuantity")),
                                    LeadTimeDays = reader.GetInt32(reader.GetOrdinal("LeadTimeDays"))
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching products", ex);
            }

            return products;
        }

        public List<OrderDto> GetOrders(int startId, int endId)
        {
            var orders = new List<OrderDto>();
            string query = "SELECT * FROM Orders WHERE Id BETWEEN @StartId AND @EndId";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@StartId", startId);
                        cmd.Parameters.AddWithValue("@EndId", endId);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                orders.Add(new OrderDto
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    OrderDate = reader.GetDateTime(reader.GetOrdinal("OrderDate")),
                                    CustomerId = reader.GetInt32(reader.GetOrdinal("CustomerId")),
                                    TotalAmount = reader.GetDecimal(reader.GetOrdinal("TotalAmount")),
                                    Status = reader.IsDBNull(reader.GetOrdinal("Status")) ? null : reader.GetString(reader.GetOrdinal("Status")),
                                    ShippingAddress = reader.IsDBNull(reader.GetOrdinal("ShippingAddress")) ? null : reader.GetString(reader.GetOrdinal("ShippingAddress")),
                                    BillingAddress = reader.IsDBNull(reader.GetOrdinal("BillingAddress")) ? null : reader.GetString(reader.GetOrdinal("BillingAddress")),
                                    PaymentMethod = reader.IsDBNull(reader.GetOrdinal("PaymentMethod")) ? null : reader.GetString(reader.GetOrdinal("PaymentMethod")),
                                    OrderNumber = reader.IsDBNull(reader.GetOrdinal("OrderNumber")) ? null : reader.GetString(reader.GetOrdinal("OrderNumber")),
                                    ExpectedDelivery = reader.IsDBNull(reader.GetOrdinal("ExpectedDelivery")) ? null : reader.GetDateTime(reader.GetOrdinal("ExpectedDelivery")),
                                    ActualDelivery = reader.IsDBNull(reader.GetOrdinal("ActualDelivery")) ? null : reader.GetDateTime(reader.GetOrdinal("ActualDelivery")),
                                    IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                    TaxAmount = reader.GetDecimal(reader.GetOrdinal("TaxAmount")),
                                    DiscountAmount = reader.GetDecimal(reader.GetOrdinal("DiscountAmount")),
                                    ShippingCost = reader.GetDecimal(reader.GetOrdinal("ShippingCost")),
                                    OrderNotes = reader.IsDBNull(reader.GetOrdinal("OrderNotes")) ? null : reader.GetString(reader.GetOrdinal("OrderNotes")),
                                    CreatedBy = reader.IsDBNull(reader.GetOrdinal("CreatedBy")) ? null : reader.GetString(reader.GetOrdinal("CreatedBy")),
                                    ModifiedBy = reader.IsDBNull(reader.GetOrdinal("ModifiedBy")) ? null : reader.GetString(reader.GetOrdinal("ModifiedBy")),
                                    CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                    ModifiedDate = reader.GetDateTime(reader.GetOrdinal("ModifiedDate")),
                                    CustomerEmail = reader.IsDBNull(reader.GetOrdinal("CustomerEmail")) ? null : reader.GetString(reader.GetOrdinal("CustomerEmail")),
                                    CustomerPhone = reader.IsDBNull(reader.GetOrdinal("CustomerPhone")) ? null : reader.GetString(reader.GetOrdinal("CustomerPhone")),
                                    OrderPriority = reader.IsDBNull(reader.GetOrdinal("OrderPriority")) ? null : reader.GetString(reader.GetOrdinal("OrderPriority")),
                                    ShippingMethod = reader.IsDBNull(reader.GetOrdinal("ShippingMethod")) ? null : reader.GetString(reader.GetOrdinal("ShippingMethod")),
                                    TrackingNumber = reader.IsDBNull(reader.GetOrdinal("TrackingNumber")) ? null : reader.GetString(reader.GetOrdinal("TrackingNumber")),
                                    CouponCode = reader.IsDBNull(reader.GetOrdinal("CouponCode")) ? null : reader.GetString(reader.GetOrdinal("CouponCode")),
                                    IsGift = reader.GetBoolean(reader.GetOrdinal("IsGift")),
                                    GiftMessage = reader.IsDBNull(reader.GetOrdinal("GiftMessage")) ? null : reader.GetString(reader.GetOrdinal("GiftMessage")),
                                    SalesChannel = reader.IsDBNull(reader.GetOrdinal("SalesChannel")) ? null : reader.GetString(reader.GetOrdinal("SalesChannel")),
                                    OrderWeight = reader.GetDecimal(reader.GetOrdinal("OrderWeight"))
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching orders", ex);
            }

            return orders;
        }

        public List<CustomerDto> GetCustomers(int pageNumber, int pageSize)
        {
            var customers = new List<CustomerDto>();
            int startRow = (pageNumber - 1) * pageSize + 1;
            int endRow = startRow + pageSize - 1;

            string query = @"
                SELECT *
                FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, *
                    FROM Customers
                ) AS C
                WHERE RowNum BETWEEN @StartRow AND @EndRow";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@StartRow", startRow);
                        cmd.Parameters.AddWithValue("@EndRow", endRow);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                customers.Add(new CustomerDto
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    FirstName = reader.IsDBNull(reader.GetOrdinal("FirstName")) ? null : reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.IsDBNull(reader.GetOrdinal("LastName")) ? null : reader.GetString(reader.GetOrdinal("LastName")),
                                    Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? null : reader.GetString(reader.GetOrdinal("Email")),
                                    Phone = reader.IsDBNull(reader.GetOrdinal("Phone")) ? null : reader.GetString(reader.GetOrdinal("Phone")),
                                    AddressLine1 = reader.IsDBNull(reader.GetOrdinal("AddressLine1")) ? null : reader.GetString(reader.GetOrdinal("AddressLine1")),
                                    AddressLine2 = reader.IsDBNull(reader.GetOrdinal("AddressLine2")) ? null : reader.GetString(reader.GetOrdinal("AddressLine2")),
                                    City = reader.IsDBNull(reader.GetOrdinal("City")) ? null : reader.GetString(reader.GetOrdinal("City")),
                                    State = reader.IsDBNull(reader.GetOrdinal("State")) ? null : reader.GetString(reader.GetOrdinal("State")),
                                    ZipCode = reader.IsDBNull(reader.GetOrdinal("ZipCode")) ? null : reader.GetString(reader.GetOrdinal("ZipCode")),
                                    Country = reader.IsDBNull(reader.GetOrdinal("Country")) ? null : reader.GetString(reader.GetOrdinal("Country")),
                                    CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                    LastUpdated = reader.GetDateTime(reader.GetOrdinal("LastUpdated")),
                                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                    DateOfBirth = reader.IsDBNull(reader.GetOrdinal("DateOfBirth")) ? null : reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                    Gender = reader.IsDBNull(reader.GetOrdinal("Gender")) ? null : reader.GetString(reader.GetOrdinal("Gender")),
                                    Occupation = reader.IsDBNull(reader.GetOrdinal("Occupation")) ? null : reader.GetString(reader.GetOrdinal("Occupation")),
                                    CompanyName = reader.IsDBNull(reader.GetOrdinal("CompanyName")) ? null : reader.GetString(reader.GetOrdinal("CompanyName")),
                                    AnnualIncome = reader.GetDecimal(reader.GetOrdinal("AnnualIncome")),
                                    CustomerType = reader.IsDBNull(reader.GetOrdinal("CustomerType")) ? null : reader.GetString(reader.GetOrdinal("CustomerType")),
                                    LoyaltyPoints = reader.GetInt32(reader.GetOrdinal("LoyaltyPoints")),
                                    LastPurchaseDate = reader.IsDBNull(reader.GetOrdinal("LastPurchaseDate")) ? null : reader.GetDateTime(reader.GetOrdinal("LastPurchaseDate")),
                                    NewsletterSubscribed = reader.GetBoolean(reader.GetOrdinal("NewsletterSubscribed")),
                                    PreferredContactMethod = reader.IsDBNull(reader.GetOrdinal("PreferredContactMethod")) ? null : reader.GetString(reader.GetOrdinal("PreferredContactMethod")),
                                    AccountStatus = reader.IsDBNull(reader.GetOrdinal("AccountStatus")) ? null : reader.GetString(reader.GetOrdinal("AccountStatus")),
                                    CreditLimit = reader.GetDecimal(reader.GetOrdinal("CreditLimit")),
                                    BillingAddress = reader.IsDBNull(reader.GetOrdinal("BillingAddress")) ? null : reader.GetString(reader.GetOrdinal("BillingAddress")),
                                    ShippingAddress = reader.IsDBNull(reader.GetOrdinal("ShippingAddress")) ? null : reader.GetString(reader.GetOrdinal("ShippingAddress")),
                                    TaxId = reader.IsDBNull(reader.GetOrdinal("TaxId")) ? null : reader.GetString(reader.GetOrdinal("TaxId")),
                                    CustomerSegment = reader.IsDBNull(reader.GetOrdinal("CustomerSegment")) ? null : reader.GetString(reader.GetOrdinal("CustomerSegment")),
                                    RegistrationDate = reader.IsDBNull(reader.GetOrdinal("RegistrationDate")) ? null : reader.GetDateTime(reader.GetOrdinal("RegistrationDate")),
                                    LastLoginDate = reader.IsDBNull(reader.GetOrdinal("LastLoginDate")) ? null : reader.GetDateTime(reader.GetOrdinal("LastLoginDate")),
                                    PreferredLanguage = reader.IsDBNull(reader.GetOrdinal("PreferredLanguage")) ? null : reader.GetString(reader.GetOrdinal("PreferredLanguage")),
                                    TimeZone = reader.IsDBNull(reader.GetOrdinal("TimeZone")) ? null : reader.GetString(reader.GetOrdinal("TimeZone")),
                                    Notes = reader.IsDBNull(reader.GetOrdinal("Notes")) ? null : reader.GetString(reader.GetOrdinal("Notes")),
                                    EmergencyContact = reader.IsDBNull(reader.GetOrdinal("EmergencyContact")) ? null : reader.GetString(reader.GetOrdinal("EmergencyContact")),
                                    EmergencyPhone = reader.IsDBNull(reader.GetOrdinal("EmergencyPhone")) ? null : reader.GetString(reader.GetOrdinal("EmergencyPhone")),
                                    ReferralSource = reader.IsDBNull(reader.GetOrdinal("ReferralSource")) ? null : reader.GetString(reader.GetOrdinal("ReferralSource")),
                                    SocialMediaHandle = reader.IsDBNull(reader.GetOrdinal("SocialMediaHandle")) ? null : reader.GetString(reader.GetOrdinal("SocialMediaHandle")),
                                    Website = reader.IsDBNull(reader.GetOrdinal("Website")) ? null : reader.GetString(reader.GetOrdinal("Website")),
                                    Fax = reader.IsDBNull(reader.GetOrdinal("Fax")) ? null : reader.GetString(reader.GetOrdinal("Fax")),
                                    IsVerified = reader.GetBoolean(reader.GetOrdinal("IsVerified")),
                                    VerificationDate = reader.IsDBNull(reader.GetOrdinal("VerificationDate")) ? null : reader.GetDateTime(reader.GetOrdinal("VerificationDate")),
                                    LastContacted = reader.IsDBNull(reader.GetOrdinal("LastContacted")) ? null : reader.GetDateTime(reader.GetOrdinal("LastContacted")),
                                    CustomerRating = reader.GetDecimal(reader.GetOrdinal("CustomerRating"))
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching customers", ex);
            }

            return customers;
        }

        public List<InventoryDto> GetInventory(int startId, int pageSize)
        {
            var inventory = new List<InventoryDto>();
            string query = "SELECT * FROM Inventory WHERE Id >= @StartId AND Id < @EndId";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@StartId", startId);
                        cmd.Parameters.AddWithValue("@EndId", startId + pageSize);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                inventory.Add(new InventoryDto
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    ProductId = reader.GetInt32(reader.GetOrdinal("ProductId")),
                                    WarehouseId = reader.GetInt32(reader.GetOrdinal("WarehouseId")),
                                    Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                                    LastUpdated = reader.GetDateTime(reader.GetOrdinal("LastUpdated")),
                                    StockStatus = reader.IsDBNull(reader.GetOrdinal("StockStatus")) ? null : reader.GetString(reader.GetOrdinal("StockStatus")),
                                    ReorderLevel = reader.GetInt32(reader.GetOrdinal("ReorderLevel")),
                                    ReorderQuantity = reader.GetInt32(reader.GetOrdinal("ReorderQuantity")),
                                    LastRestockDate = reader.IsDBNull(reader.GetOrdinal("LastRestockDate")) ? null : reader.GetDateTime(reader.GetOrdinal("LastRestockDate")),
                                    SupplierId = reader.GetInt32(reader.GetOrdinal("SupplierId")),
                                    BatchNumber = reader.IsDBNull(reader.GetOrdinal("BatchNumber")) ? null : reader.GetString(reader.GetOrdinal("BatchNumber")),
                                    ExpiryDate = reader.IsDBNull(reader.GetOrdinal("ExpiryDate")) ? null : reader.GetDateTime(reader.GetOrdinal("ExpiryDate")),
                                    StorageLocation = reader.IsDBNull(reader.GetOrdinal("StorageLocation")) ? null : reader.GetString(reader.GetOrdinal("StorageLocation")),
                                    UnitCost = reader.GetDecimal(reader.GetOrdinal("UnitCost")),
                                    TotalCost = reader.GetDecimal(reader.GetOrdinal("TotalCost")),
                                    IsDamaged = reader.GetBoolean(reader.GetOrdinal("IsDamaged")),
                                    DamageNotes = reader.IsDBNull(reader.GetOrdinal("DamageNotes")) ? null : reader.GetString(reader.GetOrdinal("DamageNotes")),
                                    LastAuditDate = reader.IsDBNull(reader.GetOrdinal("LastAuditDate")) ? null : reader.GetDateTime(reader.GetOrdinal("LastAuditDate")),
                                    AuditStatus = reader.IsDBNull(reader.GetOrdinal("AuditStatus")) ? null : reader.GetString(reader.GetOrdinal("AuditStatus")),
                                    InventoryType = reader.IsDBNull(reader.GetOrdinal("InventoryType")) ? null : reader.GetString(reader.GetOrdinal("InventoryType"))
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching inventory", ex);
            }

            return inventory;
        }

        public List<SupplierDto> GetSuppliers(int pageNumber, int pageSize)
        {
            var suppliers = new List<SupplierDto>();
            int startRow = (pageNumber - 1) * pageSize + 1;
            int endRow = startRow + pageSize - 1;

            string query = @"
                SELECT *
                FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, *
                    FROM Suppliers
                ) AS S
                WHERE RowNum BETWEEN @StartRow AND @EndRow";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@StartRow", startRow);
                        cmd.Parameters.AddWithValue("@EndRow", endRow);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                suppliers.Add(new SupplierDto
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    CompanyName = reader.IsDBNull(reader.GetOrdinal("CompanyName")) ? null : reader.GetString(reader.GetOrdinal("CompanyName")),
                                    ContactName = reader.IsDBNull(reader.GetOrdinal("ContactName")) ? null : reader.GetString(reader.GetOrdinal("ContactName")),
                                    Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? null : reader.GetString(reader.GetOrdinal("Email")),
                                    Phone = reader.IsDBNull(reader.GetOrdinal("Phone")) ? null : reader.GetString(reader.GetOrdinal("Phone")),
                                    AddressLine1 = reader.IsDBNull(reader.GetOrdinal("AddressLine1")) ? null : reader.GetString(reader.GetOrdinal("AddressLine1")),
                                    AddressLine2 = reader.IsDBNull(reader.GetOrdinal("AddressLine2")) ? null : reader.GetString(reader.GetOrdinal("AddressLine2")),
                                    City = reader.IsDBNull(reader.GetOrdinal("City")) ? null : reader.GetString(reader.GetOrdinal("City")),
                                    State = reader.IsDBNull(reader.GetOrdinal("State")) ? null : reader.GetString(reader.GetOrdinal("State")),
                                    ZipCode = reader.IsDBNull(reader.GetOrdinal("ZipCode")) ? null : reader.GetString(reader.GetOrdinal("ZipCode")),
                                    Country = reader.IsDBNull(reader.GetOrdinal("Country")) ? null : reader.GetString(reader.GetOrdinal("Country")),
                                    CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                                    LastUpdated = reader.GetDateTime(reader.GetOrdinal("LastUpdated")),
                                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                    SupplierType = reader.IsDBNull(reader.GetOrdinal("SupplierType")) ? null : reader.GetString(reader.GetOrdinal("SupplierType")),
                                    LeadTimeDays = reader.GetInt32(reader.GetOrdinal("LeadTimeDays")),
                                    MinOrderQuantity = reader.GetInt32(reader.GetOrdinal("MinOrderQuantity")),
                                    MaxOrderQuantity = reader.GetInt32(reader.GetOrdinal("MaxOrderQuantity")),
                                    PaymentTerms = reader.IsDBNull(reader.GetOrdinal("PaymentTerms")) ? null : reader.GetString(reader.GetOrdinal("PaymentTerms")),
                                    TaxId = reader.IsDBNull(reader.GetOrdinal("TaxId")) ? null : reader.GetString(reader.GetOrdinal("TaxId")),
                                    Website = reader.IsDBNull(reader.GetOrdinal("Website")) ? null : reader.GetString(reader.GetOrdinal("Website")),
                                    Rating = reader.GetDecimal(reader.GetOrdinal("Rating")),
                                    ContractStartDate = reader.IsDBNull(reader.GetOrdinal("ContractStartDate")) ? null : reader.GetDateTime(reader.GetOrdinal("ContractStartDate")),
                                    ContractEndDate = reader.IsDBNull(reader.GetOrdinal("ContractEndDate")) ? null : reader.GetDateTime(reader.GetOrdinal("ContractEndDate")),
                                    Notes = reader.IsDBNull(reader.GetOrdinal("Notes")) ? null : reader.GetString(reader.GetOrdinal("Notes")),
                                    PreferredContactMethod = reader.IsDBNull(reader.GetOrdinal("PreferredContactMethod")) ? null : reader.GetString(reader.GetOrdinal("PreferredContactMethod")),
                                    LastOrderDate = reader.IsDBNull(reader.GetOrdinal("LastOrderDate")) ? null : reader.GetDateTime(reader.GetOrdinal("LastOrderDate")),
                                    SupplierCategory = reader.IsDBNull(reader.GetOrdinal("SupplierCategory")) ? null : reader.GetString(reader.GetOrdinal("SupplierCategory"))
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching suppliers", ex);
            }

            return suppliers;
        }
    }
}