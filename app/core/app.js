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
		api: 'api/index.php',
		cookie: 'dashboard_'
	};

	// The root path to run the application through.
	app.root = "/";
	app.layout = null;
	app.user = null;
	app.session = null;
    app.DEBUG = true;

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
        this.restoreUser();
		this.initAppLayout();

		// init ALL app routers
		_(options.routers).each(function(router) {
			new router();
		});
	});

	app.on("initialize:before", function(options) {
		options || (options = {});
        this.i18n = {
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

    app.on("app:user:logon", function(options) {
        this.initAppLayout();
    });

    app.on("app:user:logout", function(options) {
        this.initAppLayout();
    });

	app.on("session:expired", function(options) {
		var currentRoute = this.getCurrentRoute();

        this.setCookie('route', currentRoute);
	});

	app.on('app:page:show', function(view) {
        this.regionMain.currentView.content.close();
        this.regionMain.currentView.content.show(view);
	});

	app.on('app:layout:show', function() {

        if (this.session.isAuthenticated()) {
            this.initBreadcrumb();
        }

	});

    app.on('app:page:action', function(event) {
        try {
            this.regionMain.currentView.content.currentView.content.currentView.trigger('app:page:action', event);
        } catch (error) {

        }
    });


    app.restoreUser = function() {
        if (this.session.get('accessToken')) {
            this.user.set({
                id: app.session.get('userId'),
                email: app.session.get('email'),
                name: app.session.get('userName'),
                photo: app.session.get('userPhoto'),
                role: app.session.get('userRole'),
                token: app.session.get('accessToken')
            });
        }
    };

	app.initAppLayout = function() {
		var Layout;

		if (this.session.isAuthenticated()) {
			Layout = require("core/layout/Main");
		} else {
			Layout = require("core/layout/Empty");
		}

        this.layout = new Layout({model: app.user});

		// Inject the main layout into the #main region of the page.
        this.regionMain.close();
        this.regionMain.show(this.layout);

        this.trigger('app:layout:show');
	};

	app.initBreadcrumb = function() {
        this.breadcrumb = Breadcrumb;
        this.breadcrumb.reset();

        this.regionMain.currentView.breadcrumb.show(app.breadcrumb);
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