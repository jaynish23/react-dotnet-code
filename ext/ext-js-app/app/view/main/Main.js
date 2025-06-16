Ext.define('LargeScaleApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: 'vbox',
    width: '100%',
    height: '100%',
    bodyPadding: 10,

    items: [
        {
            xtype: 'image',
            src: 'resources/logo.png',
            alt: 'Application Logo',
            height: 100,
            style: {
                margin: '0 auto',
                display: 'block'
            }
        },
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Products',
                    entity: 'Products',
                    handler: 'onEntityChange'
                },
                {
                    text: 'Orders',
                    entity: 'Orders',
                    handler: 'onEntityChange'
                },
                {
                    text: 'Customers',
                    entity: 'Customers',
                    handler: 'onEntityChange'
                },
                {
                    text: 'Inventory',
                    entity: 'Inventory',
                    handler: 'onEntityChange'
                },
                {
                    text: 'Suppliers',
                    entity: 'Suppliers',
                    handler: 'onEntityChange'
                }
            ]
        },
        {
            xtype: 'grid',
            flex: 1,
            bind: {
                store: '{dataStore}',
                columns: '{columns}'
            },
            scrollable: true,
            viewConfig: {
                emptyText: 'No data available or loading failed.',
                loadingText: 'Loading...'
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    bind: {
                        store: '{dataStore}',
                        hidden: '{entity === "Orders"}'
                    },
                    displayInfo: true,
                    listeners: {
                        change: 'onPageChange'
                    }
                }
            ],
            listeners: {
                afterrender: function(grid) {
                    var vm = grid.getViewModel();
                    vm.bind('{entity}', function(entity) {
                        var columns = [];
                        switch (entity) {
                            case 'Products':
                                columns = [
                                    { text: 'ID', dataIndex: 'id', width: 100 },
                                    { text: 'Product Name', dataIndex: 'productName', width: 150 },
                                    { text: 'Category', dataIndex: 'category', width: 120 },
                                    { text: 'Price', dataIndex: 'price', width: 100 },
                                    { text: 'Stock', dataIndex: 'stock', width: 100 },
                                    { text: 'Created Date', dataIndex: 'createdDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Last Updated', dataIndex: 'lastUpdated', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Description', dataIndex: 'description', width: 200 },
                                    { text: 'Discount', dataIndex: 'discount', width: 100 },
                                    { text: 'Supplier ID', dataIndex: 'supplierId', width: 100 },
                                    { text: 'Batch Number', dataIndex: 'batchNumber', width: 120 },
                                    { text: 'Expiry Date', dataIndex: 'expiryDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Country of Origin', dataIndex: 'countryOfOrigin', width: 150 },
                                    { text: 'Is Featured', dataIndex: 'isFeatured', width: 100, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Max Order Quantity', dataIndex: 'maxOrderQuantity', width: 150 },
                                    { text: 'Lead Time Days', dataIndex: 'leadTimeDays', width: 120 }
                                ];
                                break;
                            case 'Orders':
                                columns = [
                                    { text: 'ID', dataIndex: 'id', width: 100 },
                                    { text: 'Order Date', dataIndex: 'orderDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Customer ID', dataIndex: 'customerId', width: 100 },
                                    { text: 'Total Amount', dataIndex: 'totalAmount', width: 120 },
                                    { text: 'Status', dataIndex: 'status', width: 100 },
                                    { text: 'Shipping Address', dataIndex: 'shippingAddress', width: 200 },
                                    { text: 'Billing Address', dataIndex: 'billingAddress', width: 200 },
                                    { text: 'Payment Method', dataIndex: 'paymentMethod', width: 120 },
                                    { text: 'Order Number', dataIndex: 'orderNumber', width: 120 },
                                    { text: 'Expected Delivery', dataIndex: 'expectedDelivery', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Actual Delivery', dataIndex: 'actualDelivery', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Is Delivered', dataIndex: 'isDelivered', width: 100, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Tax Amount', dataIndex: 'taxAmount', width: 100 },
                                    { text: 'Discount Amount', dataIndex: 'discountAmount', width: 120 },
                                    { text: 'Shipping Cost', dataIndex: 'shippingCost', width: 120 },
                                    { text: 'Order Notes', dataIndex: 'orderNotes', width: 200 },
                                    { text: 'Created By', dataIndex: 'createdBy', width: 120 },
                                    { text: 'Modified By', dataIndex: 'modifiedBy', width: 120 },
                                    { text: 'Created Date', dataIndex: 'createdDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Modified Date', dataIndex: 'modifiedDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Customer Email', dataIndex: 'customerEmail', width: 150 },
                                    { text: 'Customer Phone', dataIndex: 'customerPhone', width: 120 },
                                    { text: 'Order Priority', dataIndex: 'orderPriority', width: 120 },
                                    { text: 'Shipping Method', dataIndex: 'shippingMethod', width: 120 },
                                    { text: 'Tracking Number', dataIndex: 'trackingNumber', width: 120 },
                                    { text: 'Coupon Code', dataIndex: 'couponCode', width: 100 },
                                    { text: 'Is Gift', dataIndex: 'isGift', width: 100, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Gift Message', dataIndex: 'giftMessage', width: 200 },
                                    { text: 'Sales Channel', dataIndex: 'salesChannel', width: 120 },
                                    { text: 'Order Weight', dataIndex: 'orderWeight', width: 120 }
                                ];
                                break;
                            case 'Customers':
                                columns = [
                                    { text: 'ID', dataIndex: 'id', width: 100 },
                                    { text: 'First Name', dataIndex: 'firstName', width: 120 },
                                    { text: 'Last Name', dataIndex: 'lastName', width: 120 },
                                    { text: 'Email', dataIndex: 'email', width: 150 },
                                    { text: 'Phone', dataIndex: 'phone', width: 120 },
                                    { text: 'Address Line 1', dataIndex: 'addressLine1', width: 200 },
                                    { text: 'Address Line 2', dataIndex: 'addressLine2', width: 200 },
                                    { text: 'City', dataIndex: 'city', width: 120 },
                                    { text: 'State', dataIndex: 'state', width: 120 },
                                    { text: 'Zip Code', dataIndex: 'zipCode', width: 100 },
                                    { text: 'Country', dataIndex: 'country', width: 120 },
                                    { text: 'Created Date', dataIndex: 'createdDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Last Updated', dataIndex: 'lastUpdated', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Is Active', dataIndex: 'isActive', width: 100, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Date of Birth', dataIndex: 'dateOfBirth', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Gender', dataIndex: 'gender', width: 100 },
                                    { text: 'Occupation', dataIndex: 'occupation', width: 120 },
                                    { text: 'Company Name', dataIndex: 'companyName', width: 150 },
                                    { text: 'Annual Income', dataIndex: 'annualIncome', width: 120 },
                                    { text: 'Customer Type', dataIndex: 'customerType', width: 120 },
                                    { text: 'Loyalty Points', dataIndex: 'loyaltyPoints', width: 120 },
                                    { text: 'Last Purchase Date', dataIndex: 'lastPurchaseDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Newsletter Subscribed', dataIndex: 'newsletterSubscribed', width: 150, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Preferred Contact Method', dataIndex: 'preferredContactMethod', width: 150 },
                                    { text: 'Account Status', dataIndex: 'accountStatus', width: 120 },
                                    { text: 'Credit Limit', dataIndex: 'creditLimit', width: 120 },
                                    { text: 'Billing Address', dataIndex: 'billingAddress', width: 200 },
                                    { text: 'Shipping Address', dataIndex: 'shippingAddress', width: 200 },
                                    { text: 'Tax ID', dataIndex: 'taxId', width: 100 },
                                    { text: 'Customer Segment', dataIndex: 'customerSegment', width: 120 },
                                    { text: 'Registration Date', dataIndex: 'registrationDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Last Login Date', dataIndex: 'lastLoginDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Preferred Language', dataIndex: 'preferredLanguage', width: 120 },
                                    { text: 'Time Zone', dataIndex: 'timeZone', width: 120 },
                                    { text: 'Notes', dataIndex: 'notes', width: 200 },
                                    { text: 'Emergency Contact', dataIndex: 'emergencyContact', width: 120 },
                                    { text: 'Emergency Phone', dataIndex: 'emergencyPhone', width: 120 },
                                    { text: 'Referral Source', dataIndex: 'referralSource', width: 120 },
                                    { text: 'Social Media Handle', dataIndex: 'socialMediaHandle', width: 150 },
                                    { text: 'Website', dataIndex: 'website', width: 150 },
                                    { text: 'Fax', dataIndex: 'fax', width: 100 },
                                    { text: 'Is Verified', dataIndex: 'isVerified', width: 100, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Verification Date', dataIndex: 'verificationDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Last Contacted', dataIndex: 'lastContacted', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Customer Rating', dataIndex: 'customerRating', width: 120 }
                                ];
                                break;
                            case 'Inventory':
                                columns = [
                                    { text: 'ID', dataIndex: 'id', width: 100 },
                                    { text: 'Product ID', dataIndex: 'productId', width: 100 },
                                    { text: 'Warehouse ID', dataIndex: 'warehouseId', width: 100 },
                                    { text: 'Quantity', dataIndex: 'quantity', width: 100 },
                                    { text: 'Last Updated', dataIndex: 'lastUpdated', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Stock Status', dataIndex: 'stockStatus', width: 120 },
                                    { text: 'Reorder Level', dataIndex: 'reorderLevel', width: 120 },
                                    { text: 'Damage Notes', dataIndex: 'damageNotes', width: 200 },
                                    { text: 'Last Audit Date', dataIndex: 'lastAuditDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Audit Status', dataIndex: 'auditStatus', width: 120 },
                                    { text: 'Inventory Type', dataIndex: 'inventoryType', width: 120 }
                                ];
                                break;
                            case 'Suppliers':
                                columns = [
                                    { text: 'ID', dataIndex: 'id', width: 100 },
                                    { text: 'Company Name', dataIndex: 'companyName', width: 150 },
                                    { text: 'Contact Name', dataIndex: 'contactName', width: 120 },
                                    { text: 'Email', dataIndex: 'email', width: 150 },
                                    { text: 'Phone', dataIndex: 'phone', width: 120 },
                                    { text: 'Address Line 1', dataIndex: 'addressLine1', width: 200 },
                                    { text: 'Address Line 2', dataIndex: 'addressLine2', width: 200 },
                                    { text: 'City', dataIndex: 'city', width: 120 },
                                    { text: 'State', dataIndex: 'state', width: 120 },
                                    { text: 'Zip Code', dataIndex: 'zipCode', width: 100 },
                                    { text: 'Country', dataIndex: 'country', width: 120 },
                                    { text: 'Created Date', dataIndex: 'createdDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Last Updated', dataIndex: 'lastUpdated', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Is Active', dataIndex: 'isActive', width: 100, xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No' },
                                    { text: 'Supplier Type', dataIndex: 'supplierType', width: 120 },
                                    { text: 'Lead Time Days', dataIndex: 'leadTimeDays', width: 120 },
                                    { text: 'Min Order Quantity', dataIndex: 'minOrderQuantity', width: 150 },
                                    { text: 'Max Order Quantity', dataIndex: 'maxOrderQuantity', width: 150 },
                                    { text: 'Payment Terms', dataIndex: 'paymentTerms', width: 120 },
                                    { text: 'Tax ID', dataIndex: 'taxId', width: 100 },
                                    { text: 'Website', dataIndex: 'website', width: 150 },
                                    { text: 'Rating', dataIndex: 'rating', width: 100 },
                                    { text: 'Contract Start Date', dataIndex: 'contractStartDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Contract End Date', dataIndex: 'contractEndDate', width: 150, xtype: 'datecolumn', format: 'Y-m-d H:i:s' },
                                    { text: 'Notes', dataIndex: 'notes', width: 200 }
                                ];
                                break;
                        }
                        vm.set('columns', columns);
                        grid.reconfigure(columns);
                    });
                }
            }
        }
    ]
});