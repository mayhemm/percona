var app = angular.module("percona", [
    "ngRoute",
    "percona.controllers"
]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/", { controller: "HomeController", templateUrl: "partials/home.html" }).
        otherwise({ redirectTo: "/" });
}]);
