'use strict';

app.controller('RecipesCtrl',
    function ($scope, $location, recipesData, identity, recipesCategoriesData) {
        if (!identity.isAuthenticated()) {
            $location.path('/login');
            return;
        }

        $scope.recipeFilter = {};

        $scope.isLogged = identity.isAuthenticated();

        function getRecipes() {
            recipesData.getAllRecipes(
                $scope.recipeFilter,
                function (data) {
                    $scope.recipes = data.value;
                });
        }

        function getCategories() {
            recipesCategoriesData.getAllRecipeCategories(
                function (data) {
                    $scope.categories = data;
                })
        }

        $scope.sort = function () {
            getRecipes();
        };

        getRecipes();
        getCategories();
    });