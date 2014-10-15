'use strict';

app.controller('SignUpCtrl',
    function ($scope, $location, auth) {

        $scope.signup = function (user, signUpForm) {
            if (signUpForm.$valid) {
                var newUser = {
                    "Email": user.Email,
                    "Username": user.Username,
                    "Password": user.Password,
                    "ConfirmPassword": user.Password
                };

                console.log(newUser);

                auth.signup(newUser).then(function (success) {
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

//            auth.signup(newUser).success(function (res) {
//                console.log("Successfully registered !");
//                $scope.registered = true;
//            });
        }
    });