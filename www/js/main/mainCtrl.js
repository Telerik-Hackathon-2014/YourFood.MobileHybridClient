'use strict';

app.controller('MainCtrl', function ($scope, identity) {
    $scope.isLogged = function () {
        return  identity.isAuthenticated();
    };
});