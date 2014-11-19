define([

    'backbone',

    'app'

], function (Backbone, App) {
    "use strict";

    var User =  Backbone.Model.extend({

		url: function() {
			return App.config.api + '/user/';
		},

        defaults: {
            id: '',
            name: '',
            email: '',
            role: '',
            photo: ''
        },

        auth: function (opts, callback) {
            var self = this;
            this.fetch({
                url: this.url() + 'login',
				data: {email: opts.email, password: opts.password},
                wait: true,
				type: 'POST',
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.error(model, error);
                }
            });
        },

        logout: function (opts, callback) {
            var self = this;
            this.fetch({
                url: this.url() + 'logout',
                wait: true,
				type: 'POST',
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.error(model, error);
                }
            });
        },

        update: function(opts, callback) {
            var self = this;
            var data = {};

            _.each(opts, function(opt) {
                _.extend(data, _.object([_.values(opt)]));
            });

            this.save(data, {
                url: this.url() + this.get('id'),
                wait: true,
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.error(model, error);
                }
            });
        },

        getInfo: function(opts, callback) {
            var self = this;
            this.fetch(data, {
                url: this.url() + this.get('id'),
                wait: true,
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.error(model, error);
                }
            });
        }
    });

    return new User();

});