define(function(require, exports, module) {
	"use strict";

	// External dependencies.
	var app,
		$ = require("jquery"),
		_ = require("underscore"),
		cookie = require("cookie"),
		session = require("core/session"),
		Backbone = require("backbone"),
		Marionette = require("marionette"),
		bootstrap = require("bootstrap"),
		Breadcrumb = require("core/views/Breadcrumb");

	app = new Marionette.Application();

	// application configuration
	app.config = {
		api: 'api',
		cookie: 'dashboard_'
	};

	// The root path to run the application through.
	app.root = "/";
	app.layout;
	app.session = session;

	// Main Region
	app.addRegions({
		regionMain: '#main'
	});

	app.navigate = function(route,  options){
		options || (options = {});
//		route = app.i18n.currentLanguage + "/" + route;
		Backbone.history.navigate(route, options);
	};

	app.getCurrentRoute = function(){
		return Backbone.history.fragment
	};

	app.setCookie = function(key, option) {
		$.cookie(app.config.cookie + key, option, {path: app.root});
	};

	app.getCookie = function(key) {
		$.cookie(app.config.cookie + key);
	};


	app.addInitializer(function(options) {
		this.initAppLayout();

		// init ALL app routers
		_(options.routers).each(function(router) {
			new router();
		});
	});

	app.on("initialize:before", function(options) {
		options || (options = {});
		app.i18n = {
			acceptedLanguages: options.acceptedLanguages || [],
			currentLanguage: "ru"
		};
	});

	app.on("initialize:after", function() {
		if(Backbone.history){
			Backbone.history.start();

            Backbone.on('route', function() {
                console.log(arguments);
            });

			if (this.getCurrentRoute() === "") {
//				app.trigger("contacts:list");
			}
		}
	});

    app.on("app:user:logon", function(options) {
        app.initAppLayout();
    });

    app.on("app:user:logout", function(options) {
        app.initAppLayout();
    });

	app.on("session:expired", function(options) {
		var currentRoute = app.getCurrentRoute();

		app.setCookie('route', currentRoute);
	});

	app.on('app:page:show', function(view) {
		app.regionMain.currentView.content.close();
		app.regionMain.currentView.content.show(view);
	});

	app.on('app:layout:show', function() {

        if (app.session.isAuthenticated()) {
		    app.initBreadcrumb();
        }

	});

    app.on('app:page:action', function(event) {
        try {
            app.regionMain.currentView.content.currentView.content.currentView.trigger('app:page:action', event);
        } catch (error) {

        }
    });


	app.initAppLayout = function() {
		var Layout;

        app.session.load();

		if (app.session.isAuthenticated()) {
			Layout = require("core/layout/Main");
		} else {
			Layout = require("core/layout/Empty");
		}

		app.layout = new Layout();

		// Inject the main layout into the #main region of the page.
		app.regionMain.close();
		app.regionMain.show(app.layout);

		app.trigger('app:layout:show');
	};

	app.initBreadcrumb = function() {
		app.breadcrumb = Breadcrumb;
		app.breadcrumb.reset();

		app.regionMain.currentView.breadcrumb.show(app.breadcrumb);
	};

	app.module = function(additionalProps) {
		var module = {
			options: {},
			router: {},
			controller: {},
			views: {},
			models: {},
			collections: {},

			initialize: function(options) {

			}
		};

		return _.extend(module, additionalProps);
	};

	module.exports = app;

});