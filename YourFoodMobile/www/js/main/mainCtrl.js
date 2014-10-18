'use strict';

app.controller('MainCtrl', function ($scope, identity, cameraData) {



    $scope.takePictureForShoppingList = function () {
        document.addEventListener('deviceready', function () {
            var picConfig = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };
            
            navigator.camera.getPicture(function (imageData) {
                var image = "data:image/jpeg;base64," + imageData;

                cameraData.postImage(image, function (data) {
                    alert(data);
                });
            }, function (err) {
                $scope.error = 'CAMERA NOT WORKING';
            }, picConfig);
        });
    };

    $scope.isLogged = function () {
        return  identity.isAuthenticated();
    };

});