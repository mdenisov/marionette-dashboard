define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/layout/empty'

], function ($, _, Marionette, App, template) {
	'use strict';

	return Marionette.Layout.extend({
		template: template,
		regions: {
			content:        '#content'
		}
	});
});