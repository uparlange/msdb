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
import AbstractClass from "./AbstractClass.js";
import AppUtils from "./AppUtils.js";

class Shell extends AbstractClass {
    static get parameters() {
        return AppUtils.getParameters(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
            CacheManager, UpdateManager, RouterManager, WindowRef, PopupManager);
    }
    constructor(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
        CacheManager, UpdateManager, RouterManager, WindowRef, PopupManager) {
        super();
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
    }
    init() {
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
    }
    getEventManager() {
        return this._eventManager;
    }
    getTranslateManager() {
        return this._translateManager;
    }
    getSocketManager() {
        return this._socketManager;
    }
    getConnectionManager() {
        return this._connectionManager;
    }
    getLazyManager() {
        return this._lazyManager;
    }
    getCacheManager() {
        return this._cacheManager;
    }
    getUpdateManager() {
        return this._updateManager;
    }
    getRouterManager() {
        return this._routerManager;
    }
    getPopupManager() {
        return this._popupManager;
    }
}

export default Shell;