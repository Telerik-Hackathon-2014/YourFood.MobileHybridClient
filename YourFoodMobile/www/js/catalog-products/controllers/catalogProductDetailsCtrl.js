'use strict';

app.controller('CatalogProductDetailsCtrl', function ($scope, $stateParams, $location, catalogProductsData, availableProductsData, shoppingListData) {
    $scope.data = 'CatalogProductDetailsCtrl';
    $scope.catalogProductId = $stateParams.id;

    function GetCurrentCatalogProductById(id) {
        catalogProductsData.getCatalogProductById(id,
            function (data) {
                console.log(data);
                $scope.catalogProduct = data;
            })
    }

    $scope.addToFridge = function () {
        availableProductsData.addCatalogProductToAvailableProducts($scope.catalogProduct,
            function (data) {
                $location.path('/available-products')
            });
    };


    $scope.addToList = function () {
        shoppingListData.addToList($scope.catalogProduct,
            function (data) {
                $location.path('/shopping-list')
            });
    };

    GetCurrentCatalogProductById($scope.catalogProductId);
});