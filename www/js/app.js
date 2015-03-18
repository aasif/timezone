// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('toptal', ['ionic','controllers.session', 'controllers.timezone', 'toptal.directives', 'ngStorage','restangular'])

.run(function($ionicPlatform,$rootScope, $localStorage, $http, $state, $timeout, $window, Restangular) {

  $rootScope.$storage = $localStorage;
  $rootScope.moment = moment; 

  $rootScope.app = {
    apiURL : 'http://api.toptal.dev',
    name: "Toptal"
  };

  
  $rootScope.$watch("$storage.user.token", function(){
      console.log($localStorage.user);

      if($localStorage.user && $localStorage.user.token){
        $http.defaults.headers.common['token'] = $localStorage.user.token;
        $state.go('app.home');
      }else{
        $state.go('session.login').then(function(){
          $timeout(function(){
              $window.location.reload(true);
          },100);
          
        });
      }
  });

  Restangular.setBaseUrl($rootScope.app.apiURL);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });




})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');

  $stateProvider

  .state('session',{
    url: "/session",
    templateUrl: "templates/session.html",
  })

  .state('session.login',{
    url: "/login",
    templateUrl: "templates/session/login.html",
    controller: 'LoginCtrl'
  })

  .state('session.verify',{
    url: "/verify",
    templateUrl: "templates/session/verify.html",
    controller: 'VerifyCtrl'
  })

  .state('session.reset',{
    url: "/reset/:email",
    templateUrl: "templates/session/reset.html",
    controller: 'ResetCtrl'
  })

  .state('session.register',{
    url: "/register",
    templateUrl: "templates/session/register.html",
    controller: 'RegisterCtrl'
  })

  .state('app',{
    url: "/app",
    templateUrl: "templates/app.html"
  })

  .state('app.home',{
    url: '/home',
    templateUrl: "templates/app/home.html",
    controller: "ListCtrl",
    resolve: {
      $list: function(Restangular){
        return Restangular.all('timezone').getList();
      }
    }
  })
  $urlRouterProvider.otherwise('session/login');
})


.factory('httpInterceptor', function ($q, $rootScope,$injector) {
    return {
        'request': function (config) {
            $injector.get("$ionicLoading").show({
              template: 'Loading...'
            });
            return config || $q.when(config);
        },
        'response': function(response) {
            $injector.get("$ionicLoading").hide();
            return response;
        },
        'requestError': function (rejection) {
            $injector.get("$ionicLoading").hide();
            return $q.reject(rejection);
        },
        'responseError': function (rejection) {
            $injector.get("$ionicLoading").hide();

            switch(rejection.status){
              case 401:
                  $injector.get('$state').go('session.login');
                  location.reload();
                  break;
              default:
                  $injector.get("$ionicPopup").alert({
                     title: 'Error!',
                     template: rejection.data.message,
                     okType: 'button-assertive error-button'
                  });
            }            
            
            return $q.reject(rejection);
        }
    };
})

