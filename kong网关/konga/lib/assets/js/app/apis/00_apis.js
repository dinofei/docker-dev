(function () {
  'use strict';

  angular.module('frontend.apis', [
    'angular.chips',
    'ngFileUpload'
  ])

  // Module configuration
  angular.module('frontend.apis')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('apis', {
            parent: 'frontend',
            url: '/apis',
            data: {
              activeNode: true,
              pageName: "APIs",
              pageDescription: "API对象描述了Kong正在公开的API。当消费者从代理端口调用API时，Kong需要知道如何检索它。每个API对象必须指定请求主机、请求路径或两者。Kong将把对API的所有请求代理到指定的上游URL。",
              //displayName : "apis",
              prefix: '<i class="material-icons">cloud_queue</i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/apis/views/apis.html',
                controller: 'ApisController',
              }
            }
          })
          .state('apis.edit', {
            url: '/:api_id/edit',
            data: {
              pageName: "编辑API",
              pageDescription: "",
              displayName: "编辑API",
              prefix: '<i class="mdi mdi-pencil"></i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/apis/views/edit-api.html',
                controller: 'ApiController',
                resolve: {
                  _api: [
                    'ApiService', '$stateParams',
                    function resolve(ApiService, $stateParams) {
                      return ApiService.findById($stateParams.api_id)
                    }
                  ],
                  _activeNode: [
                    'NodesService',
                    function resolve(NodesService) {
                      return NodesService.isActiveNodeSet()
                    }
                  ],
                }

              },
              'details@apis.edit': {
                templateUrl: 'js/app/apis/views/api-details.html',
                controller: 'ApiDetailsController',
              },
              'plugins@apis.edit': {
                templateUrl: 'js/app/apis/views/api-plugins.html',
                controller: 'ApiPluginsController',
                resolve: {
                  _plugins: [
                    'PluginsService', '$stateParams',
                    function (PluginsService, $stateParams) {
                      return PluginsService.load({api_id: $stateParams.api_id});
                    }
                  ]
                }
              },
              'healthchecks@apis.edit': {
                templateUrl: 'js/app/apis/views/api-health-checks.html',
                controller: 'ApiHealthChecksController',
              },
              'metrics@apis.edit': {
                templateUrl: 'js/app/apis/views/api-metrics.html',
                controller: 'ApiMetricsController',
              }
            }
          })
          .state('apis.plugins', {
            url: '/:api_id/plugins',
            params: {
              api: {}
            },
            data: {
              pageName: "API插件",
              displayName: "API plugins"
            },
            views: {
              'content@': {
                templateUrl: 'js/app/apis/views/api-plugins.html',
                controller: 'ApiPluginsController',
                resolve: {
                  _api: [
                    'ApiService', '$stateParams',
                    function (ApiService, $stateParams) {
                      return ApiService.findById($stateParams.api_id)
                    }
                  ],
                  _plugins: [
                    'PluginsService', '$stateParams',
                    function (PluginsService, $stateParams) {
                      return PluginsService.load({
                        api_id: $stateParams.api_id
                      })
                    }
                  ],
                  _activeNode: [
                    'NodesService',
                    function resolve(NodesService) {

                      return NodesService.isActiveNodeSet()
                    }
                  ],
                }
              }
            },
          })
          .state('apis.plugins.manage', {
            url: '/manage',
            data: {
              pageName: "管理API插件",
              displayName: "管理"
            },
            views: {
              'content@': {
                templateUrl: 'js/app/apis/views/plugins/manage/manage-api-plugins.html',
                controller: 'ManageApiPluginsController',
                resolve: {
                  _api: [
                    '$stateParams',
                    'ApiService',
                    '$log',
                    function resolve($stateParams,
                                     ApiService,
                                     $log) {
                      return ApiService.findById($stateParams.api_id)
                    }
                  ],
                  _plugins: [
                    '$stateParams',
                    'ApiService',
                    '$log',
                    function resolve($stateParams,
                                     ApiService,
                                     $log) {
                      return ApiService.plugins($stateParams.api_id)
                    }
                  ],
                  _info: [
                    '$stateParams',
                    'InfoService',
                    '$log',
                    function resolve($stateParams,
                                     InfoService,
                                     $log) {
                      return InfoService.getInfo()
                    }
                  ],
                  _activeNode: [
                    'NodesService',
                    function resolve(NodesService) {

                      return NodesService.isActiveNodeSet()
                    }
                  ],
                }
              }
            },
          })
      }
    ])
  ;
}());
