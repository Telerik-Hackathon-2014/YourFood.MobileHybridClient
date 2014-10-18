'use strict';

app.controller('AvailableProductsCtrl', function ($scope, $location, availableProductsData, identity, productsCategoriesData) {
    if (!identity.isAuthenticated()) {
        $location.path('/home');
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
                console.log($scope.filter);
                $scope.availableProducts = data.value;
            });
    }

    function getCategories() {
        productsCategoriesData.getAllProductCategories(
            function (data) {
                $scope.categories = data;
            })
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

    getProducts();
    getCategories();
});