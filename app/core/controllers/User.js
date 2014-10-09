define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'core/views/Page',
	'core/views/BaseView'

], function ($, _, Marionette, App, Page, BaseView) {
	'use strict';

	var User = {

		user: function() {

			if (!App.session.isAuthenticated()) {
				App.navigate("#/login");

				return false;
			}

			if (!App.session.isAuthenticated()) {
				App.navigate("#/login");

				return false;
			}

            new Page({
                title: 'Профиль',
                template: 'templates/pages/home'
            });
		},

		settings: function() {

			if (!App.session.isAuthenticated()) {
				App.navigate("#/login");

				return false;
			}

			require(['hbs!templates/pages/help'], function(template) {
                var view = BaseView.extend({
                    template: template,

                    events: {
                        'click h1': 'onHeaderClick'
                    },

                    onHeaderClick: function() {
                        console.log('1234567');
                    },

                    onCollapse: function() {
                        this.$el.toggle();
                    }
                });

				new Page({
					title: 'Настройки',
					subtitle: 'Возможно, здесь вы найдете ответ на свой вопрос',
					content: new view(),
                    tools: {
                        collapse: true
                    }
				});
			});
		}

	};

	return User;
});