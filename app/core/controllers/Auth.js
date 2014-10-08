define([

	'jquery',
	'underscore',
	'marionette',

	'app',
    'core/models/User',
	'core/views/EmptyPage'

], function ($, _, Marionette, App, User, Page) {
	'use strict';

	var Auth = {

		login: function(args) {

            if(App.session.isAuthenticated()) {
                App.navigate("#/");
            }

            var UserModel = new User({
                email  : App.session.get('email'),
                name  : App.session.get('name')
            });

            var view = new Page({
                model: UserModel
            });

            view.on('app:login', Auth.authenticate);
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

	return Auth;
});