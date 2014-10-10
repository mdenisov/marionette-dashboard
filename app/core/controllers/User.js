define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'core/views/Page',
	'core/views/BaseView',

    'hbs!templates/pages/profile'

], function ($, _, Marionette, App, Page, BaseView, profile) {
	'use strict';

	var User = {

		user: function() {

			if (!App.session.isAuthenticated()) {
				App.navigate("#/login");

				return false;
			}

            var view = BaseView.extend({
                template: profile,

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
                title: 'Профиль',
//                subtitle: 'Возможно, здесь вы найдете ответ на свой вопрос',
                content: new view({model: App.user}),
                tools: {
                    collapse: true
                }
            });
		},

		settings: function() {

			if (!App.session.isAuthenticated()) {
				App.navigate("#/login");

				return false;
			}

			require(['hbs!templates/pages/profile'], function(template) {
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