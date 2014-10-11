require(["config"], function() {

	require([

		'jquery',
		'underscore',
		'backbone',
		'lodash',

		"app",
        "core/models/User",
        "core/session",
		"core/modules",
		"modules",

		'core/routers/Main'

	], function ($, _, Backbone, lodash, App, User, Session, coreModules, userModules, MainRouter) {

		'use strict';

		var Main = {
			modulesCount: 0,
			modulesLoaded: 0,

			initialize: function() {

                App.user = User;
                App.session = Session;
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
						main: MainRouter
					}
				};

				App.start(options);
			}
		};

		Main.initialize();

	});
});
