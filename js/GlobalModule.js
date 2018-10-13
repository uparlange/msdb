import EventManager from "./EventManager.js";
import TranslateManager from "./TranslateManager.js";
import MsdbService from "./MsdbService.js";
import SocketManager from "./SocketManager.js";
import ConnectionManager from "./ConnectionManager.js";
import LazyManager from "./LazyManager.js";
import CacheManager from "./CacheManager.js";
import RouterManager from "./RouterManager.js";
import WindowRef from "./WindowRef.js";
import Shell from "./Shell.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import PopupManager from "./PopupManager.js";
import HistoryManager from "./HistoryManager.js";
import FavoritesManager from "./FavoritesManager.js";
import AbstractModule from "./AbstractModule.js";

class GlobalModule extends AbstractModule {
    static get annotations() {
        return this.getAnnotations({
            providers: [
                MsdbService,
                EventManager,
                TranslateManager,
                SocketManager,
                ConnectionManager,
                LazyManager,
                CacheManager,
                RouterManager,
                WindowRef,
                Shell,
                AbstractClassHelper,
                PopupManager,
                FavoritesManager,
                HistoryManager
            ]
        });
    }
    constructor() {
        super();
    }
}

export default GlobalModule;