var app = angular.module('controllerModule', ['serviceModule', 'ngRoute'])



app.controller('restaurantCtrl', ['$scope', '$http', 'restaurantService', function ($scope, $http, restaurantService) {
	$scope.restaurants = []


	// get the list of all restaurants
	$scope.getAllRestaurants = function () {
		restaurantService.listRestaurants().then(function (res) {
			$scope.restaurants = res.data
		})
	}

	// initialize 
	$scope.getAllRestaurants()


	$scope.particular = []
	$scope.editRestaurant = function (id) {
		console.log('From Edit: ', id)
		restaurantService.listRestaurants(id).then(function (success) {
			$scope.particular = success.data
			console.log('particualar Restaurant is:\n', $scope.particular)
		})

	}

	// save one restaurant
	$scope.saveRestaurant = function (info) {

		// data for a particualar restaurant
		var data = angular.extend(info, { "tables": $scope.tables }, { "reviews": [{ "name": 'Anonymous', "reviews": " said: ok" }] }, { "bookings": [{ "name": $scope.tables[0]['id'], "date": new Date() }] })

		console.log('data before add', data)

		restaurantService.addRestaurant(data).then(function (success) {

			// call to get the updated listing after addition
			$scope.getAllRestaurants()
		})

		// empty the fields to make ready for a new insert
		$scope.tables = []
		$scope.name = ''
		$scope.capacity = ''
		$scope.restaurantInfo = {}
	}



	// add tables to a restaurant
	$scope.tables = []
	$scope.addTable = function (mode) {
		$scope.tables.push({ "id": $scope.name || $scope.nameEdit, "capacity": $scope.capacity || $scope.capacityEdit })
		console.log($scope.tables)
	}


	// delete a restaurant
	$scope.deleteRestaurant = function (id) {
		console.log('from delete: --> ', id)
		restaurantService.deleteRestaurant(id).then(function (success) {
			$scope.getAllRestaurants()
		})
	}

	// tablesModified contains both modified/ deleted values
	$scope.tablesModified = {}

	// change capacity of tables
	$scope.changeTable = function (id, index) {
		var value = document.getElementById(id).value

		$scope.particular[0].tables[index]['capacity'] = value
		$scope.tablesModified[id] = { "capacity": value }

	}
	// delete a table
	$scope.deleteTable = function (id, index) {
		var value = document.getElementById(id).value
		$scope.particular[0].tables.splice(index, 1)
	}

	// save all the modification to tables so far
	$scope.saveTable = function (restaurantId) {		

		// for tables which are added
		for (var j = 0; j < $scope.tables.length; j++) {
			$scope.particular[0].tables.push($scope.tables[j])
		}

		console.log('Particualr inside save function after modify', $scope.particular[0])

		restaurantService.updateRestaurant(restaurantId, $scope.particular[0].tables).then(function (success) {

			// call to see the updated data
			$scope.getAllRestaurants()
		})

		$scope.particular = {}
		$scope.nameEdit = ''
		$scope.capacityEdit = ''
		$scope.tables = []
	}
}])


