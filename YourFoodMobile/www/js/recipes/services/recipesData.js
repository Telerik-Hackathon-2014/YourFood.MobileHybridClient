'use strict';

app.factory('recipesData',
    function ($http, baseUrl) {
        var recipesApi = baseUrl + 'recipes';

        return {
            getAllRecipes: function (filters, success) {
                var url = recipesApi + '?page=' + (filters.page -1);

                if (filters.category) {
                    url += '&orderByCategory=true';
                }

                if (filters.description) {
                    url += '&orderByDescription=true';
                }

                if (filters.name) {
                    url += '&orderByName=true';
                }

                url += '&sortType=' + filters.sortType;

                $http.get(url)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        console.log('Could not get recipes')
                    })
            },
            getRecipeById: function (id, success) {
                $http.get(recipesApi + '/' + id)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        console.log('Could not get the recipe you wanted :(');
                    })
            }
        }
    });