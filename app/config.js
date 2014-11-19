require.config({
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        "vendor": 				"../vendor",
        "core": 				"core",
        "templates": 			"templates",

        "almond":               "../vendor/almond/almond",
        "underscore": 			"../vendor/lodash/dist/lodash.underscore",
        "lodash": 				"../vendor/lodash/dist/lodash",
        "jquery": 				"../vendor/jquery/dist/jquery",
        "backbone": 			"../vendor/backbone/backbone",
        "marionette":			"../vendor/backbone.marionette/lib/core/amd/backbone.marionette",
		"backbone.wreqr":		"../vendor/backbone.wreqr/lib/backbone.wreqr",
		"backbone.babysitter":  "../vendor/backbone.babysitter/lib/backbone.babysitter",
        "bootstrap":			"../vendor/bootstrap/dist/js/bootstrap",
        "hbs":					"../vendor/hbs/hbs",
        "i18nprecompile":		"../vendor/hbs/hbs/i18nprecompile",
        "json2":				"../vendor/hbs/hbs/json2",
        "handlebars":			"../vendor/hbs/handlebars",

        // Plugins
        "marionette.BossView":  "core/libs/Marionette.BossView.AMD",
        "backbone.validation":  "../vendor/backbone.validation/dist/backbone-validation-amd",
        "text":					"../vendor/requirejs-text/text",
		"cookie":     			"../vendor/jquery-cookie/jquery.cookie",

		// Application
		"app":					"core/app"
	},
    shim:{
        // Backbone
        "backbone":{
            // Depends on underscore/lodash and jQuery
            "deps":["underscore", "jquery"],
            // Exports the global window.Backbone object
            "exports":"Backbone"
        },
        //Marionette
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        },
        // Backbone.validation plugin that depends on Backbone
        "backbone.validation":["backbone"],

		"bootstrap": ["jquery"],
		"cookie": ["jquery"]
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    locale: 'ru_ru',
    hbs: {
        i18n: true,
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});
