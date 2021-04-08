angular.module('iprpAdminApp').directive('head', function($rootScope,$compile) {
    return {
        restrict: 'E',
        link: function(scope, elem){
            var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
            elem.append($compile(html)(scope));
            scope.routeStyles = {};
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                scope.routeStyles = {};

                if(toState && toState.css){
                    if(!Array.isArray(toState.css)){
                        toState.css = [toState.css];
                    }
                    angular.forEach(toState.css, function(sheet){
                        scope.routeStyles[sheet] = sheet;
                    });
                } else {
                    var sheet = options.css.current;
                    scope.routeStyles[sheet] = sheet;
                }
            });
        }
    };
});
