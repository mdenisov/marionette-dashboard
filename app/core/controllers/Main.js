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
                title: 'Home',
                template: 'templates/pages/home'
            });
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
			});
		},

		login: function() {

		},

		logout: function() {

		}

	};

	return Main;
});