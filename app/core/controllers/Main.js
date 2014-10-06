define([

	'jquery',
	'underscore',
	'marionette',

	'app',
	'core/views/Page',
	'core/views/BaseView'

], function ($, _, Marionette, App, Page, BaseView) {
	'use strict';

	var Main = {

		home: function() {
            new Page({
//                title: 'Главная',
                template: 'templates/pages/home'
            });
		},

		help: function() {
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
					title: 'Помощь',
					subtitle: 'Возможно, здесь вы найдете ответ на свой вопрос',
					content: new view(),
                    tools: {
                        collapse: true
                    }
				});
			});
		},

		login: function() {

		},

		logout: function() {

		}

	};

	return Main;
});