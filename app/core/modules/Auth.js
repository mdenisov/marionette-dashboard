define([

    'jquery',
    'underscore',
    'marionette',

    'app',
    'hbs!templates/pages/login'

], function ($, _, Marionette, App, template) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: template,

        triggers: {
            'submit'  : 'app:login'
        },

        initialize: function(options) {
//            $('body').addClass('login-body');

            App.trigger('app:page:show', this);
        }
    });

    var Controller = {
        login: function(args) {

            if(App.session.isAuthenticated()) {
                App.navigate("#/");
            }

            App.user.set({
                email  : App.session.get('email'),
                name  : App.session.get('name')
            });

            var view = new View({
                model: App.user
            });

            view.on('app:login', Controller.authenticate);
        },

        logout: function() {

            App.session.destroy();

            App.trigger('app:user:logout');
            App.navigate("#/login");

        },

        authenticate: function() {
            var email    = this.$('input[name="email"]').val();
            var password = this.$('input[name="password"]').val();

            this.model.login({
                email: email,
                password: password
            }, {
                success: function(res) {
                    App.session.load();
                    App.trigger('app:user:logon');
                    App.navigate('#/');
                }, error: function(res) {

                }
            });
        }
    };

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            'login'    : 'login',
            'logout'   : 'logout'
        }
    });

    var module = App.module();

    module.initialize = function(options) {
        console.log('Module:Auth => initialized');

        this.options = options;

        this.router = new Router({
            controller: Controller
        });
    };

    return module;
});