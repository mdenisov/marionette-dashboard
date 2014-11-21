define([

	'jquery',
	'underscore',
	'marionette',
	'handlebars',

	'app'

], function ($, _, Marionette, Handlebars, App) {
	'use strict';

	var instance;

	var Breadcrumb = Backbone.Model.extend({
		defaults: {
			link: '',
			name: ''
		}
	});

	var BreadcrumbList = Backbone.Collection.extend({
		model: Breadcrumb
	});

	var BreadcrumbItemView = Marionette.ItemView.extend({
		tagName: "li",
		template: Handlebars.compile('<a href="{{this.link}}">{{this.name}}</a>')
	});

	var BreadcrumbListView = Marionette.CollectionView.extend({
		tagName: "ol",
		className: "breadcrumb",
        childView: BreadcrumbItemView,

		homeModel: {link: '#/', name: 'Главная'},

		collection: new BreadcrumbList(),

		initialize: function() {
			this.listenTo(this.collection, 'change', this.render);
			this.render();
		},

		addOne: function(item) {
			var breadcrumb = new Breadcrumb(item);

			this.collection.add(breadcrumb);
		},

		addAll: function(list) {
			_.each(list, _.bind(function(breadcrumb) {
				this.addOne(breadcrumb);
			}, this));
		},

		reset: function(list) {
			this.collection.reset([]);
			this.addOne(this.homeModel);
			this.addAll(list);
		}
	});

	// Singleton
	var getInstance = function() {
		if (!instance) {
			instance = new BreadcrumbListView();
		}

		return instance;
	};

	return getInstance();
});