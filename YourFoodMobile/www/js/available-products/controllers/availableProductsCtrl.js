'use strict';

app.controller('AvailableProductsCtrl', function ($scope,$rootScope, $location, availableProductsData, identity, productsCategoriesData) {
    if (!identity.isAuthenticated()) {
        $location.path('/home');
        return;
    }

    $rootScope.tab = $rootScope.tab || {};

    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();


    function showAvailableProductsTab () {
        $rootScope.tab.isAvailabeProductsTab = true;
        $rootScope.tab.isCatalogProductsTab = false;
        $rootScope.tab.isRecipesTab = false;
    }

    showAvailableProductsTab();

    $scope.filter = {};
    $scope.filter.page = $scope.filter.page || 1;
    $scope.filter.sortType = $scope.filter.sortType || 'asc';

    $scope.numColumns = [];
    $scope.numColumns.length = 4;

    function getProducts() {
        availableProductsData.getAllAvailableProducts(
            $scope.filter,
            function (data) {
                $rootScope.availableProducts = data.value;
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