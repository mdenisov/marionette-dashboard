require(["config"], function() {

	require([

		'jquery',
		'underscore',
		'backbone',
		'lodash',

		"app",
		"core/modules",
		"modules",

		'core/routers/Auth',
		'core/routers/Main',
		'core/routers/User'

	], function ($, _, Backbone, lodash, App, coreModules, userModules, AuthRouter, MainRouter, UserRouter) {

		'use strict';

		var Main = {
			modulesCount: 0,
			modulesLoaded: 0,

			initialize: function() {

				this.initModules();

			},

			initModules: function() {
				this.modules = lodash.merge(coreModules, userModules);
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
						auth: AuthRouter,
						main: MainRouter,
						user: UserRouter
					}
				};

				App.start(options);
			}
		};

		Main.initialize();

	});
});
