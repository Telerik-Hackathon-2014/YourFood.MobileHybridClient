'use strict';

app.controller('CatalogProductsCtrl', function ($scope, catalogProductsData, productsCategoriesData, notifier) {

    $scope.filters = {};

    function getCatalogProducts(filters) {
        catalogProductsData.getAllCatalogProducts(filters,
            function (data) {
                $scope.catalogProducts = data.value;
            })
    }


    function getCategories() {
        productsCategoriesData.getAllProductCategories(
            function (data) {
                $scope.categories = data;
            })
    }

    $scope.sort = function () {
        getCatalogProducts($scope.filters);
    };

    getCatalogProducts($scope.filters);
    getCategories();

});