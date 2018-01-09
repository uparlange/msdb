define(["AppUtils", "EventManager", "TranslateManager", "MsdbService", "SocketManager",
    "ConnectionManager", "LazyManager", "CacheManager", "UpdateManager", "RouterManager",
    "WindowRef", "Shell", "AbstractClassHelper", "PopupManager"],
    function (AppUtils, EventManager, TranslateManager, MsdbService, SocketManager,
        ConnectionManager, LazyManager, CacheManager, UpdateManager, RouterManager,
        WindowRef, Shell, AbstractClassHelper, PopupManager) {
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
                        AbstractClassHelper,
                        PopupManager
                    ]
                })
            ]
        });
    }
);