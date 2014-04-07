/**
 * My Client Application
 */
angular.module('client', [])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        'use strict';
        $scope.mySillyText = "Welcome to Laura's Awesome Products";
        $scope.priceMessage = "";
        $scope.bikeColor = "";

        $scope.popAlert = function () {
            alert('hello');
        };
        $scope.checkPrice = function (bikeColor) {
            $scope.bikeColor = bikeColor;
            $http.get('/checkPrice', {params: {bikeColor: bikeColor}})
                .success(function (response) {
                    $scope.priceMessage = response.availability;
                });

        };

    }]).
    run([function () {

    }]);