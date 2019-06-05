/*(function() {
    'use strict';

	var OrdersController = function ($scope, $routeParams) {
		var customerId = $routeParams.customerId;
		$scope.orders = null;
		
		function init(){
			for (var i = 0; i < $scope.customers.length; i++){
				if ($scope.customers[i].id === parseInt(customerId)){
					$scope.customers.orders.id = $scope.customers[i].id;
					break;
				}
			}
		}
		
		$scope.customers = [{
			id: 1,
			joined: '2000-12-02',
			name: 'John',
			city: 'Chandler',
			orderTotal: 9.9956,
			orders: [{
				id: 1,
				product: 'Shoes',
				total: '9.9956'
			}]
		}, {
			id: 2,
			joined: '1965-01-25',
			name: 'Zed',
			city: 'Las Vegas',
			orderTotal: 19.99,
			orders: [{
				id: 2,
				product: 'hat',
				total: 19.99
			}]
		}, {
			id: 3,
			joined: '1944-06-15',
			name: 'Tina',
			city: 'New York',
			orderTotal: 44.99,
			orders: [{
				id: 3,
				product: 'Cap',
				total: 44.99
			}]
		}, {
			id: 4,
			joined: '1995-03-28',
			name: 'Dave',
			city: 'Seattle',
			orderTotal: 101.50,
			orders: [{
				id: 4,
				product: 'Boots',
				total: 101.50
			}]
		}];
		
		init();
	};

	OrdersController.$inject = ['$scope','$routeParams'];

	angular.module('customersApp')
		.controller('OrdersController', OrdersController);

}());*/
(function () {
	'use strict';

	var allOrdersController = function ($scope, customersFactory) {
		$scope.orders = null;
		$scope.ordersTotal = 0.0;
		$scope.totalType;

		function getOrdersTotal() {
			var total = 0;
			for (var i = 0; i < $scope.orders.length; i++) {
				total += $scope.orders[i].total;
			}
			$scope.ordersTotal = total;
			$scope.totalType = ($scope.ordersTotal > 100) ? 'success' : 'danger';
		}
		
		
		function init() {
			customersFactory.getOrders()
				.success(function (orders) {
					$scope.orders = orders;
					getOrdersTotal();
				})
				.error(function (data, status, headers, config) {
					//handle error
				});
		}
		
		init();
	};

	allOrdersController.$inject = ['$scope', 'customersFactory'];

	angular.module('customersApp')
		.controller('allOrdersController', allOrdersController);

}());