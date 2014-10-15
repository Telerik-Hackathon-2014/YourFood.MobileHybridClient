var app = angular.module('app', ['ionic', 'ngRoute', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('recipes', {
                url: "/recipes",
                templateUrl: "templates/recipes/recipes.html",
                controller: 'RecipesCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "templates/account/login.html",
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "templates/account/signup.html",
                controller: 'SignUpCtrl'
            })
            .state('tabs.products', {
                url: "/products",
                views: {
                    'products-tab': {
                        templateUrl: "templates/products/products.html",
                        controller: 'ProductsCtrl'
                    }
                }
            })
            .state('tabs.product', {
                url: "/products/:id",
                views: {
                    'products-tab': {
                        templateUrl: "templates/products/product-details.html",
                        controller: 'ProductDetailsCtrl'
                    }
                }
            })
            .state('tabs.recipes', {
                url: "/recipes",
                views: {
                    'recipes-tab': {
                        templateUrl: "templates/recipes/recipes.html",
                        controller: 'RecipesCtrl'
                    }
                }
            })
            .state('tabs.recipe', {
                url: "/recipes/:id",
                views: {
                    'recipes-tab': {
                        templateUrl: "templates/recipes/recipe-details.html",
                        controller: 'RecipeDetailsCtrl'
                    }
                }
            })
            //-------------------------------------------
            .state('tabs.facts', {
                url: "/facts",
                views: {
                    'home-tab': {
                        templateUrl: "ftemplates/acts.html"
                    }
                }
            })
            .state('tabs.facts2', {
                url: "/facts2",
                views: {
                    'home-tab': {
                        templateUrl: "templates/facts2.html"
                    }
                }
            })
            .state('tabs.about', {
                url: "/about",
                views: {
                    'about-tab': {
                        templateUrl: "templates/about.html"
                    }
                }
            })
            .state('tabs.navstack', {
                url: "/navstack",
                views: {
                    'about-tab': {
                        templateUrl: "templates/nav-stack.html"
                    }
                }
            });

        $urlRouterProvider.otherwise("/tab/products");

    })
    .constant('baseUrl', 'http://yourfood-services.apphb.com/')
    .constant('author', 'YourFoodTm')
    .constant('copyright', 'YourFoodTm')
    .controller('HomeTabCtrl', function ($scope) {
    });