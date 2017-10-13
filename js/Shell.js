define(["AppUtils", "EventManager", "TranslateManager", "SocketManager", "ConnectionManager",
    "LazyManager", "CacheManager", "UpdateManager", "RouterManager"],
    function (AppUtils, EventManager, TranslateManager, SocketManager, ConnectionManager,
        LazyManager, CacheManager, UpdateManager, RouterManager) {
        return AppUtils.getClass({
            constructor: function Shell(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
                CacheManager, UpdateManager, RouterManager) {
                this._eventManager = EventManager;
                this._translateManager = TranslateManager;
                this._socketManager = SocketManager;
                this._connectionManager = ConnectionManager;
                this._lazyManager = LazyManager;
                this._cacheManager = CacheManager;
                this._updateManager = UpdateManager;
                this._routerManager = RouterManager;
            },
            parameters: [
                [EventManager], [TranslateManager], [SocketManager], [ConnectionManager], [LazyManager],
                [CacheManager], [UpdateManager], [RouterManager]
            ],
            functions: {
                init: function () {
                    this._eventManager.init();
                    const navigatorLang = navigator.language.split("-")[0];
                    const defaultLang = /(fr|en)/gi.test(navigatorLang) ? navigatorLang : "en";
                    this._translateManager.init({
                        propertyFilePattern: "/data/{locale}.json",
                        language: defaultLang
                    });
                    this._socketManager.init();
                    this._connectionManager.init();
                    this._lazyManager.init();
                    this._cacheManager.init();
                    this._updateManager.init();
                    this._routerManager.init();
                }
            }
        });
    }
);