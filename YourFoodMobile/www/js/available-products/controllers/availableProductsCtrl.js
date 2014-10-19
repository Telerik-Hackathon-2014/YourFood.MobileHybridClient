'use strict';

app.controller('AvailableProductsCtrl', function ($scope, $rootScope, $location, availableProductsData, identity, productsCategoriesData) {
    if (!identity.isAuthenticated()) {
        $location.path('/home');
        return;
    }

    var one_day = 1000 * 60 * 60 * 24;
    $rootScope.availableProductsFilters = {};
    $rootScope.tab = $rootScope.tab || {};

    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();


    function showAvailableProductsTab() {
        $rootScope.tab.isAvailabeProductsTab = true;
        $rootScope.tab.isCatalogProductsTab = false;
        $rootScope.tab.isRecipesTab = false;
    }

    $scope.numColumns = [];
    $scope.numColumns.length = 4;

    function getProducts(filters) {
        availableProductsData.getAllAvailableProducts(filters,
            function (data) {
                $rootScope.availableProducts = [];
                for (var i = 0; i < data.value.length; i += 1) {
                    var product = data.value[i];

                    var dateExpiring = new Date(product.ExpirationDate);
                    var dateAdded = new Date(product.DateAdded);
                    var currentTime = new Date();

                    // Calculate the difference in milliseconds
                    var timeDiff = dateExpiring.getTime() - currentTime.getTime();
                    var timeDiffLifetimeInDays = dateExpiring.getTime() - dateAdded.getTime();

                    // Convert back to days and return
                    var freshness = Math.round(timeDiff / one_day);
                    var lifetimeInDays = Math.round(timeDiffLifetimeInDays / one_day);
                    var percent = freshness / lifetimeInDays * 100;

                    product.freshness = freshness;
                    product.lifetimeInDays = lifetimeInDays;
                    product.lifetimePercent = 100 - percent;

                    $rootScope.availableProducts.push(product);
                }
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