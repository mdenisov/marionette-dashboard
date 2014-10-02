define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/layout/page'

], function ($, _, Marionette, App, template) {
	'use strict';

	return Marionette.ItemView.extend({
		template: template,

		options: {
//			tools: {
//				trash: true
//			}
		},

		ui: {
			tool: '.panel-tools .btn'
		},

		events: {
			'click .panel-tools .btn': 'onToolItemClick'
		},

		serializeData: function() {
			return this.options;
		},

		initialize: function (options) {
			App.trigger('app:page:show', this);
		},

		onToolItemClick: function(event) {
			console.log(event);
		}

	});
});