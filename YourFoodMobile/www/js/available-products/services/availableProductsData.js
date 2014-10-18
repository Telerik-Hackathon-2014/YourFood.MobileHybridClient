'use strict';

app.factory('availableProductsData',
    function ($http, identity, authorization, baseUrl, notifier) {
        var productsApi = baseUrl + 'api/AvailabilityProducts',
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
                    searchFilters += '&$filter=Product/CategoryId eq ' + filters.categoryId;
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
            addCatalogProductToAvailableProducts: function (catalogProduct, success) {

//                Id, ExpirationData(DateAdded + CatalogProduct.LifeTime), ProductId= CatalogProduct.Id
                var availableProduct = {};
                availableProduct.ProductId = catalogProduct.Id;
                availableProduct.DateAdded = new Date();
                availableProduct.ExpirationDate = new Date();
                availableProduct.ExpirationDate.setDate(availableProduct.DateAdded.getDate() + catalogProduct.LifetimeInDays);
                console.log(availableProduct);

                $http.post(productsApi, availableProduct, headers)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not add product to fridge: ' + err);
                    });
            }
        }
    });