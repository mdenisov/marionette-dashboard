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

    var Controller = {

        user: function() {

            if (!App.session.isAuthenticated()) {
                App.navigate("#/login");

                return false;
            }

            var view = BaseView.extend({
                template: profile,

                ui: {
                    form: 'form'
                },

                modelEvents: {
                    "change": "onModelChange"
                },

                onReload: function() {
                    this.render();
                },

                onSave: function() {
                    this.model.update(this.ui.form.serializeArray());
                },

                onReset: function() {
                    this.onModelChange();
                },

                onModelChange: function() {
                    this.render();
                }
            });

            new Page({
                title: 'Профиль',
                content: new view({model: App.user}),
                tools: {
                    reload: true
                },
                footer: {
                    save: true,
                    reset: true
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

                    modelEvents: {
                        "all": "onModelChange"
                    },

                    onReload: function() {
                        this.model.refresh();
                    },

                    onModelChange: function() {
                        this.render();
                    }
                });

                new Page({
                    title: 'Настройки',
                    subtitle: 'Параметры системы',
                    content: new view(),
                    tools: {
                        reload: true
                    },
                    footer: {
                        save: true,
                        reset: true
                    }
                });
            });
        }

    };

	var Router = Marionette.AppRouter.extend({
		appRoutes: {
            'user'          : 'user',
            'user/settings' : 'settings'
		}
	});

	var module = App.module();

	module.initialize = function(options) {
		if (App.DEBUG) console.log('Module:User => initialized');

		this.options = options;

		this.router = new Router({
			controller: Controller
		});
	};

	return module;
});