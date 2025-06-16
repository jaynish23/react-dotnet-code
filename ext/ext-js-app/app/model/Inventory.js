Ext.define('LargeScaleApp.model.Inventory', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'productId', type: 'int' },
        { name: 'warehouseId', type: 'int' },
        { name: 'quantity', type: 'int' },
        { name: 'lastUpdated', type: 'date', dateFormat: 'c' },
        { name: 'stockStatus', type: 'string' },
        { name: 'reorderLevel', type: 'int' },
        { name: 'damageNotes', type: 'string' },
        { name: 'lastAuditDate', type: 'date', dateFormat: 'c' },
        { name: 'auditStatus', type: 'string' },
        { name: 'inventoryType', type: 'string' }
    ]
});