'use strict';

app.factory('identity', function($cookieStore) {
    var cookieStorageUserKey = 'currentApplicationUser';

    var currentUser;
    return {
        getCurrentUser: function() {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if (savedUser) {
                return savedUser;
            }

            return currentUser;
        },
        setCurrentUser: function(user) {
            if (user) {
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else {
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthenticated: function() {
            return !!this.getCurrentUser();
        },
        isAuthorizedForRole: function (role) {
            return !!this.getCurrentUser() && this.getCurrentUser().roles.indexOf(role) > -1;
        },
        isAdmin: function () {
            return this.isAuthorizedForRole('Admin');
        }
    }
});