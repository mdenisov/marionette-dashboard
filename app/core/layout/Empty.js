define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/layout/empty'

], function ($, _, Marionette, App, tpl) {
	'use strict';

	return Marionette.Layout.extend({
		template: tpl,
		regions: {
			header:         '#header',
			content:        '#content'
		}
	});
});