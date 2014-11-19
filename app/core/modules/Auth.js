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

            view.on('app:login', Controller.auth);
        },

        logout: function() {

            App.user.logout({}, {
                success: function(model, res) {
                    App.session.destroy();
                    App.trigger('app:user:logout');
                    App.navigate('#/login');
                }, error: function(model, res) {

                }
            });

        },

        auth: function() {
			var self = this,
            	email    = self.$('input[name="email"]').val(),
            	password = self.$('input[name="password"]').val();

            App.user.auth({
                email: email,
                password: password
            }, {
                success: function(model, res) {
                    App.session.save(model);
                    App.session.load();
                    App.trigger('app:user:logon');
                    App.navigate('#/');
                }, error: function(model, res) {
					var error = res.responseText;
					self.$('.form-signin__user-info').addClass('has-error');
					self.$('.help-block').removeClass('hide').html(error);
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
        if (App.DEBUG) console.log('Module:Auth => initialized');

        this.options = options;

        this.router = new Router({
            controller: Controller
        });
    };

    return module;
});