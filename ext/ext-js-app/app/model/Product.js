Ext.define('LargeScaleApp.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'productName', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'price', type: 'float' },
        { name: 'stock', type: 'int' },
        { name: 'createdDate', type: 'date', dateFormat: 'c' },
        { name: 'lastUpdated', type: 'date', dateFormat: 'c' },
        { name: 'description', type: 'string' },
        { name: 'discount', type: 'float' },
        { name: 'supplierId', type: 'int' },
        { name: 'batchNumber', type: 'string' },
        { name: 'expiryDate', type: 'date', dateFormat: 'c' },
        { name: 'countryOfOrigin', type: 'string' },
        { name: 'isFeatured', type: 'boolean' },
        { name: 'maxOrderQuantity', type: 'int' },
        { name: 'leadTimeDays', type: 'int' }
    ]
});