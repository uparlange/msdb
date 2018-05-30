import AppUtils from "./AppUtils.js";
import EventManager from "./EventManager.js";
import TranslateManager from "./TranslateManager.js";
import MsdbService from "./MsdbService.js";
import SocketManager from "./SocketManager.js";
import ConnectionManager from "./ConnectionManager.js";
import LazyManager from "./LazyManager.js";
import CacheManager from "./CacheManager.js";
import UpdateManager from "./UpdateManager.js";
import RouterManager from "./RouterManager.js";
import WindowRef from "./WindowRef.js";
import Shell from "./Shell.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import PopupManager from "./PopupManager.js";

export default AppUtils.getClass({
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