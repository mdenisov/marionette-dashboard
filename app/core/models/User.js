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
                url: this.url() + 'login/' + opts.email + '/' + opts.password,
                wait:true,
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.success(model, error);
                }
            });
        },

        logout: function (opts, callback) {
            var self = this;
            this.fetch({
                url: this.url() + 'logout',
                wait:true,
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.success(model, error);
                }
            });
        },

        update: function(opts, callback) {
            var data = {};

            _.each(opts, function(opt) {
                _.extend(data, _.object([_.values(opt)]));
            });

            this.save(data, {
                url: this.url() + this.get('id'),
                wait:true,
                success:function(model, response) {
                    if( callback && 'success' in callback ) callback.success(model, response);
                },
                error: function(model, error) {
                    if( callback && 'error' in callback ) callback.success(model, error);
                }
            });
        },

		/*
		 * Abstracted fxn to make a POST request to the auth endpoint
		 * This takes care of the CSRF header for security, as well as
		 * updating the user and session after receiving an API response
		 */
		postAuth: function(opts, callback, args) {
			var self = this;
			var url = this.url() + '/' + opts.method;
			var postData = _.values(_.omit(opts, 'method')).join('/');
			var type = 'GET';

            console.log(postData);

			if(App.DEBUG) console.log(_.omit(opts, 'method'));

			$.ajax({
				url: url + (postData ? '/' + postData : ''),
				dataType: 'json',
				type: type,
				beforeSend: function(xhr) {
					// Set the CSRF Token in the header for security
//					var token = $('meta[name="csrf-token"]').attr('content');
//					if (token) xhr.setRequestHeader('X-CSRF-Token', token);
				},
//				data: _.values(_.omit(opts, 'method')).join('/'),
				success: function(res) {
					if( !res.error ){
						if(_.indexOf(['login', 'signup'], opts.method) !== -1){

                            self.set(res.user || {});
                            App.session.save(self);

						} else {
							self.set({ logged_in: false });
						}

						if( callback && 'success' in callback ) callback.success(res);
					} else {
						if( callback && 'error' in callback ) callback.error(res);
					}
				},
				error: function(mod, res) {
					if(callback && 'error' in callback ) callback.error(res);
				}
			}).complete( function() {
				if(callback && 'complete' in callback ) callback.complete(res);
			});
		},

		login: function(opts, callback, args){
			this.postAuth(_.extend(opts, { method: 'login' }), callback);
		},

//		logout: function(opts, callback, args){
//			this.postAuth(_.extend(opts, { method: 'logout' }), callback);
//		},

//        update: function(opts, callback, args){
//            this.postAuth(_.extend(opts, { method: 'update' }), callback);
//        },

		signup: function(opts, callback, args){
			this.postAuth(_.extend(opts, { method: 'signup' }), callback);
		},

		removeAccount: function(opts, callback, args){
			this.postAuth(_.extend(opts, { method: 'remove_account' }), callback);
		}

    });

    return new User();

});