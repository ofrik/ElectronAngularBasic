
(function () {
    'use strict';
    
    var _templateBase = './scripts';
    
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/views/page.html' ,
                controller: 'testCtrl',
                controllerAs: '_ctrl'
            });
			$routeProvider.when('/test', {
                templateUrl: _templateBase + '/views/page2.html' ,
                controller: 'testCtrl',
                controllerAs: '_ctrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);

})();