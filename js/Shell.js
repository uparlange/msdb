import AbstractClass from "./AbstractClass.js";
import AppUtils from "./AppUtils.js";
import EventManager from "./EventManager.js";
import TranslateManager from "./TranslateManager.js";
import SocketManager from "./SocketManager.js";
import ConnectionManager from "./ConnectionManager.js";
import LazyManager from "./LazyManager.js";
import CacheManager from "./CacheManager.js";
import RouterManager from "./RouterManager.js";
import PopupManager from "./PopupManager.js";
import HistoryManager from "./HistoryManager.js";
import FavoritesManager from "./FavoritesManager.js";
import AnalyticsManager from "./AnalyticsManager.js";

class Shell extends AbstractClass {
    static get parameters() {
        return AppUtils.getParameters(EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager,
            CacheManager, RouterManager, PopupManager, HistoryManager, FavoritesManager,
            AnalyticsManager);
    }
    // EventManager, TranslateManager, SocketManager, ConnectionManager, LazyManager, ...
    // dynamic injection
    constructor() {
        super();
        this._managers = [];
        [].forEach.call(arguments, (manager) => {
            this._managers.push(manager);
            this["get" + manager.getClassName()] = () => {
                return manager;
            }
        });
    }
    init() {
        this._managers.forEach((manager) => {
            manager.init();
        });
    }
}

export default Shell;