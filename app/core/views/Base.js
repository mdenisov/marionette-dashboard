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
        template: Handlebars.compile('<h2>{{{this.title}}}</h2> {{#if this.subtitle}}<label class="color">{{{this.subtitle}}}</label>{{/if}} '),

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

		layout: null,
		header: null,
		tools: null,
		content: null,
		template: null,

        initialize: function(options) {
            this.layout = new Layout();

			this.setOptions(options);

            App.trigger('app:page:show', this.layout);

            if (this.template) {
                this.loadTemplate();
            } else {
                this.process();
            }
        },

		setOptions: function(options) {
			this.options = {};

			if (options.title) {
				this.set('title', options.title);
			}
			if (options.subtitle) {
				this.set('subtitle', options.subtitle);
			}
			if (options.content) {
				this.set('content', options.content);
			}
			if (options.tools) {
				this.set('tools', options.tools);
			}
			if (options.template) {
				this.unset('template');
				this.template = options.template;
			}

			console.log(this.toJSON());
		},

        loadTemplate: function() {
            require(['hbs!' + this.template], _.bind(function(template) {
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
            this.header = new Header(this.toJSON());
            this.layout.header.show(this.header);
        },

        setTools: function() {
            if (this.has('tools')) {
                this.tools = new Tools(this.toJSON());
                this.layout.tools.show(this.tools);
            }
        },

        setContent: function() {
            if (this.has('content') && typeof this.get('content') === "object") {
                this.content = this.get('content');
            } else {
				var options = new Backbone.Model(this.toJSON());

				if (this.template) {
					options.set('template', this.template);
				}

                this.content = new Content(options.toJSON());
            }

            this.layout.content.show(this.content);
        },

        setBreadcrumb: function() {
            var link = App.getCurrentRoute(),
                name = this.get('title');
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