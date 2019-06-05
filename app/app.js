(function () {
	'use strict';
// test
	// var app = angular.module('customersApp', ['ngRoute', 'ngAnimate']);
	// app.config(function ($routeProvider) {
	// 	$routeProvider
	// 		.when('/', {
	// 			controller: 'customersController',
	// 			templateUrl: 'app/views/customers.html'
	// 		})
	// 		.when('/orders/:customerId', {
	// 			controller: 'OrdersController',
	// 			templateUrl: 'app/views/orders.html'
	// 		})
	// 		.when('/orders', {
	// 			controller: 'allOrdersController',
	// 			templateUrl: 'app/views/allorders.html'
	// 		})
	// 		.otherwise( { 
	// 			redirectTo: '/' 
	// 		});
	// });
	angular
		.module('customersApp', ['auth0.auth0', 'ui.router'])
		.config(config);

	config.$inject = [
		'$stateProvider', '$locationProvider', '$urlRouterProvider', 'angularAuth0Provider'
	];


	function config(
		$stateProvider,
		$locationProvider,
		$urlRouterProvider,
		angularAuth0Provider
	) {
		$stateProvider
			.state('home', {
				url: '/',
				controller: 'homeController',
				templateUrl: 'app/home/home.html',
				controllerAs: 'vm'
			})
			.state('callback', {
				url: '/callback',
				controller: 'callbackController',
				templateUrl: 'app/callback/callback.html',
				controllerAs: 'vm'
			});

		$urlRouterProvider.otherwise('/');

		$locationProvider.hashPrefix('');

		$locationProvider.html5Mode(true);
	}


})();