Ext.define('LargeScaleApp.model.Order', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'orderDate', type: 'date', dateFormat: 'c' },
        { name: 'customerId', type: 'int' },
        { name: 'totalAmount', type: 'float' },
        { name: 'status', type: 'string' },
        { name: 'shippingAddress', type: 'string' },
        { name: 'billingAddress', type: 'string' },
        { name: 'paymentMethod', type: 'string' },
        { name: 'orderNumber', type: 'string' },
        { name: 'expectedDelivery', type: 'date', dateFormat: 'c' },
        { name: 'actualDelivery', type: 'date', dateFormat: 'c' },
        { name: 'isDelivered', type: 'boolean' },
        { name: 'taxAmount', type: 'float' },
        { name: 'discountAmount', type: 'float' },
        { name: 'shippingCost', type: 'float' },
        { name: 'orderNotes', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'modifiedBy', type: 'string' },
        { name: 'createdDate', type: 'date', dateFormat: 'c' },
        { name: 'modifiedDate', type: 'date', dateFormat: 'c' },
        { name: 'customerEmail', type: 'string' },
        { name: 'customerPhone', type: 'string' },
        { name: 'orderPriority', type: 'string' },
        { name: 'shippingMethod', type: 'string' },
        { name: 'trackingNumber', type: 'string' },
        { name: 'couponCode', type: 'string' },
        { name: 'isGift', type: 'boolean' },
        { name: 'giftMessage', type: 'string' },
        { name: 'salesChannel', type: 'string' },
        { name: 'orderWeight', type: 'float' }
    ]
});