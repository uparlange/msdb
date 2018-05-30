import AppUtils from "./AppUtils.js";
import EventManager from "./EventManager.js";
import TranslateManager from "./TranslateManager.js";
import SocketManager from "./SocketManager.js";
import ConnectionManager from "./ConnectionManager.js";
import LazyManager from "./LazyManager.js";
import CacheManager from "./CacheManager.js";
import UpdateManager from "./UpdateManager.js";
import RouterManager from "./RouterManager.js";
import WindowRef from "./WindowRef.js";
import PopupManager from "./PopupManager.js";

export default AppUtils.getClass({
    constructor: function Shell(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
        CacheManager, UpdateManager, RouterManager, WindowRef, PopupManager) {
        this._eventManager = EventManager;
        this._translateManager = TranslateManager;
        this._socketManager = SocketManager;
        this._connectionManager = ConnectionManager;
        this._lazyManager = LazyManager;
        this._cacheManager = CacheManager;
        this._updateManager = UpdateManager;
        this._routerManager = RouterManager;
        this._popupManager = PopupManager;
        this._windowRef = WindowRef;
    },
    parameters: [
        [EventManager], [TranslateManager], [SocketManager], [ConnectionManager], [LazyManager],
        [CacheManager], [UpdateManager], [RouterManager], [WindowRef], [PopupManager]
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
            this._popupManager.init();
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
        },
        getPopupManager: function () {
            return this._popupManager;
        }
    }
});