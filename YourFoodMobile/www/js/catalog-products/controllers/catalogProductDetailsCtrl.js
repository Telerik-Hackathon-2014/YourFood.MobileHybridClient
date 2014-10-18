'use strict';

app.controller('CatalogProductDetailsCtrl', function ($scope, $stateParams, catalogProductsData) {
    $scope.data = 'CatalogProductDetailsCtrl';
    $scope.catalogProductId = $stateParams.id;

    function GetCurrentCatalogProductById(id) {
        catalogProductsData.getCatalogProductById(id,
            function (data) {
                console.log(data);
                $scope.catalogProduct = data;
            })
    }

    GetCurrentCatalogProductById($scope.catalogProductId);

});