define(["AppUtils", "EventManager", "TranslateManager", "MsdbService", "SocketManager",
    "ConnectionManager", "LazyManager", "CacheManager", "UpdateManager", "RouterManager",
    "WindowRef", "Shell", "AbstractClassHelper"],
    function (AppUtils, EventManager, TranslateManager, MsdbService, SocketManager,
        ConnectionManager, LazyManager, CacheManager, UpdateManager, RouterManager,
        WindowRef, Shell, AbstractClassHelper) {
        return AppUtils.getClass({
            constructor: function GlobalModule() {

            },
            annotations: [
                new ng.core.NgModule({
                    providers: [
                        MsdbService,
                        EventManager,
                        TranslateManager,
                        SocketManager,
                        ConnectionManager,
                        LazyManager,
                        CacheManager,
                        UpdateManager,
                        RouterManager,
                        WindowRef,
                        Shell,
                        AbstractClassHelper
                    ]
                })
            ]
        });
    }
);