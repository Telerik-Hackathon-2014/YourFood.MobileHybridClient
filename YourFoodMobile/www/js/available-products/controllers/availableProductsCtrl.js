'use strict';

app.controller('AvailableProductsCtrl', function ($scope, $location, availableProductsData, identity) {
    if (!identity.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();

    $scope.filter = {};
    $scope.filter.page = $scope.filter.page || 1;
    $scope.filter.sortType = $scope.filter.sortType || 'asc';

    $scope.numColumns = [];
    $scope.numColumns.length = 4;

    function getProducts() {
        availableProductsData.getAllAvailableProducts(
            $scope.filter,
            function (data) {
                console.log(data);
                $scope.availableProducts = data.value;
            });
    }

    $scope.nextPage = function () {
        if (!$scope.catalogProducts) {
            return;
        }
        if ($scope.catalogProducts.length < 10) {
            return;
        }

        $scope.filter.page++;
        getProducts();
    };

    $scope.prevPage = function () {
        if ($scope.filter.page > 1) {
            $scope.filter.page--;
            getProducts();
        }
    };

    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false,
        open: true
    };

    $scope.sort = function () {
        getProducts();
    };

//    if (identity.isAuthenticated()) {
//        productsData.getAvailableProducts(identity.currentUser()._id, function (availableProducts) {
//            $scope.availableProducts = availableProducts;
//
//            for (var i = 0; i < availableProducts.length; i += 1) {
//                var purchaseDate = new Date(availableProducts[i].purchaseDate);
//                var currentTime = new Date();
//
//                // Calculate the difference in milliseconds
//                var timeDiff = currentTime.getTime() - purchaseDate.getTime();
//
//                // Convert back to days and return
//                var freshness = availableProducts[i].lifetime - Math.round(timeDiff / one_day);
//                $scope.availableProducts[i].freshness = freshness;
//            }
//        });
//    }

    getProducts();
});