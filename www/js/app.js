var app = angular.module('app', ['ionic', 'ngRoute', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "www/templates/tabs.html"
        })
        .state('recipes', {
            url: "/recipes",
            templateUrl: "www/templates/recipes/recipes.html",
            controller: 'RecipesCtrl'
        })
        .state('login', {
            url: "/login",
            templateUrl: "www/templates/account/login.html",
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: "/signup",
            templateUrl: "www/templates/account/signup.html",
            controller: 'SignUpCtrl'
        })
        .state('stats', {
            url: "/stats",
            templateUrl: "www/templates/profile/stats.html"
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "www/templates/profile/profile.html",
            controller: 'ProfileCtrl'
        })
        .state('catalog-products', {
            url: "/catalog-products",
            templateUrl: "www/templates/catalog-products/catalog-products.html",
            controller: 'CatalogProductsCtrl'
        })
        .state('catalog-product-details', {
            url: "/catalog-products/:id",
            templateUrl: "www/templates/catalog-products/catalog-product-details.html",
            controller: 'CatalogProductDetailsCtrl'
        })
        .state('tabs.products', {
            url: "/products",
            views: {
                'products-tab': {
                    templateUrl: "www/templates/products/products.html",
                    controller: 'ProductsCtrl'
                }
            }
        })
        .state('tabs.product', {
            url: "/products/:id",
            views: {
                'products-tab': {
                    templateUrl: "www/templates/products/product-details.html",
                    controller: 'ProductDetailsCtrl'
                }
            }
        })
        .state('tabs.recipes', {
            url: "/recipes",
            views: {
                'recipes-tab': {
                    templateUrl: "www/templates/recipes/recipes.html",
                    controller: 'RecipesCtrl'
                }
            }
        })
        .state('tabs.recipe', {
            url: "/recipes/:id",
            views: {
                'recipes-tab': {
                    templateUrl: "www/templates/recipes/recipe-details.html",
                    controller: 'RecipeDetailsCtrl'
                }
            }
        })
        .state('tabs.shopping-list', {
            url: "/shopping-list",
            views: {
                'shopping-list-tab': {
                    templateUrl: "www/templates/shopping-lists/shopping-list.html",
                    controller: 'ShoppingListCtrl'
                }
            }
        })
        // ---- Admin part
        .state('create-product', {
            url: "/create-product",
            templateUrl: "www/templates/admin/products/create-product.html",
            controller: 'AdminCreateProductCtrl'
        })
        .state('create-products-category', {
            url: "/create-products-category",
            templateUrl: "www/templates/admin/products/create-products-category.html",
            controller: 'AdminCreateProductsCategoryCtrl'
        })
        .state('create-recipe', {
            url: "/create-recipe",
            templateUrl: "www/templates/admin/recipes/create-recipe.html",
            controller: 'AdminCreateRecipeCtrl'
        })
        .state('create-recipes-category', {
            url: "/create-recipes-category",
            templateUrl: "www/templates/admin/recipes/create-recipes-category.html",
            controller: 'AdminCreateRecipesCategoryCtrl'
        })

    $urlRouterProvider.otherwise("/tab/products");

})
    .constant('baseUrl', 'http://yourfood-services.apphb.com/')
    .constant('author', 'YourFoodTm')
    .constant('copyright', 'YourFoodTm')
    .controller('HomeTabCtrl', function ($scope) {
    });