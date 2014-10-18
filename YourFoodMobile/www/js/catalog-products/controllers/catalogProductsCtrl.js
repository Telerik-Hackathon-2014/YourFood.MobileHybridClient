'use strict';

app.controller('CatalogProductsCtrl', function ($scope, $rootScope, catalogProductsData, productsCategoriesData, notifier) {

    $rootScope.catalogProductsFilters = {};
    $rootScope.data = 'dfjlghdfjkghdfj';
    $rootScope.tab = $rootScope.tab || {};

    function showAvailableProductsTab() {
        $rootScope.tab.isAvailabeProductsTab = false;
        $rootScope.tab.isCatalogProductsTab = true;
        $rootScope.tab.isRecipesTab = false;
    }

    showAvailableProductsTab();

    function getCatalogProducts(filters) {
        catalogProductsData.getAllCatalogProducts(filters,
            function (data) {
                console.log()
                $rootScope.catalogProducts = data.value;
            })
    }


    function getCategories() {
        productsCategoriesData.getAllProductCategories(
            function (data) {
                $scope.categories = data;
            })
    }

    $scope.sort = function () {
        getCatalogProducts($rootScope.catalogProductsFilters);
    };

    getCatalogProducts($rootScope.catalogProductsFilters);
    getCategories();

});