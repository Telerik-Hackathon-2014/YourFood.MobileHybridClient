'use strict';

app.controller('CatalogProductsCtrl', function ($scope, catalogProductsData, notifier) {

    $scope.filters = {};

    function GetCatalogProducts(filters) {
        catalogProductsData.getAllCatalogProducts(filters,
            function (data) {
                $scope.catalogProducts = data.value;
            })
    }

    $scope.getCatalogProducts = function () {
        GetCatalogProducts($scope.filters);
    };

    GetCatalogProducts($scope.filters);

});