define([

	'jquery',
	'underscore',
	'marionette',
    'handlebars',

	'app',
	'hbs!templates/layout/page',
    'hbs!templates/layout/tools'

], function ($, _, Marionette, Handlebars, App, template, tools) {
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

        events: {
            'app:page:action': 'onToolItemClick'
        },

        initialize: function() {
            this.on('app:page:action', function(event) {
                console.log(event);
            });

            console.log(this);
        },

        serializeData: function() {
            return this.options;
        },

        onToolItemClick: function(event) {
            return false;
        }
    });

    var Tools = Marionette.ItemView.extend({
        template: tools,

        ui: {
            tool: '.panel-tools .btn'
        },

        events: {
            'click .panel-tools .btn': 'onToolItemClick'
        },

        serializeData: function() {
            return this.options;
        },

        onToolItemClick: function(event) {
            App.trigger('app:page:action', event);

            return false;
        }
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
            this.setTools();
            this.setContent();
            this.setBreadcrumb();
        },

        setHeader: function() {
            this.header = new Header({title: this.options.title});
            this.layout.header.show(this.header);
        },

        setTools: function() {
            if (this.options.tools) {
                this.tools = new Tools({tools: this.options.tools});
                this.layout.tools.show(this.tools);
            }
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
});