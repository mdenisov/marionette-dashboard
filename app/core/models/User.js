define([

    'backbone',

    'app'

], function (Backbone, App) {
    "use strict";

    return Backbone.Model.extend({

		url: function() {
			return App.config.api + '/index.php';
		},

        defaults: {
            id: '',
            name: '',
            email: '',
            role: '',
            photo: ''
        },

		/*
		 * Abstracted fxn to make a POST request to the auth endpoint
		 * This takes care of the CSRF header for security, as well as
		 * updating the user and session after receiving an API response
		 */
		postAuth: function(opts, callback, args){
			var self = this;
			var postData = _.omit(opts, 'method');

			if(App.DEBUG) console.log(postData);

			$.ajax({
				url: this.url() + '?method=' + opts.method,
				dataType: 'json',
				type: 'POST',
				beforeSend: function(xhr) {
					// Set the CSRF Token in the header for security
//					var token = $('meta[name="csrf-token"]').attr('content');
//					if (token) xhr.setRequestHeader('X-CSRF-Token', token);
				},
				data: _.omit(opts, 'method'),
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

		logout: function(opts, callback, args){
			this.postAuth(_.extend(opts, { method: 'logout' }), callback);
		},

		signup: function(opts, callback, args){
			this.postAuth(_.extend(opts, { method: 'signup' }), callback);
		},

		removeAccount: function(opts, callback, args){
			this.postAuth(_.extend(opts, { method: 'remove_account' }), callback);
		}

    });

});