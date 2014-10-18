'use strict';

app.controller('RecipesCtrl',
    function ($scope, $rootScope, $location, recipesData, identity, recipesCategoriesData) {
        if (!identity.isAuthenticated()) {
            $location.path('/login');
            return;
        }

        $rootScope.recipeFilter = {};

        $scope.isLogged = identity.isAuthenticated();

        function getRecipes() {
            recipesData.getAllRecipes(
                $rootScope.recipeFilter,
                function (data) {
                    $rootScope.recipes = data.value;
                });
        }

        function getCategories() {
            recipesCategoriesData.getAllRecipeCategories(
                function (data) {
                    $rootScope.categories = data;

                })
        }

        $scope.sort = function () {
            recipesData.getAllRecipes(
                $rootScope.recipeFilter,
                function (data) {
                    $rootScope.recipes = data.value;
                });
        };

        getRecipes();
        getCategories();
    });