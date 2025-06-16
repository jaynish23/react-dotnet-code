-- Creating Database
CREATE DATABASE LargeScaleDB;
GO

USE LargeScaleDB;
GO

-- Table 1: Products (25 columns, 20,000 rows)
CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100),
    Category NVARCHAR(50),
    Price DECIMAL(10,2),
    Stock INT,
    CreatedDate DATETIME,
    LastUpdated DATETIME,
    Description NVARCHAR(500),
    Manufacturer NVARCHAR(100),
    SKU NVARCHAR(50),
    Weight DECIMAL(8,2),
    Dimensions NVARCHAR(50),
    Color NVARCHAR(30),
    Material NVARCHAR(50),
    WarrantyMonths INT,
    IsActive BIT,
    Rating DECIMAL(3,1),
    Discount DECIMAL(5,2),
    SupplierId INT,
    BatchNumber NVARCHAR(50),
    ExpiryDate DATE,
    CountryOfOrigin NVARCHAR(50),
    IsFeatured BIT,
    MaxOrderQuantity INT,
    LeadTimeDays INT
);
GO

-- Table 2: Orders (30 columns, 45,000 rows)
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderDate DATETIME,
    CustomerId INT,
    TotalAmount DECIMAL(12,2),
    Status NVARCHAR(30),
    ShippingAddress NVARCHAR(200),
    BillingAddress NVARCHAR(200),
    PaymentMethod NVARCHAR(50),
    OrderNumber NVARCHAR(50),
    ExpectedDelivery DATE,
    ActualDelivery DATE,
    IsDelivered BIT,
    TaxAmount DECIMAL(10,2),
    DiscountAmount DECIMAL(10,2),
    ShippingCost DECIMAL(8,2),
    OrderNotes NVARCHAR(500),
    CreatedBy NVARCHAR(50),
    ModifiedBy NVARCHAR(50),
    CreatedDate DATETIME,
    ModifiedDate DATETIME,
    CustomerEmail NVARCHAR(100),
    CustomerPhone NVARCHAR(20),
    OrderPriority NVARCHAR(20),
    ShippingMethod NVARCHAR(50),
    TrackingNumber NVARCHAR(50),
    CouponCode NVARCHAR(30),
    IsGift BIT,
    GiftMessage NVARCHAR(200),
    SalesChannel NVARCHAR(50),
    OrderWeight DECIMAL(8,2)
);
GO

-- Table 3: Customers (45 columns, 13,000 rows)
CREATE TABLE Customers (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    AddressLine1 NVARCHAR(100),
    AddressLine2 NVARCHAR(100),
    City NVARCHAR(50),
    State NVARCHAR(50),
    ZipCode NVARCHAR(20),
    Country NVARCHAR(50),
    CreatedDate DATETIME,
    LastUpdated DATETIME,
    IsActive BIT,
    DateOfBirth DATE,
    Gender NVARCHAR(20),
    Occupation NVARCHAR(50),
    CompanyName NVARCHAR(100),
    AnnualIncome DECIMAL(12,2),
    CustomerType NVARCHAR(30),
    LoyaltyPoints INT,
    LastPurchaseDate DATE,
    NewsletterSubscribed BIT,
    PreferredContactMethod NVARCHAR(30),
    AccountStatus NVARCHAR(30),
    CreditLimit DECIMAL(10,2),
    BillingAddress NVARCHAR(200),
    ShippingAddress NVARCHAR(200),
    TaxId NVARCHAR(50),
    CustomerSegment NVARCHAR(50),
    RegistrationDate DATE,
    LastLoginDate DATETIME,
    PreferredLanguage NVARCHAR(30),
    TimeZone NVARCHAR(50),
    Notes NVARCHAR(500),
    EmergencyContact NVARCHAR(50),
    EmergencyPhone NVARCHAR(20),
    ReferralSource NVARCHAR(50),
    SocialMediaHandle NVARCHAR(50),
    Website NVARCHAR(100),
    Fax NVARCHAR(20),
    IsVerified BIT,
    VerificationDate DATE,
    LastContacted DATE,
    CustomerRating DECIMAL(3,1)
);
GO

-- Table 4: Inventory (20 columns, 29,000 rows)
CREATE TABLE Inventory (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT,
    WarehouseId INT,
    Quantity INT,
    LastUpdated DATETIME,
    StockStatus NVARCHAR(30),
    ReorderLevel INT,
    ReorderQuantity INT,
    LastRestockDate DATE,
    SupplierId INT,
    BatchNumber NVARCHAR(50),
    ExpiryDate DATE,
    StorageLocation NVARCHAR(50),
    UnitCost DECIMAL(10,2),
    TotalCost DECIMAL(12,2),
    IsDamaged BIT,
    DamageNotes NVARCHAR(200),
    LastAuditDate DATE,
    AuditStatus NVARCHAR(30),
    InventoryType NVARCHAR(50)
);
GO

-- Table 5: Suppliers (28 columns, 10,000 rows)
CREATE TABLE Suppliers (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CompanyName NVARCHAR(100),
    ContactName NVARCHAR(50),
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    AddressLine1 NVARCHAR(100),
    AddressLine2 NVARCHAR(100),
    City NVARCHAR(50),
    State NVARCHAR(50),
    ZipCode NVARCHAR(20),
    Country NVARCHAR(50),
    CreatedDate DATETIME,
    LastUpdated DATETIME,
    IsActive BIT,
    SupplierType NVARCHAR(50),
    LeadTimeDays INT,
    MinOrderQuantity INT,
    MaxOrderQuantity INT,
    PaymentTerms NVARCHAR(50),
    TaxId NVARCHAR(50),
    Website NVARCHAR(100),
    Rating DECIMAL(3,1),
    ContractStartDate DATE,
    ContractEndDate DATE,
    Notes NVARCHAR(500),
    PreferredContactMethod NVARCHAR(30),
    LastOrderDate DATE,
    SupplierCategory NVARCHAR(50)
);
GO

-- Procedure to populate tables with random data
CREATE PROCEDURE PopulateTables
AS
BEGIN
    SET NOCOUNT ON;

    -- Populate Products
    DECLARE @i INT = 1;
    WHILE @i <= 20000
    BEGIN
        INSERT INTO Products (
            ProductName, Category, Price, Stock, CreatedDate, LastUpdated, Description,
            Manufacturer, SKU, Weight, Dimensions, Color, Material, WarrantyMonths,
            IsActive, Rating, Discount, SupplierId, BatchNumber, ExpiryDate,
            CountryOfOrigin, IsFeatured, MaxOrderQuantity, LeadTimeDays
        )
        VALUES (
            'Product' + CAST(@i AS NVARCHAR), 'Category' + CAST((@i % 10) AS NVARCHAR),
            RAND() * 1000, @i % 1000, GETDATE(), GETDATE(), 'Description for product ' + CAST(@i AS NVARCHAR),
            'Manufacturer' + CAST((@i % 50) AS NVARCHAR), 'SKU' + CAST(@i AS NVARCHAR),
            RAND() * 100, '10x10x10', 'Color' + CAST((@i % 20) AS NVARCHAR),
            'Material' + CAST((@i % 15) AS NVARCHAR), @i % 36, 1,
            RAND() * 5, RAND() * 20, @i % 1000, 'BATCH' + CAST(@i AS NVARCHAR),
            DATEADD(DAY, @i % 365, GETDATE()), 'Country' + CAST((@i % 50) AS NVARCHAR),
            @i % 2, @i % 100, @i % 30
        );
        SET @i = @i + 1;
    END

    -- Populate Orders
    SET @i = 1;
    WHILE @i <= 45000
    BEGIN
        INSERT INTO Orders (
            OrderDate, CustomerId, TotalAmount, Status, ShippingAddress, BillingAddress,
            PaymentMethod, OrderNumber, ExpectedDelivery, ActualDelivery, IsDelivered,
            TaxAmount, DiscountAmount, ShippingCost, OrderNotes, CreatedBy, ModifiedBy,
            CreatedDate, ModifiedDate, CustomerEmail, CustomerPhone, OrderPriority,
            ShippingMethod, TrackingNumber, CouponCode, IsGift, GiftMessage,
            SalesChannel, OrderWeight
        )
        VALUES (
            DATEADD(DAY, -(@i % 365), GETDATE()), @i % 13000, RAND() * 5000,
            'Status' + CAST((@i % 5) AS NVARCHAR), 'Address' + CAST(@i AS NVARCHAR),
            'Billing' + CAST(@i AS NVARCHAR), 'Method' + CAST((@i % 4) AS NVARCHAR),
            'ORD' + CAST(@i AS NVARCHAR), DATEADD(DAY, (@i % 30), GETDATE()),
            DATEADD(DAY, (@i % 30 + 5), GETDATE()), @i % 2, RAND() * 100,
            RAND() * 50, RAND() * 20, 'Notes for order ' + CAST(@i AS NVARCHAR),
            'User' + CAST((@i % 100) AS NVARCHAR), 'User' + CAST((@i % 100) AS NVARCHAR),
            GETDATE(), GETDATE(), 'email' + CAST(@i AS NVARCHAR) + '@example.com',
            '123-456-' + CAST(@i AS NVARCHAR), 'Priority' + CAST((@i % 3) AS NVARCHAR),
            'Shipping' + CAST((@i % 4) AS NVARCHAR), 'TRACK' + CAST(@i AS NVARCHAR),
            'COUPON' + CAST((@i % 10) AS NVARCHAR), @i % 2,
            'Gift message ' + CAST(@i AS NVARCHAR), 'Channel' + CAST((@i % 5) AS NVARCHAR),
            RAND() * 50
        );
        SET @i = @i + 1;
    END

    -- Populate Customers
    SET @i = 1;
    WHILE @i <= 13000
    BEGIN
        INSERT INTO Customers (
            FirstName, LastName, Email, Phone, AddressLine1, AddressLine2, City, State,
            ZipCode, Country, CreatedDate, LastUpdated, IsActive, DateOfBirth, Gender,
            Occupation, CompanyName, AnnualIncome, CustomerType, LoyaltyPoints,
            LastPurchaseDate, NewsletterSubscribed, PreferredContactMethod, AccountStatus,
            CreditLimit, BillingAddress, ShippingAddress, TaxId, CustomerSegment,
            RegistrationDate, LastLoginDate, PreferredLanguage, TimeZone, Notes,
            EmergencyContact, EmergencyPhone, ReferralSource, SocialMediaHandle, Website,
            Fax, IsVerified, VerificationDate, LastContacted, CustomerRating
        )
        VALUES (
            'First' + CAST(@i AS NVARCHAR), 'Last' + CAST(@i AS NVARCHAR),
            'customer' + CAST(@i AS NVARCHAR) + '@example.com', '123-456-' + CAST(@i AS NVARCHAR),
            'Address1_' + CAST(@i AS NVARCHAR), 'Address2_' + CAST(@i AS NVARCHAR),
            'City' + CAST((@i % 50) AS NVARCHAR), 'State' + CAST((@i % 30) AS NVARCHAR),
            'ZIP' + CAST(@i AS NVARCHAR), 'Country' + CAST((@i % 20) AS NVARCHAR),
            GETDATE(), GETDATE(), 1, DATEADD(YEAR, -(@i % 60), GETDATE()),
            CASE WHEN @i % 2 = 0 THEN 'Male' ELSE 'Female' END,
            'Occupation' + CAST((@i % 10) AS NVARCHAR), 'Company' + CAST((@i % 50) AS NVARCHAR),
            RAND() * 100000, 'Type' + CAST((@i % 5) AS NVARCHAR), @i % 10000,
            DATEADD(DAY, -(@i % 365), GETDATE()), @i % 2, 'Contact' + CAST((@i % 3) AS NVARCHAR),
            'Status' + CAST((@i % 4) AS NVARCHAR), RAND() * 5000,
            'Billing' + CAST(@i AS NVARCHAR), 'Shipping' + CAST(@i AS NVARCHAR),
            'TAX' + CAST(@i AS NVARCHAR), 'Segment' + CAST((@i % 5) AS NVARCHAR),
            DATEADD(DAY, -(@i % 730), GETDATE()), GETDATE(), 'Language' + CAST((@i % 5) AS NVARCHAR),
            'UTC' + CAST((@i % 12) AS NVARCHAR), 'Notes for customer ' + CAST(@i AS NVARCHAR),
            'Emergency' + CAST(@i AS NVARCHAR), '789-012-' + CAST(@i AS NVARCHAR),
            'Source' + CAST((@i % 10) AS NVARCHAR), '@handle' + CAST(@i AS NVARCHAR),
            'www.example' + CAST(@i AS NVARCHAR) + '.com', '123-456-' + CAST(@i AS NVARCHAR),
            @i % 2, DATEADD(DAY, -(@i % 365), GETDATE()), DATEADD(DAY, -(@i % 30), GETDATE()),
            RAND() * 5
        );
        SET @i = @i + 1;
    END

    -- Populate Inventory
    SET @i = 1;
    WHILE @i <= 29000
    BEGIN
        INSERT INTO Inventory (
            ProductId, WarehouseId, Quantity, LastUpdated, StockStatus, ReorderLevel,
            ReorderQuantity, LastRestockDate, SupplierId, BatchNumber, ExpiryDate,
            StorageLocation, UnitCost, TotalCost, IsDamaged, DamageNotes, LastAuditDate,
            AuditStatus, InventoryType
        )
        VALUES (
            @i % 20000, @i % 100, @i % 1000, GETDATE(), 'Status' + CAST((@i % 5) AS NVARCHAR),
            @i % 100, @i % 200, DATEADD(DAY, -(@i % 365), GETDATE()), @i % 10000,
            'BATCH' + CAST(@i AS NVARCHAR), DATEADD(DAY, (@i % 365), GETDATE()),
            'LOC' + CAST(@i AS NVARCHAR), RAND() * 100, RAND() * 1000, @i % 2,
            'Damage notes ' + CAST(@i AS NVARCHAR), DATEADD(DAY, -(@i % 365), GETDATE()),
            'Audit' + CAST((@i % 3) AS NVARCHAR), 'Type' + CAST((@i % 4) AS NVARCHAR)
        );
        SET @i = @i + 1;
    END

    -- Populate Suppliers
    SET @i = 1;
    WHILE @i <= 10000
    BEGIN
        INSERT INTO Suppliers (
            CompanyName, ContactName, Email, Phone, AddressLine1, AddressLine2, City,
            State, ZipCode, Country, CreatedDate, LastUpdated, IsActive, SupplierType,
            LeadTimeDays, MinOrderQuantity, MaxOrderQuantity, PaymentTerms, TaxId,
            Website, Rating, ContractStartDate, ContractEndDate, Notes,
            PreferredContactMethod, LastOrderDate, SupplierCategory
        )
        VALUES (
            'Supplier' + CAST(@i AS NVARCHAR), 'Contact' + CAST(@i AS NVARCHAR),
            'supplier' + CAST(@i AS NVARCHAR) + '@example.com', '123-456-' + CAST(@i AS NVARCHAR),
            'Address1_' + CAST(@i AS NVARCHAR), 'Address2_' + CAST(@i AS NVARCHAR),
            'City' + CAST((@i % 50) AS NVARCHAR), 'State' + CAST((@i % 30) AS NVARCHAR),
            'ZIP' + CAST(@i AS NVARCHAR), 'Country' + CAST((@i % 20) AS NVARCHAR),
            GETDATE(), GETDATE(), 1, 'Type' + CAST((@i % 5) AS NVARCHAR), @i % 30,
            @i % 100, @i % 1000, 'Terms' + CAST((@i % 4) AS NVARCHAR),
            'TAX' + CAST(@i AS NVARCHAR), 'www.supplier' + CAST(@i AS NVARCHAR) + '.com',
            RAND() * 5, DATEADD(DAY, -(@i % 365), GETDATE()), DATEADD(DAY, (@i % 365), GETDATE()),
            'Notes for supplier ' + CAST(@i AS NVARCHAR), 'Contact' + CAST((@i % 3) AS NVARCHAR),
            DATEADD(DAY, -(@i % 365), GETDATE()), 'Category' + CAST((@i % 5) AS NVARCHAR)
        );
        SET @i = @i + 1;
    END
END;
GO

-- Execute the population procedure
EXEC PopulateTables;
GO

-- Create indexes for optimization
CREATE INDEX IX_Products_Id ON Products(Id);
CREATE INDEX IX_Orders_Id ON Orders(Id);
CREATE INDEX IX_Customers_Id ON Customers(Id);
CREATE INDEX IX_Inventory_Id ON Inventory(Id);
CREATE INDEX IX_Suppliers_Id ON Suppliers(Id);
GO