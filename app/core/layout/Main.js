define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/layout/main'

], function ($, _, Marionette, App, template) {
	'use strict';

	return Marionette.Layout.extend({
		template: template,
		regions: {
            breadcrumb:     '#breadcrumb',
			sidebar:        '#sidebar',
			user:           '#avatar-block',
			header:         '#header',
			content:        '#content',
			navigation:     '#navigation',
			notification:     '#notification-center'
		}
	});
});