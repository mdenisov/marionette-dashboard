define([

	'jquery',
	'underscore',
	'marionette',

	'app'

], function ($, _, Marionette, App) {
	'use strict';

	var instance;

	var Breadcrumb = Backbone.Model.extend({
		defaults:{
			link        : '',
			name        : ''
		}
	});

	var BreadcrumbList = Backbone.Collection.extend({
		model : Breadcrumb
	});

	var BreadcrumbView = Marionette.ItemView.extend({
		tagName : 'li',

		render : function() {
			var liData = '<a href="' + this.model.get('link') + '">' + this.model.get('name') + '</a>';

			$(this.el).html(liData);

			return this;
		}
	});

	var BreadcrumbListView = Marionette.CollectionView.extend({
		tagName: "ol",
		className: "breadcrumb",
		id: "breadcrumb",

		itemView: BreadcrumbView,

		initialize : function() {
			this.collection = new BreadcrumbList();

			this.collection.bind('add', this.appendBreadcrumb);

			//this.collection.add({link: '#', name: 'You are here : '});
			this.listenTo(this.collection, "add", this.appendBreadcrumb);
		},

		addBradcrumb: function(breadcrumbList){
			breadcrumbList.forEach(function(breadcrumb) {
				console.log(breadcrumb);
				this.collection.add(breadcrumb);
			}, this);
		},

		appendBreadcrumb: function(breadcrumb) {
			var breadcrumbView = new BreadcrumbView({
				model : breadcrumb
			});

			$(this.el).append(breadcrumbView.render().el);
		}
	});

	// Singleton
	var getInstance = function() {
		if (!instance) {
			instance = new BreadcrumbListView();
		}

		return instance;
	};

	return BreadcrumbListView;
});