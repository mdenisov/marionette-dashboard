define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'hbs!templates/pages/login'

], function ($, _, Marionette, App, template) {
	'use strict';

    var View = Marionette.ItemView.extend({
        template: template,

        triggers: {
            'submit'  : 'app:login'
        },

        initialize: function(options) {
            $('body').addClass('login-body');

            App.trigger('app:page:show', this);
        }
    });

    return View;
});