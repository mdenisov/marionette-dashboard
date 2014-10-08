define([

	'jquery',
	'underscore',
	'marionette',

	'app',
    'core/models/User',
    'core/session',
	'core/views/EmptyPage'

], function ($, _, Marionette, App, User, session, Page) {
	'use strict';

	var Auth = {

		login: function(args) {

            if(session.isAuthenticated()) {
                App.navigate("#/", {trigger: true});
            }

            var UserModel = new User({
                email  : session.get('email'),
                name  : session.get('name')
            });

            var view = new Page({
                model: UserModel
            });

            view.on('app:login', Auth.authenticate);
		},

        logout: function() {

            session.destroy();

            App.navigate("#/");

        },

        authenticate: function() {
            var self     = this;
            var email    = this.$('input[name="email"]').val();
            var password = this.$('input[name="password"]').val();

            $.when(this.model.login({
					email: email,
					password: password
				})).then(
                function (model, response, options){
//                    var token = model.get('token');

                    console.log(arguments);

//                    session.save(model);
//                    session.load();

//                    vent.trigger("app:logon");

//                    App.navigate("#/", {trigger: true});
                },
                function (model, xhr, options){
                    self.$el.find('.alert').show();
                }
            );

//            $.when(this.model.authenticate(email, password)).then(
//                function (model, response, options){
//                    var token = model.get('token');
//
//                    console.log(model);
//
////                    session.save(model);
////                    session.load();
//
////                    vent.trigger("app:logon");
//
////                    App.navigate("#/", {trigger: true});
//                },
//                function (model, xhr, options){
//                    self.$el.find('.alert').show();
//                }
//            );
        },

	};

	return Auth;
});