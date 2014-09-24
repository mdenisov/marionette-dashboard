require.config({
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        "vendor": 				"../vendor",
        "underscore": 			"../vendor/lodash/dist/lodash.underscore",
        "jquery": 				"../vendor/jquery/dist/jquery",
        "backbone": 			"../vendor/backbone/backbone",
        "marionette":			"../vendor/backbone.marionette/lib/core/amd/backbone.marionette",
        "handlebars":			"../vendor/handlebars/handlebars",
        "bootstrap":			"../vendor/bootstrap/dist/js/bootstrap",
        "hbs":					"../vendor/hbs/hbs",
        "json2":				"../vendor/json2",

        // Plugins
        "backbone.validation":  "../vendor/backbone.validation/dist/backbone-validation-amd",
        "text":					"../vendor/requirejs-text/text",
		"cookie":     			"../vendor/jquery-cookie/jquery.cookie"
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
        //Handlebars
        "handlebars":{
            "exports":"Handlebars"
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
