define(function (require) {
	'use strict';

	return {
        'auth': {
            'module': require('core/modules/Auth'),
            'options': {

            }
        },
		'user': {
			'module': require('core/modules/User'),
			'options': {

			}
		}
	};
});