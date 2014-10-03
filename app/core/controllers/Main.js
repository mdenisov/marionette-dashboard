define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'core/views/Base'

], function ($, _, Marionette, App, Page) {
	'use strict';

	var Main = {

		home: function() {
			console.log('Welcome to your home url');

			var view;

			new Page({
				title: '<strong>UI</strong> Typography',
				content: '<strong>UI</strong> Typography',
//				tools: {
//					trash: true
//				}
			});
		},

		help: function() {
			console.log('Welcome to your help url');

			var view;

			new BasePage({
				title: 'Help',
				content: '<strong>UI</strong> Typography'
			});
		},

		login: function() {

		},

		logout: function() {

		}

	};

	return Main;
});