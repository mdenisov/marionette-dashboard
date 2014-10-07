define([

    'marionette',

    'core/controllers/Auth'

], function (Marionette, Controller) {
    'use strict';

    return Marionette.AppRouter.extend({

        controller: Controller,

        appRoutes: {
            'login'    : 'login',
            'logout'   : 'logout'
        }
    });

});