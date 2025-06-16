Ext.define('LargeScaleApp.store.DataStore', {
    extend: 'Ext.data.Store',
    alias: 'store.datastore',
    pageSize: 1000,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        },
        extraParams: {
            page: 1
        }
    },
    autoLoad: false,
    listeners: {
        beforeload: function(store, operation) {
            var entity = store.entity;
            var page = operation.getPage();
            store.getProxy().setUrl('http://localhost:5189/api/' + entity.toLowerCase());
            store.getProxy().setExtraParams({ page: page });
        }
    }
});