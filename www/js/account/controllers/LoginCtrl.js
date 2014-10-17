'use strict';

app.controller('LoginCtrl',
    function ($scope, $location, identity, auth, productsData) {
        $scope.identity = identity;
        $scope.loginActive = true;

        $scope.isAdmin = function () {
            // TODO: Uncomment when roles are active
            return identity.isAdmin();
//            return true;
        };

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user).then(function (success) {
                    if (success) {
                        $location.path('/products');
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
            auth.logout().then(function () {
                console.log('Successful logout!');
                if ($scope.user) {
                    $scope.user.email = '';
                    $scope.user.username = '';
                    $scope.user.password = '';
                }

                $location.path('/login');
            })
        };

        $scope.changeToSignUp = function () {
            $scope.loginActive = false;
        };
    });