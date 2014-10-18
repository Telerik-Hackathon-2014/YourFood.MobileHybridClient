'use strict';

app.factory('notifier', function () {

    return {
        success: function (message) {
            console.log(message);
        },
        error: function (message) {
            console.log(message);
        },
        warning: function (message) {
            console.log(message);
        }
    }

});