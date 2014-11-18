define([

	'jquery',
	'underscore',
	'marionette',
	'handlebars',

	'app'

], function ($, _, Marionette, Handlebars, App) {
	'use strict';

	var instance;

	var NotificationModel = Backbone.Model.extend();

	var NotificationCollection = Backbone.Collection.extend({
		model: NotificationModel
	});

	var NotificationItemView = Marionette.ItemView.extend({
		tagName: "li",
		className: "notifications__item",
		template: Handlebars.compile('<span class="notifications__close">close x</span>{{this.message}}'),

		ui: {
			close: '.notifications__close'
		},

		events: {
			'click @ui.close': 'onCloseClick'
		},

		initialize: function(options) {
			if (this.model.get('type')) {
				this.$el.addClass(this.model.get('type'));
			}
		},

		onCloseClick: function() {
			this.$el.removeClass('notifications__item--shown');
			setTimeout(_.bind(function() {
				this.close();
			}, this), 500);
		},

		onRender: function() {
			setTimeout(_.bind(function() {
				this.$el.addClass('notifications__item--shown');
			}, this), 25);
		}
	});

	var NotificationListView = Marionette.CollectionView.extend({
		tagName: "ul",
		className: "notifications",
		itemView: NotificationItemView,
		childViewContainer: 'body',

		defaults: {},
		layouts: [],
		themes: [],

		collection: new NotificationCollection(),

		initialize: function(options) {

			this.options = _.extend({}, this.defaults, options);
			this.options.layout = (this.options.custom) ? this.layouts['inline'] : this.layouts[this.options.layout];

			if (this.themes[this.options.theme]) {
				this.options.theme = this.themes[this.options.theme];
			} else {
//				options.themeClassName = this.options.theme;
			}

			this.listenTo(this.collection, 'change', this.render);
			this.render();
		},

		addOne: function(item) {
			var notification = new NotificationModel(item);

			this.collection.add(notification);
		},

		addAll: function(list) {
			_.each(list, _.bind(function(notification) {
				this.addOne(notification);
			}, this));
		},

		reset: function(list) {
			this.collection.reset([]);
			this.addAll(list);
		}
	});

	// Singleton
	var getInstance = function() {
		if (!instance) {
			instance = new NotificationListView();
		}

		return instance;
	};

	return getInstance();
});