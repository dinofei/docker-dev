
(function() {
    'use strict';

    angular.module('frontend.info', []);

    // Module configuration
    angular.module('frontend.info')
        .config([
            '$stateProvider',
            function config($stateProvider) {
                $stateProvider
                    .state('info', {
                        parent: 'frontend',
                        url: '/info',
                        data : {
                            activeNode : true,
                            pageName : "节点信息管理",
                            access: 2, // Only admins can access this route
                            // displayName : "node info",
                            pageDescription : "有关节点的常规详细信息",
                            prefix : '<i class="material-icons text-primary">&#xE88F;</i>'
                        },

                        views: {
                            'content@': {
                                templateUrl: 'js/app/info/index.html',
                                controller: 'InfoController'
                            }
                        },

                    })
                ;
            }
        ])
    ;
}());
