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
			'login'    : 'login',
			'logout'   : 'logout'
		}

	});

});