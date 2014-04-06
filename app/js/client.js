/**
 * My Client Application
 */
angular.module('client', ['stripe'])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        'use strict';
        $scope.mySillyText = "Welcome to Brian's Awesome Products";
        $scope.saveCustomer = function stripeResponseHandler(status, response) {
            if (response.error) {
                // show the errors on the form
                $(".payment-errors").text(response.error.message);
            } else {
                var token = response.id;
                $http.post('/stripe', {stripeToken: token});
            }
        };
    }]).run([function () {
        Stripe.setPublishableKey('pk_test_Cg7dxMFhOjXhdtows9LKrvbN');
    }]);