/*
 * Created by ROMEO on 24.02.14.
 * A basic session model holding user credentials. 
 */

define([

    'jquery',
    'underscore',
    'backbone',

    'cookie'

], function($, _, Backbone) {
    'use strict';

    var Session = Backbone.Model.extend({

        // Creating a new session instance will attempt to load the user cookie.
        initialize: function() {
            this.load();
        },

        // Returns true if the user is authenticated.
        isAuthenticated: function() {
            return Boolean(this.get('accessToken'));
        },

        // Saving will create the cookie data instead of syncing the model.
        save: function(model) {
//            $.cookie('accessToken', model.get('token'));
            $.cookie('email', model.get('email'));
            $.cookie('userId', model.get('id'));
            $.cookie('userName', model.get('name'));
            $.cookie('userPhoto', model.get('photo'));
            $.cookie('userRole', model.get('role'));
        },

        // Loads the user's credentials from the cookie data.
        load: function() {
            this.set('accessToken', $.cookie('accessToken'));
            this.set('email', $.cookie('email'));
            this.set('userId', $.cookie('userId'));
            this.set('userName', $.cookie('userName'));
            this.set('userPhoto', $.cookie('userPhoto'));
            this.set('userRole', $.cookie('userRole'));
        },

        destroy: function() {
            this.unset('accessToken');
            $.removeCookie('accessToken');
//            $.removeCookie('email');
            $.removeCookie('userId');
            $.removeCookie('userName');
            $.removeCookie('userPhoto');
            $.removeCookie('userRole');

            return true;
        }

    });

    return new Session();

});