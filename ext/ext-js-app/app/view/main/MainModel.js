Ext.define('LargeScaleApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        entity: 'Products',
        currentPage: 3,
        totalPages: 5,
        totalRecords: 3000,
        pageSize: 1000
    },
    stores: {
        dataStore: {
            type: 'datastore',
            entity: '{entity}',
            pageSize: '{pageSize}',
            listeners: {
                load: function(store, records, successful) {
                    if (!successful) {
                        Ext.Msg.alert('Error', 'Failed to load data: ' + store.getProxy().getReader().rawData.message);
                    }
                }
            }
        }
    }
});