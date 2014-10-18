'use strict';

app.factory('recipesData',
    function ($http, baseUrl, notifier) {
        var recipesApi = baseUrl + 'api/Recipes';

        return {
            getAllRecipes: function (filters, success) {
                var searchFilters = '?$expand=Category';

                if (filters.categoryName) {
                    searchFilters += '&$orderby=Category/Name';
                }

                if (filters.name) {
                    searchFilters += '&$orderby=Name';
                }



                $http.get(recipesApi + searchFilters)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get recipes');
                    });
            },
            getRecipeById: function (id, success) {
                var addon = '(' + id + ')?$expand=Category';

                $http.get(recipesApi + addon)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get catalog product by id');
                    })
            }
        }
    });