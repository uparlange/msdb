import AbstractClass from "./AbstractClass.js";
import AppUtils from "./AppUtils.js";
import EventManager from "./EventManager.js";
import TranslateManager from "./TranslateManager.js";
import SocketManager from "./SocketManager.js";
import ConnectionManager from "./ConnectionManager.js";
import LazyManager from "./LazyManager.js";
import CacheManager from "./CacheManager.js";
import RouterManager from "./RouterManager.js";
import WindowRef from "./WindowRef.js";
import PopupManager from "./PopupManager.js";
import HistoryManager from "./HistoryManager.js";
import FavoritesManager from "./FavoritesManager.js";
import AnalyticsManager from "./AnalyticsManager.js";

class Shell extends AbstractClass {
    static get parameters() {
        return AppUtils.getParameters(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
            CacheManager, RouterManager, WindowRef, PopupManager, HistoryManager,
            FavoritesManager, AnalyticsManager);
    }
    constructor(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
        CacheManager, RouterManager, WindowRef, PopupManager, HistoryManager,
        FavoritesManager, AnalyticsManager) {
        super();
        this._eventManager = EventManager;
        this._translateManager = TranslateManager;
        this._socketManager = SocketManager;
        this._connectionManager = ConnectionManager;
        this._lazyManager = LazyManager;
        this._cacheManager = CacheManager;
        this._routerManager = RouterManager;
        this._popupManager = PopupManager;
        this._windowRef = WindowRef;
        this._historyManager = HistoryManager;
        this._favoritesManager = FavoritesManager;
        this._analyticsManager = AnalyticsManager;
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
        this._routerManager.init();
        this._popupManager.init();
        this._historyManager.init();
        this._favoritesManager.init();
        this._analyticsManager.init();
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
    getRouterManager() {
        return this._routerManager;
    }
    getPopupManager() {
        return this._popupManager;
    }
    getHistoryManager() {
        return this._historyManager;
    }
    getFavoritesManager() {
        return this._favoritesManager;
    }
    getAnalyticsManager() {
        return this._analyticsManager;
    }
}

export default Shell;