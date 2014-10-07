define([

    'marionette',

    'core/controllers/User'

], function (Marionette, Controller) {

    return Marionette.AppRouter.extend({

        controller: Controller,

        appRoutes: {
            'user'          : 'user',
            'user/settings' : 'settings'
        }

    });

});