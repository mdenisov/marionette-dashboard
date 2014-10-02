define([

	'marionette',

	'core/controllers/Main'

], function (Marionette, Controller) {
	'use strict';

	return Marionette.AppRouter.extend({

		controller: Controller,

		appRoutes: {
			''         : 'home',
			'home'     : 'home',
			'help'     : 'help',
			'login'    : 'login',
			'logout'   : 'logout'
		}

	});

});