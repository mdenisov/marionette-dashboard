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
            this.on('app:page:action', this.onActionItemClick.bind(this));
        },

        onActionItemClick: function(event) {
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

                case 'submit':
                    this.onSave();
                    break;
                case 'reset':
                    this.onReset();
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

        },

        onSave: function() {

        },

        onReset: function() {

        }

    });

});