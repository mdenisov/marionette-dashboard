require(["config"], function() {

	require([

		'jquery',
		'underscore',
		'backbone',
		'lodash',

		"app",
		"core/modules",
		"modules",

		'core/routers/Main',
//		'routers/User'

	], function ($, _, Backbone, lodash, App, coreModules, userModules, MainRouter, UserRouter) {

		'use strict';

		var Main = {
			modulesCount: 0,
			modulesLoaded: 0,

			initialize: function() {

				this.initModules();

			},

			initModules: function() {
				this.modules = lodash.merge(coreModules, userModules);

				console.log(this.modules);

				this.modulesCount = _.size(this.modules);

				if (this.modulesCount > 0) {

					_.each(this.modules, _.bind(function(part, index) {
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
