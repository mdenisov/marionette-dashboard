define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/layout/main'

], function ($, _, Marionette, App, tpl) {
	'use strict';

	return Marionette.Layout.extend({
//		template: require('hbs!templates/layouts/default'),
		template: tpl,
		regions: {
			sidebar:    '#sidebar',
			header:     '#header',
			content:    '#content',
			navigation: '#navigation'
		}
	});
});