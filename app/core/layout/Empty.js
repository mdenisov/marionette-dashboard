define([

	'jquery',
	'underscore',
	'marionette',

	'app'

], function ($, _, Marionette, App) {
	'use strict';

	return Marionette.Layout.extend({
//		template: require('hbs!templates/layouts/default'),
		template: require('text!templates/layout/empty'),
		regions: {
			sidebar:    '#sidebar',
			header:     '#header',
			content:    '#content',
			navigation: '#navigation'
		}
	});
});