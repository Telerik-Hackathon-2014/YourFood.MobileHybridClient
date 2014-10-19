'use strict';

app.factory('shoppingListData', function ($http, $rootScope, baseUrl, identity, authorization,notifier) {
    var shopListApi = baseUrl + 'api/ShoppingLists',
        headers = {headers: authorization.getAuthorizationHeader()};

    return  {
        getCurrentList: function (success) {
            var currentListUrl = shopListApi;

            $http.get(currentListUrl, headers)
                .success(function (data) {
                    console.dir(data);
                    success(data);
                })
                .error(function (err) {
                    notifier.error("Didn't get recipe categories!");
                    console.dir(err);
                })
        },
        createList: function(success) {
            var newListUrl = shopListApi;

            $http.post(newListUrl, {}, headers)
                .success(function (data) {
                    notifier.success("Successfully created shopping list");
                    success(data);
                })
                .error(function (err) {
                    console.dir(err);
                    notifier.error("Didn't get recipe categories!");
                })
        },
        addToList: function(catalogProduct, success){
            console.log(catalogProduct);
            var availableProduct = {};
            availableProduct.ProductId = catalogProduct.ProductId;
            availableProduct.DateAdded = new Date();
            availableProduct.ExpirationDate = new Date();
            availableProduct.ExpirationDate.setDate(availableProduct.DateAdded.getDate() + catalogProduct.LifetimeInDays);
            console.log(availableProduct);

            $http.post(shopListApi + '(' + 16 + ')', availableProduct, {headers: authorization.getAuthorizationHeader()})
                .success(function (data) {
                    success(data);
                })
                .error(function (err) {
                    console.dir(err);
                    notifier.error('Could not add product to fridge: ' + err);
                });
        }
    }
});