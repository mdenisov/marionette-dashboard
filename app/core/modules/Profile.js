define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'core/views/Page',
	'core/views/BaseView'

], function ($, _, Marionette, App, Page, BaseView) {
	'use strict';

	var Controller = {
		profile: function() {
			new Page({
                title: 'Профиль пользователя',
				template: 'templates/pages/profile'
			});
		}
	};

	var Router = Marionette.AppRouter.extend({
		appRoutes: {
			'profile': 'profile'
		}
	});

	var module = App.module();

	module.initialize = function(options) {
		console.log('Module:Profile => initialized');

		this.options = options;

		this.router = new Router({
			controller: Controller
		});
	};

	return module;
});