Ext.application({
    name: 'LargeScaleApp',
    appFolder: 'app',
    requires: [
        'LargeScaleApp.view.main.Main'
    ],
    mainView: 'LargeScaleApp.view.main.Main',
    launch: function() {
        console.log('Application launched');
    }
});