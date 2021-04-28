
(function() {
    'use strict';

    angular.module('frontend.certificates', []);

    // Module configuration
    angular.module('frontend.certificates')
        .config([
            '$stateProvider',
            function config($stateProvider) {
                $stateProvider
                    .state('certificates', {
                        parent : 'frontend',
                        url: '/certificates',
                        data : {
                            activeNode : true,
                            pageName : "证书管理",
                            pageDescription : "证书对象表示SSL证书的公共证书/私钥对。Kong使用这些对象来处理加密请求的SSL/TLS终止。证书可以选择与SNI对象关联，以将证书/密钥对绑定到一个或多个主机名。",
                            //displayName : "certificates",
                            prefix : '<i class="material-icons text-primary">perm_identity</i>'
                        },
                        resolve: {
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
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/certificates/certificates.html',
                                controller: 'CertificatesController',
                                //resolve: {
                                //    _certificates : [
                                //        'PluginsService',
                                //        function(PluginsService) {
                                //            return PluginsService.load()
                                //        }
                                //    ]
                                //}
                            }
                        }
                    })
            }
        ])
    ;
}());
