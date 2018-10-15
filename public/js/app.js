
var app = angular.module('app', ['serviceModule', 'controllerModule', 'customerModule', 'ngRoute'])


app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "../pages/home.html"
		})
		.when("/restaurant", {
			templateUrl: "../pages/restaurants.html",
			controller: 'restaurantCtrl'

		})
		.when("/reservation", {
			templateUrl: "../pages/reservation.html",
			controller: 'customerCtrl'
		})
		.when('/editrestaurant', {
			templateUrl: "../pages/editRestaurant.html"
		})
})

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});