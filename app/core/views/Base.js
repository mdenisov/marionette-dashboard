define([

	'jquery',
	'underscore',
	'marionette',
    'handlebars',

	'app',
	'hbs!templates/layout/page'

], function ($, _, Marionette, Handlebars, App, template) {
	'use strict';

    var Layout = Marionette.Layout.extend({
        template: template,

        regions: {
            header: '#page-header',
            tools: '#page-tools',
            content: '#page-content'
        }
    });

    var Header = Marionette.ItemView.extend({
        tagName: 'h2',
        template: Handlebars.compile('{{{this.title}}}'),

        serializeData: function() {
            return this.options;
        }
    });

    var Content = Marionette.ItemView.extend({
        template: Handlebars.compile('{{{this.content}}}'),

        serializeData: function() {
            return this.options;
        }
    });

    var Tools = Marionette.ItemView.extend({
        tagName: 'h2',
        template: Handlebars.compile('<h2>{{{this.title}}}</h2>')
    });

    return Backbone.Model.extend({

        options: {},
        layout: null,
        tools: null,
        header: null,
        content: null,
        template: null,

        initialize: function(options) {
            this.options = options;
            this.layout = new Layout();

            App.trigger('app:page:show', this.layout);

            if (this.options.template) {
                this.loadTemplate();
            } else {
                this.process();
            }
        },

        loadTemplate: function() {
            require(['hbs!' + this.options.template], _.bind(function(template) {
                this.options.template = template;
                this.template = template;
                this.process();
            }, this));
        },

        process: function() {
            this.setHeader();
            this.setContent();
            this.setBreadcrumb();
        },

        setHeader: function() {
            this.header = new Header({title: this.options.title});
            this.layout.header.show(this.header);
        },

        setContent: function() {
            if (this.options.content && typeof this.options.content === "object") {
                this.content = this.options.content;
            } else {
                this.content = new Content(this.options);
            }

            this.layout.content.show(this.content);
        },

        setBreadcrumb: function() {
            var link = App.getCurrentRoute(),
                name = this.options.title;
            if (link !== '' && link !== '/' && link !== 'home') {
                App.breadcrumb.reset([{
                    'link': '#/' + link,
                    'name': name
                }]);
            } else {
                App.breadcrumb.reset([]);
            }
        }

    });


	return Marionette.ItemView.extend({
		template: template,

		options: {
//			tools: {
//				trash: true
//			}
		},

		ui: {
			tool: '.panel-tools .btn'
		},

		events: {
			'click .panel-tools .btn': 'onToolItemClick'
		},

		serializeData: function() {
			if (this.model) {
				return this.model;
			} else {
				return this.options;
			}
		},

		initialize: function (options) {
			App.trigger('app:page:show', this);
		},

		onToolItemClick: function(event) {
			console.log(event);
		}

	});
});