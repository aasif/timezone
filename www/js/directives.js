angular.module('toptal.directives', [])

.filter('timezone',function(){
    return function(value){
        var sign = value < 0 ? "-" : "+";
        var hour = value ? Math.floor(Math.abs(value/2)) : 0;
        var minutes = (value/2 * 10)%10 ? "30" : "00";
        return sign + hour + ":" + minutes;
    }
})

.filter('tformat',function(){
    return function(value){
        var sign = value < 0 ? "-" : "+";
        var hour = value ? Math.floor(Math.abs(value)) : 0;
        var minutes = (value * 10)%10 ? "30" : "00";
        return sign + hour + ":" + minutes;
    }
})

.directive('currentTime',function($interval){
    return {
        template: "<h1>{{showTime()}}</h1> <span class='text-md'>{{format('Do MMMM')}}</span>",
        link: function(scope,element){

            scope.getZone = function(){ 
                return (-1) * scope.timezone.difference * 60; 
            };

            scope.format = function(format){
                var zone = scope.getZone();
                return moment().zone(zone).format(format);
            };

            scope.showTime = function(){
                return scope.format('hh:mma');
            }

            $interval(function() {
                  scope.showTime();
            }, 1000);
        }
    };
})


.directive('renderField',function(){
    return {
        template: '<div ng-include="getTemplate()"></div>',
        link: function(scope){
            scope.getTemplate = function(){
                scope.props = JSON.parse(scope.field.props);
                return 'templates/directives/fields/' + scope.field.type + '.html';
            }
        }
    };
})
