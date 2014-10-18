'use strict';

app.factory('availableProductsData',
    function ($http, identity, authorization, baseUrl, notifier) {
        var productsApi = baseUrl + '/api/AvailabilityProducts',
            headers = {headers: authorization.getAuthorizationHeader()};

        return{
            getAllAvailableProducts: function (filters, success) {
                var searchFilters = '?$expand=Product&$expand=Product/Category';

                if (filters.name == 'true') {
                    searchFilters += '&$orderby=Product/Name';
                }
                if (filters.timeleft == 'true') {
                    searchFilters += '&$orderby=ExpirationDate'
                }
                if (filters.categoryId) {
                    searchFilters += '&filter=Product/CategoryId eq ' + filters.categoryId;
                }

                $http.get(productsApi + searchFilters, headers)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get catalog products' + err);
                    });
            },
            getProductById: function (id, success) {
                var addon = '(' + id + ')/Product?$expand=Category';

                $http.get(productsApi + addon, headers)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get catalog product by id');
                    })
            },
            addToAvailableProducts: function (product, success) {

                $http.post(productsApi, product, headers)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not add product to fridge: ' + err);
                    });
            }
        }
    });