angular.module('controllers.session', [])

.controller('RegisterCtrl', function ($scope, $http, $state) {
    $scope.user = {};

    $scope.register = function () {
        $http.post($scope.app.apiURL + "/register", $scope.user).
            success(function (response) {
                $scope.$storage.user = response;
                $scope.user = {};
                $state.go("session.verify");
            });
    }
})

.controller('LoginCtrl', function ($scope, $state, $http) {
    $scope.user = {};

    $scope.login = function(){
        $http.post($scope.app.apiURL + "/login", $scope.user).
            success(function(response){
                $scope.$storage.user = response;
                $scope.user = {};
            });
    }

    $scope.forgotPassword = function(){
        $http.post($scope.app.apiURL + "/forgot", $scope.user).
            success(function(response){
                $state.go('session.reset',{email: $scope.user.email});
            })
    }
})

.controller('VerifyCtrl', function ($scope, $state, $http) {
    $scope.user = $scope.$storage.user;

    $scope.verify = function(){
        $http.post($scope.app.apiURL + "/verify", $scope.user).
            success(function(response){
                $scope.$storage.user = response;
                $scope.user = {};
            });
    }
   
})

.controller('ResetCtrl', function ($scope, $state, $stateParams, $http) {
    $scope.user = {email: $stateParams.email};

    $scope.reset = function(){
        $http.post($scope.app.apiURL + "/reset", $scope.user).
            success(function(response){
                $scope.$storage.user = response;
                $scope.user = {};
            });
    }
   
})
