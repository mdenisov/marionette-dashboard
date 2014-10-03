define(function(require, exports, module) {
	"use strict";

	// External dependencies.
	var app,
		$ = require("jquery"),
		_ = require("underscore"),
		cookie = require("cookie"),
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

			if (this.getCurrentRoute() === "") {
//				app.trigger("contacts:list");
			}
		}
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
		app.initBreadcrumb();
	});


	app.initAppLayout = function() {
		var Layout;

		if (1) {
			Layout = require("core/layout/Main");
		} else {
			Layout = require("core/layout/Empty");
		}

		app.layout = new Layout();

		// Inject the main layout into the #main region of the page.
		app.regionMain.show(app.layout);

		app.trigger('app:layout:show');
	};

	app.initBreadcrumb = function() {
		app.breadcrumb = Breadcrumb;
		app.breadcrumb.reset();

		app.regionMain.currentView.breadcrumb.show(app.breadcrumb);
	};

	return app;

});