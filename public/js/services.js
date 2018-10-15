var app = angular.module('serviceModule', [])

// restaurantService
app.service('restaurantService', ['$http', function ($http) {
	var baseUrl = 'http://localhost:3000'


	// list of All Restaurants
	this.listRestaurants = function (id) {
		return $http({
			method: 'GET',
			url: (id) ? baseUrl + '/restaurants/' + id : baseUrl + '/restaurants'
		})
	}

	// add a New Restaurant
	this.addRestaurant = function (data) {
		return $http({
			method: 'POST',
			url: baseUrl + '/addrestaurant',
			data: data
		})
	}
	
	// delete an existing Restaurant
	this.deleteRestaurant = function (id) {
		return $http({
			method: 'DELETE',
			url: baseUrl + '/deleterestaurant/' + id
		})
	}

	// update Restaurant with tables modificaion
	this.updateRestaurant = function (id, data) {
		return $http({
			method: 'PUT',
			url: baseUrl + '/updaterestaurant/' + id,
			data: data
		})
	}
}])

// customerService
app.service('customerService', ['$http', function ($http) {
	var baseUrl = 'http://localhost:3000'

	// find restaurants from search
	this.findRestaurants = function (value) {
		return $http({
			method: 'GET',
			url: baseUrl + '/search/' + value

		})
	}

	// save reviews
	this.sendReview = function (id, data) {
		return $http({
			method: 'PUT',
			url: baseUrl + '/review/' + id,
			data: data
		})
	}
	this.updateBooking = function (id, data) {
		return $http({
			method: 'PUT',
			url: baseUrl + '/updatebooking/' + id,
			data: data
		})
	}

}])