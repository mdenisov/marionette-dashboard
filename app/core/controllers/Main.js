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
			new Page({
				title: '<strong>UI</strong> Typography',
				content: '<strong>UI</strong> Typography'
//				tools: {
//					trash: true
//				}
			});

			App.breadcrumb.reset();
		},

		help: function() {
			require(['text!templates/pages/help.html'], function(template) {
				new Page({
					title: 'Help',
					content: template
				});

				App.breadcrumb.reset([{
					'link': '#/help',
					'name': 'Help'
				}]);
			});
		},

		login: function() {

		},

		logout: function() {

		}

	};

	return Main;
});