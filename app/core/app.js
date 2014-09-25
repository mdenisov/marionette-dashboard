define(function(require, exports, module) {
	"use strict";

	// External dependencies.
	var app,
		$ = require("jquery"),
		_ = require("underscore"),
		Backbone = require("backbone"),
		Marionette = require("marionette"),
		bootstrap = require("bootstrap");

	app = new Marionette.Application();

	// application configuration
	app.config = {
		api: 'api'
	};

	// The root path to run the application through.
	app.root = "/";

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


	app.addInitializer(function(options) {
		this.initAppLayout();

		// init ALL app routers
		_(options.routers).each(function(router) {
			new router();
		});
	});

	app.on("initialize:before", function(options){
		options || (options = {});
		app.i18n = {
			acceptedLanguages: options.acceptedLanguages || [],
			currentLanguage: "ru"
		};
	});

	app.on("initialize:after", function(){
		if(Backbone.history){
			Backbone.history.start();

			if(this.getCurrentRoute() === ""){
//				app.trigger("contacts:list");
			}
		}
	});


	app.initAppLayout = function() {
		var Layout = require("core/layout/Main");

		// Inject the main layout into the #main region of the page.
		app.regionMain.show(new Layout());
	};

	return app;

});