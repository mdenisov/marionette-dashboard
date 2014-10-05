define([

    'jquery',
    'underscore',
    'marionette',

    'app'

], function ($, _, Marionette, App) {
    'use strict';

    return Marionette.ItemView.extend({

        onRender: function() {
            this.on('app:page:action', this.onToolsItemClick.bind(this));
        },

        onToolsItemClick: function(event) {
            console.log(event);
        }

    });

});