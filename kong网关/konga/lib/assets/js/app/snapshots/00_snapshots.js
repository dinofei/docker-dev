
(function() {
    'use strict';

    angular.module('frontend.snapshots', [
    ]);

    // Module configuration
    angular.module('frontend.snapshots')
        .config([
            '$stateProvider',
            function config($stateProvider) {
                $stateProvider
                    .state('snapshots', {
                        url: '/snapshots',
                        parent : 'frontend',
                        data : {
                            access : 2,
                            pageName : "配置镜像管理",
                            pageDescription : "获取当前活动节点的快照." +
                            "<br>All <code>Services</code>, <code>Routes</code>, <code>APIs</code>, " +
                            "<code>Plugins</code>, <code>Consumers</code>, <code>Upstreams</code> and <code>Targets</code>将被保存并可供以后导入。",
                            prefix : '<i class="mdi mdi-camera"></i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/snapshots/index.html',
                                controller: 'SnapshotsController'
                            },
                            'list@snapshots': {
                                templateUrl: 'js/app/snapshots/views/snapshots-list.html',
                                controller: 'SnapshotsListController',
                            },
                            'scheduled@snapshots': {
                                templateUrl: 'js/app/snapshots/views/snapshots-scheduled.html',
                                controller: 'SnapshotsScheduledController',
                            },

                        }
                    })
                    .state('snapshots.show', {
                        url: '/:id',
                        parent : 'snapshots',
                        data : {
                            access :  2,
                            pageName : "镜像明细",
                            displayName : "snapshot details",
                            pageDescription : null,
                            prefix : '<i class="mdi mdi-36px mdi-camera"></i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'js/app/snapshots/views/snapshot.html',
                                controller: 'SnapshotController'
                            },
                        }
                    });
            }
        ])
    ;
}());
