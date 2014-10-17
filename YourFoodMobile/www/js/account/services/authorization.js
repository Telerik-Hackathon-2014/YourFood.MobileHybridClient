'use strict';

app.factory('authorization',['identity', function(identity) {
    console.log(identity);
    return {
        getAuthorizationHeader: function() {
            return {
                'Authorization': 'Bearer ' + identity.getCurrentUser()['access_token']
            }
        }
    }
}]);