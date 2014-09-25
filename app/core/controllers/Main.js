define([

	'jquery',
	'underscore',
	'marionette',

	'app'

], function ($, _, Marionette, App) {
	'use strict';

	var Main = {

		home: function() {
			console.log('Welcome to your home url');

			var view;

//			view = new BasePage({
//				title: '<strong>UI</strong> Typography',
//				content: new PageWelcome()
//			});
		},

		login: function() {

		},

		logout: function() {

		}

	};

	return Main;
});