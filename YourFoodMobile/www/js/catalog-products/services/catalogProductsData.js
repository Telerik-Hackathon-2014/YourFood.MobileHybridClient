'use strict';

app.factory('catalogProductsData', function ($http, baseUrl, authorization, notifier) {
    var catalogProductsApi = baseUrl + 'api/CatalogProducts',
        headers = {headers: authorization.getAuthorizationHeader()};

    return {

        getAllCatalogProducts: function (filters, success) {

            var searchFilters = '?$expand=Product&$expand=Product/Category';

            if (filters.name == "true") {
                searchFilters += '&$orderby=Product/Name';
            }
            if (filters.category == "true") {
                searchFilters += '&$orderby=Product/Category/Name';
            }
            if (filters.lifetime == "true") {
                searchFilters += '&$select=LifetimeInDays';
            }
            if (filters.categoryId) {
                searchFilters += '&$filter=Product/CategoryId eq ' + filters.categoryId;
            }
            if (filters.searchName) {
                searchFilters += '&$filter=Product/Name eq ' + filters.searchName;
            }

            $http.get(catalogProductsApi + searchFilters, headers)
                .success(function (data) {
                    success(data);
                })
                .error(function (err) {
                    notifier.error('Could not get products! + ' + err);
                })
        },
        getCatalogProductById: function (id, success) {
            var queryAddon = '(' + id + ')?$expand=Product/Category';

            $http.get(catalogProductsApi + queryAddon, headers)
                .success(function (data) {
                    success(data);
                })
                .error(function (err) {
                    notifier.error("Didn't get product by id! : " + err);
                })
        },
        createCatalogProduct: function (product) {
            // TODO: Implement when seen to be needed
        },
        updateCatalogProductById: function (id, product) {
            // TODO: Implement when seen to be needed
        }
    }

});