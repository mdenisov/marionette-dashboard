define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/layout/main'

], function ($, _, Marionette, App, tpl) {
	'use strict';

	return Marionette.Layout.extend({
		template: tpl,
		regions: {
            breadcrumb:     '#breadcrumb',
			sidebar:        '#sidebar',
			user:           '#avatar-block',
			header:         '#header',
			content:        '#content',
			navigation:     '#navigation'
		}
	});
});