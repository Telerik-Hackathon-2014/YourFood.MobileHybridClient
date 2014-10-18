'use strict';

app.controller('ShoppingListCtrl', function ($scope, $rootScope, identity) {
    function hideTabs () {
        $rootScope.tab.isAvailabeProductsTab = false;
        $rootScope.tab.isCatalogProductsTab = false;
        $rootScope.tab.isRecipesTab = false;
    }

    hideTabs();


    $scope.addProduct = function () {
        alert('Here!');
    }

});