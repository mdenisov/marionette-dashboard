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
			});

			App.breadcrumb.reset();
		},

		help: function() {
			require(['hbs!templates/pages/help'], function(template) {
                var view = Marionette.ItemView.extend({
                    template: template,

                    events: {
                        'click h1': 'onHeaderClick'
                    },

                    onHeaderClick: function() {
                        console.log('1234567');
                    }
                });

				new Page({
					title: 'Help',
					content: new view()
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