define([

    'jquery',
    'underscore',
    'marionette',

    'app'

], function ($, _, Marionette, App) {
    'use strict';

    return Marionette.ItemView.extend({

        target: null,

        onRender: function() {
            this.on('app:page:action', this.onToolsItemClick.bind(this));
        },

        onToolsItemClick: function(event) {
            this.target = $(event.currentTarget);

            switch (this.target.data('target')) {
                case 'collapse':
                    this.onCollapse();
                    break;
                case 'reload':
                    this.onReload();
                    break;
                case 'close':
                    this.onClose();
                    break;
                case 'new':
                    this.onNew();
                    break;
                case 'edit':
                    this.onEdit();
                    break;
            }
        },

        onCollapse: function() {

        },

        onReload: function() {

        },

        onClose: function() {

        },

        onNew: function() {

        },

        onEdit: function() {

        },

        onTrash: function() {

        }

    });

});