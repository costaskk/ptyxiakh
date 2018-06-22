var myApp = angular.module('myApp');

myApp.controller('MenuController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('MenuController Loaded');
    $scope.getBooks = function(){
        $http.get('/menu_items').success(function(response){
            $scope.books = response;
        });
    }
}]);