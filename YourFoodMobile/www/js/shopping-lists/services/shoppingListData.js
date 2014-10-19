'use strict';

app.factory('shoppingListData', function ($http, $rootScope, baseUrl, identity, authorization, notifier) {
    var shopListApi = baseUrl + 'api/ShoppingLists',
        headers = {headers: authorization.getAuthorizationHeader()};

    return  {
        getCurrentList: function (success) {
            var currentShoppingList = localStorage.getItem('currentShoppingList');
            var parsed = JSON.parse(currentShoppingList);

            success(parsed);

//            var currentListUrl = shopListApi;
//
//            $http.get(currentListUrl, headers)
//                .success(function (data) {
//                    console.dir(data);
//                    success(data);
//                })
//                .error(function (err) {
//                    notifier.error("Didn't get recipe categories!");
//                    console.dir(err);
//                })
        },
        createList: function (success) {
            var initialList = {listOfProducts: []};
            localStorage.setItem('currentShoppingList', JSON.stringify(initialList));

            success(JSON.parse(localStorage.getItem('currentShoppingList')));

//            var newListUrl = shopListApi;
//            $http.post(newListUrl, {}, headers)
//                .success(function (data) {
//                    notifier.success("Successfully created shopping list");
//                    success(data);
//                })
//                .error(function (err) {
//                    console.dir(err);
//                    notifier.error("Didn't get recipe categories!");
//                })
        },
        addToList: function (catalogProduct, success) {
            var currentShoppingList = JSON.parse(localStorage.getItem('currentShoppingList'));

            console.log(catalogProduct);
//            var availableProduct = {};
//            availableProduct.Product = catalogProduct;
//            availableProduct.ProductId = catalogProduct.ProductId;
//            availableProduct.DateAdded = new Date();
//            availableProduct.ExpirationDate = new Date();
//            availableProduct.ExpirationDate.setDate(availableProduct.DateAdded.getDate() + catalogProduct.LifetimeInDays);

            currentShoppingList.listOfProducts.push(catalogProduct);
            localStorage.setItem('currentShoppingList', JSON.stringify(currentShoppingList));
            console.log(availableProduct);

//            $http.post(shopListApi + '(' + 16 + ')', availableProduct, {headers: authorization.getAuthorizationHeader()})
//                .success(function (data) {
//                    success(data);
//                })
//                .error(function (err) {
//                    console.dir(err);
//                    notifier.error('Could not add product to fridge: ' + err);
//                });
        },
        removeFromList: function (id) {
            var currentShoppingList;
            this.getCurrentList(function (data) {
                currentShoppingList = data;
            });
            var index = currentShoppingList.listOfProducts.map(function (p) {
                return  p.ProductId;
            }).indexOf(id);

            currentShoppingList.listOfProducts.splice(index,1);
            localStorage.setItem('currentShoppingList', JSON.stringify(currentShoppingList));
        }
    }
});