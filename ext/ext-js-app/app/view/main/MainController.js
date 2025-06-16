Ext.define('LargeScaleApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onEntityChange: function(btn) {
        var view = this.getView();
        var vm = this.getViewModel();
        var entity = btn.entity;
        var store = vm.getStore('dataStore');

        // Update entity and pagination settings
        vm.set('entity', entity);
        switch (entity) {
            case 'Products':
                vm.set('currentPage', 3);
                vm.set('totalPages', 5);
                vm.set('totalRecords', 3000);
                break;
            case 'Orders':
                vm.set('currentPage', 1);
                vm.set('totalPages', 1);
                vm.set('totalRecords', 600);
                break;
            case 'Customers':
                vm.set('currentPage', 1);
                vm.set('totalPages', 13);
                vm.set('totalRecords', 13000);
                break;
            case 'Inventory':
                vm.set('currentPage', 1);
                vm.set('totalPages', 15);
                vm.set('totalRecords', 15000);
                break;
            case 'Suppliers':
                vm.set('currentPage', 1);
                vm.set('totalPages', 10);
                vm.set('totalRecords', 10000);
                break;
        }

        // Load the store with the new entity and page
        store.loadPage(vm.get('currentPage'));
    },

    onPageChange: function(pagingtoolbar, page) {
        var vm = this.getViewModel();
        vm.set('currentPage', page);
        vm.getStore('dataStore').loadPage(page);
    }
});