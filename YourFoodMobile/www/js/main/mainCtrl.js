'use strict';

app.controller('MainCtrl', function ($scope, $rootScope, $location, identity, cameraData, notifier) {

    $scope.takePictureForShoppingList = function () {
        document.addEventListener('deviceready', function () {
            var picConfig = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };

            navigator.camera.getPicture(function (imageData) {
                var image = imageData;

                cameraData.postImage(image, function (data) {
                    $location.path('/')
                });
            }, function (err) {
                notifier.error = 'CAMERA NOT WORKING';
            }, picConfig);
        });
    };

    $rootScope.isLogged = function () {
        return  identity.isAuthenticated();
    };

});