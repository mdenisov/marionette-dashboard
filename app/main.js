require(["config"], function() {

	require([

		'jquery',
		'underscore',
		'backbone',

		"app",
		"modules",

		'core/routers/Main',
//		'routers/User'

	], function ($, _, Backbone, App, modules, MainRouter, UserRouter) {

		'use strict';

		var Main = {
			modulesCount: 0,
			modulesLoaded: 0,

			initialize: function() {

				this.initModules();

			},

			initModules: function() {
				this.modulesCount = _.size(modules);

				if (modules && this.modulesCount > 0) {

					_.each(modules, _.bind(function(part, index) {
						if (part.module && typeof part.module !== "undefined") {

							this.modulesLoaded++;

							part.options = part.options || {};

							part.module.initialize(part.options);

							if (this.modulesCount === this.modulesLoaded) {
								this.initApplication();
							}


//							require([part.module], _.bind(function(module) {
//								this.modulesLoaded++;
//
//								part.options = part.options || {};
//
////								console.log(part.module.initialize());
//
//								module.initialize(part.options);
//
//								if (this.modulesCount === this.modulesLoaded) {
//									this.initApplication();
//								}
//							}, this));
						}
					}, this));
				} else {
					this.initApplication();
				}
			},

			// Start the app
			initApplication: function() {
				var options = {
					routers: {
						main: MainRouter,
//						user: UserRouter
					}
				};

				App.start(options);
			}
		};

		Main.initialize();

	});
});
