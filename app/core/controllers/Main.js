define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'core/views/Base'

], function ($, _, Marionette, App, BasePage) {
	'use strict';

	var Main = {

		home: function() {
			console.log('Welcome to your home url');

			var view;

			new BasePage({
				title: '<strong>UI</strong> Typography',
				content: '<strong>UI</strong> Typography',
//				tools: {
//					trash: true
//				}
			});
		},

		login: function() {

		},

		logout: function() {

		}

	};

	return Main;
});