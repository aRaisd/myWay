//Option 1

/*app.controller('customersController', function ($scope) {
    'use strict';
    $scope.sortBy = 'name';
    $scope.reverse = false;

    $scope.customers= [{joined: '2000-12-02', name:'John', city:'Chandler', orderTotal: 9.9956}, {joined: '1965-01-25',name:'Zed', city:'Las Vegas', orderTotal: 19.99},{joined: '1944-06-15',name:'Tina', city:'New York', orderTotal:44.99}, {joined: '1995-03-28',name:'Dave', city:'Seattle', orderTotal:101.50}];
    $scope.doSort = function(propName) {
       $scope.sortBy = propName;
       $scope.reverse = !$scope.reverse;
    };
});*/

//Option 2

/*(function() {

    angular.module('customersApp')
      .controller('customersController', function ($scope) {
        $scope.sortBy = 'name';
        $scope.reverse = false;

        $scope.customers= [{joined: '2000-12-02', name:'John', city:'Chandler', orderTotal: 9.9956}, {joined: '1965-01-25',name:'Zed', city:'Las Vegas', orderTotal: 19.99},{joined: '1944-06-15',name:'Tina', city:'New York', orderTotal:44.99}, {joined: '1995-03-28',name:'Dave', city:'Seattle', orderTotal:101.50}];
        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };
    });

}());*/

//Option 3

(function () {
	'use strict';
	var customersController = function ($scope, $log, customersFactory, appSettings) {
		$scope.sortBy = 'name';
		$scope.reverse = false;
		$scope.customers = [];
		$scope.appSettings = appSettings;

		function init() {
			//making synchronous call
			//$scope.customers = customersFactory.getCustomers();
			
			//making asynchronous call, getting back a promise, chained with a Success or error call
			customersFactory.getCustomers()
				.success(function (customers) {
					$scope.customers = customers;
				})
				.error(function (data, status, headers, config) {
					$log.log(data.error + ' ' + status);
				});
		}

		init();

		$scope.doSort = function (propName) {
			$scope.sortBy = propName;
			$scope.reverse = !$scope.reverse;
		};
		
		$scope.deleteCustomer = function (custmerId) {
			coustomersFactory.deleteCustomer(custmerId)
				.success(function (status) {
					if (status) {
						for (var i = 0; i < $scope.customers.length; i++) {
							if ($scope.customers[i].id === customerId) {
								$scope.customers.splice(i,1);
								break;
							}
						}
					}
					else {
						$window.alert('Unable to delete customer!');
					}
			})
		}
	};

	customersController.$inject = ['$scope', '$log', 'customersFactory', 'appSettings'];

	angular.module('customersApp').controller('customersController',  customersController);

}());