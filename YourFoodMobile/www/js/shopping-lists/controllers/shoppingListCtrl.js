'use strict';

app.controller('ShoppingListCtrl', function ($scope, $rootScope, shoppingListData, identity) {
    function hideTabs () {
        $rootScope.tab.isAvailabeProductsTab = false;
        $rootScope.tab.isCatalogProductsTab = false;
        $rootScope.tab.isRecipesTab = false;
    }

    hideTabs();

//    $scope.addProduct = function () {
//        alert('Here!');
//    };

    function getShoppingList() {
        shoppingListData.getCurrentList(function (data) {
                $rootScope.currentShopList = data.value;
                if ( $rootScope.currentShopList ) {
                    createList();
                }
            });
    }

    function createList() {
        shoppingListData.createList(function(list){
            $rootScope.currentShopList = list;
            console.log(list);
        })
    }


    createList();
    getShoppingList();
});