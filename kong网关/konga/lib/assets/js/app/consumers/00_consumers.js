(function () {
  'use strict';

  angular.module('frontend.consumers', [
    'angular.chips',
    'ngMessages',
    'angularUtils.directives.dirPagination'
  ]);

  // Module configuration
  angular.module('frontend.consumers')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('consumers', {
            parent: 'frontend',
            url: '/consumers',
            data: {
              activeNode: true,
              pageName: "消费者管理",
              pageDescription: "Consumer对象表示API的使用者或用户。您可以将Kong作为主数据存储，也可以将使用者列表与数据库映射，以保持Kong与现有主数据存储之间的一致性。",
              //displayName : "consumers",
              prefix: '<i class="material-icons">perm_identity</i>'
            },

            views: {
              'content@': {
                templateUrl: 'js/app/consumers/index.html',
                controller: 'ConsumersController'
              }
            }
          })
          .state('consumers.edit', {
            url: '/:id',
            data: {
              pageName: "Edit Consumer",
              pageDescription: null,
              displayName: "edit consumer",
              prefix: '<i class="material-icons">perm_identity</i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/consumers/edit-consumer.html',
                controller: 'ConsumerController',

              },
              'details@consumers.edit': {
                templateUrl: 'js/app/consumers/details/consumer-details.html',
                controller: 'ConsumerDetailsController',
              },
              'groups@consumers.edit': {
                templateUrl: 'js/app/consumers/groups/consumer-groups.html',
                controller: 'ConsumerGroupsController'
              },
              'credentials@consumers.edit': {
                templateUrl: 'js/app/consumers/credentials/consumer-credentials.html',
                controller: 'ConsumerCredentialsController'
              },
              'apis@consumers.edit': {
                templateUrl: 'js/app/consumers/apis/consumer-apis.html',
                controller: 'ConsumerApisController'
              },
              'plugins@consumers.edit': {
                templateUrl: 'js/app/consumers/plugins/consumer-plugins.html',
                controller: 'ConsumerPluginsController'
              },
              'services@consumers.edit': {
                templateUrl: 'js/app/consumers/services/consumer-services.html',
                controller: 'ConsumerServicesController'
              },
              'routes@consumers.edit': {
                templateUrl: 'js/app/consumers/routes/consumer-routes.html',
                controller: 'ConsumerRoutesController'
              }
            },
            resolve: {
              _consumer: [
                'ConsumerService',
                '$stateParams',
                function (ConsumerService, $stateParams) {
                  return ConsumerService.findById($stateParams.id)
                }
              ],
              _gateway: [
                'InfoService',
                '$rootScope',
                function (InfoService, $rootScope) {
                  return new Promise((resolve, reject) => {
                    var watcher = $rootScope.$watch('Gateway', function (newValue, oldValue) {
                      if (newValue) {
                        watcher(); // clear watcher
                        resolve(newValue)
                      }
                    })
                  })
                }
              ],
              _activeNode: [
                'NodesService',
                function resolve(NodesService) {
                  return NodesService.isActiveNodeSet()
                }
              ],
            },
          })

      }
    ])
  ;
}());
