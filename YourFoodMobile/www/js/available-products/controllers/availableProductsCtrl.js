'use strict';

app.controller('AvailableProductsCtrl', function ($scope,$rootScope, $location, availableProductsData, identity, productsCategoriesData) {
    if (!identity.isAuthenticated()) {
        $location.path('/home');
        return;
    }

    document.addEventListener('deviceready', function () {
        navigator.camera.getPicture(function (image) {
            $scope.imageURI = image;
        }, function (err) {
            $scope.error = 'CAMERA NOT WORKING';
        });
    });

    $rootScope.availableProductsFilters = {};
    $rootScope.tab = $rootScope.tab || {};

    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();


    function showAvailableProductsTab () {
        $rootScope.tab.isAvailabeProductsTab = true;
        $rootScope.tab.isCatalogProductsTab = false;
        $rootScope.tab.isRecipesTab = false;
    }

    $scope.numColumns = [];
    $scope.numColumns.length = 4;

    function getProducts(filters) {
        availableProductsData.getAllAvailableProducts(filters,
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

    $scope.sort = function () {
        getProducts($rootScope.availableProductsFilters);
    };

    getProducts($rootScope.availableProductsFilters);
    getCategories();
    showAvailableProductsTab();
});