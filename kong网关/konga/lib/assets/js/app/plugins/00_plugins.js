(function () {
  'use strict';

  angular.module('frontend.plugins', []);

  // Module configuration
  angular.module('frontend.plugins')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('plugins', {
            parent: 'frontend',
            url: '/plugins',
            data: {
              activeNode: true,
              pageName: "插件管理",
              pageDescription: "插件实体表示将在HTTP请求/响应工作流期间执行的插件配置，以及如何向在Kong之后运行的api添加功能，例如身份验证或速率限制。",
              //displayName : "plugins",
              prefix: '<i class="material-icons text-primary">settings_input_component</i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/plugins/plugins.html',
                controller: 'PluginsController'
              }
            }
          })
          .state('plugins.add', {
            url: '/add',
            params: {
              api: {}
            },
            data: {
              pageName: "Add Global Plugins",
              pageDescription: null,
              displayName: "add"
            },
            views: {
              'content@': {
                templateUrl: 'js/app/plugins/add-plugins.html',
                controller: 'AddPluginsController',
                resolve: {
                  _plugins: [
                    '$stateParams',
                    'PluginsService',
                    '$log',
                    function resolve(
                      $stateParams,
                      PluginsService,
                      $log
                    ) {
                      return PluginsService.load()
                    }
                  ],
                  _info: [
                    '$stateParams',
                    'InfoService',
                    '$log',
                    function resolve(
                      $stateParams,
                      InfoService,
                      $log
                    ) {
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
