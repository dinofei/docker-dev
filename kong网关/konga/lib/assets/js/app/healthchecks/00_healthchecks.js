(function () {
  'use strict';

  angular.module('frontend.healthchecks', []);

  // Module configuration
  angular.module('frontend.healthchecks')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('healthchecks', {
            parent: 'frontend',
            url: '/healthchecks',
            data: {
              activeNode: true,
              pageName: "健康检查",
              pageDescription: "管理API接口的健康检查点",
              prefix: '<i class="mdi mdi-heart"></i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/healthchecks/healthchecks.html',
                controller: 'HealthChecksController'
              }
            }
          });
      }
    ])
  ;
}());
