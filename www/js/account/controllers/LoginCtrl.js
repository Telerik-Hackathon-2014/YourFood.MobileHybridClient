'use strict';

app.controller('LoginCtrl',
    function ($scope, $location, identity, auth) {
        $scope.identity = identity;

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user).then(function(success) {
                    if (success) {
                        console.log('Successful login!');
                    }
                    else {
                        $scope.error = 'Username/Password combination is not valid!';
                    }
                });
            }
            else {
                console.log('Username and password are required fields!')
            }
        };

        $scope.logout = function () {
            auth.logout().then(function() {
                console.log('Successful logout!');
                if ($scope.user) {
                    $scope.user.email = '';
                    $scope.user.username = '';
                    $scope.user.password = '';
                }

                $scope.loginForm.$setPristine();
                $location.path('/');
            })
        };

    });