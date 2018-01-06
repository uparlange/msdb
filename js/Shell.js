define(["AppUtils", "EventManager", "TranslateManager", "SocketManager", "ConnectionManager",
    "LazyManager", "CacheManager", "UpdateManager", "RouterManager", "WindowRef"],
    function (AppUtils, EventManager, TranslateManager, SocketManager, ConnectionManager,
        LazyManager, CacheManager, UpdateManager, RouterManager, WindowRef) {
        return AppUtils.getClass({
            constructor: function Shell(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
                CacheManager, UpdateManager, RouterManager, WindowRef) {
                this._eventManager = EventManager;
                this._translateManager = TranslateManager;
                this._socketManager = SocketManager;
                this._connectionManager = ConnectionManager;
                this._lazyManager = LazyManager;
                this._cacheManager = CacheManager;
                this._updateManager = UpdateManager;
                this._routerManager = RouterManager;
                this._windowRef = WindowRef;
            },
            parameters: [
                [EventManager], [TranslateManager], [SocketManager], [ConnectionManager], [LazyManager],
                [CacheManager], [UpdateManager], [RouterManager], [WindowRef]
            ],
            functions: {
                init: function () {
                    this._eventManager.init();
                    const navigatorLang = this._windowRef.nativeWindow.navigator.language.split("-")[0];
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
                },
                getEventManager: function () {
                    return this._eventManager;
                },
                getTranslateManager: function () {
                    return this._translateManager;
                },
                getSocketManager: function () {
                    return this._socketManager;
                },
                getConnectionManager: function () {
                    return this._connectionManager;
                },
                getLazyManager: function () {
                    return this._lazyManager;
                },
                getCacheManager: function () {
                    return this._cacheManager;
                },
                getUpdateManager: function () {
                    return this._updateManager;
                },
                getRouterManager: function () {
                    return this._routerManager;
                }
            }
        });
    }
);