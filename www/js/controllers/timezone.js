angular.module('controllers.timezone', [])

.controller('AppCtrl', function ($scope, $localStorage,$ionicPopup) {

    $scope.logout = function(){
        $localStorage.$reset();
    }
})

.controller('TimezoneCtrl', function ($scope, $state, Restangular) {

    $scope.save = function(){
        if($scope.timezone.id){
            $scope.timezone.save().then(function(response){
                $scope.modal.remove();
            })
        }else{
            $scope.list.post($scope.timezone).then(function(response){
                $scope.list.push(response);
                $scope.modal.remove();
            });
        }
    }
})

.controller('ListCtrl', function ($scope, $list, $ionicModal,$ionicListDelegate) {
    $scope.hasMore = true;
    $scope.perPage = 25;
    $scope.currentPage = 1;

    $scope.list = $list;

    $scope.shouldShowDeleted = false;
    $scope.shouldShowEdited = false;

    $scope.toggleDeleted = function(){
         $scope.shouldShowDeleted = !$scope.shouldShowDeleted;
         $ionicListDelegate.showDelete($scope.shouldShowDeleted);
    }

    $scope.toggleEdited = function(){
         
         $scope.shouldShowEdited = !$scope.shouldShowEdited;
         $ionicListDelegate.showReorder($scope.shouldShowEdited);
    }

    $scope.$watch('query', function () {
        if ($scope.query) {
            $list.getList({q: $scope.query}).then(function(response){
                $scope.list = response;
            });
        } else {
            $scope.list = $list;
        }
    });

    $scope.add = function(){
        $ionicModal.fromTemplateUrl('/templates/app/timezone.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.timezone = {difference: 0};
            $scope.modal.show();
        });
    };

    $scope.edit = function(timezone){
        $ionicModal.fromTemplateUrl('/templates/app/timezone.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.timezone = timezone;
            $scope.slider = timezone.difference * 2;
            $scope.modal.show();
        });
    }

    $scope.delete = function(timezone){
        timezone.remove().then(function(response){
            timezone.deleted_at = 'yes';
        })
    }

    $scope.hasMoreData = function(){
        return $scope.hasMore;
    };

    $scope.more = function(){
        var params = {p: ++$scope.currentPage}
        if($scope.query){
            params['q'] = $scope.query;
        }

        $list.getList(params).then(function(response){
            if(response.length < $scope.perPage){
                $scope.hasMore = false;
            }
            angular.forEach(response,function(item,key){
                $scope.list.push(item);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.more();
    });
})



