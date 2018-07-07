import AbstractClass from "./AbstractClass.js";
import Shell from "./Shell.js";
import WindowRef from "./WindowRef.js";
import AppUtils from "./AppUtils.js";

class AbstractClassHelper extends AbstractClass {
	static get parameters() {
		return AppUtils.getParameters(Shell, WindowRef, ng.platformBrowser.Title, ng.common.http.HttpClient, ng.router.ActivatedRoute)
	}
	constructor(Shell, WindowRef, Title, HttpClient, ActivatedRoute) {
		super();
		this._title = Title;
		this._shell = Shell;
		this._httpClient = HttpClient;
		this._activatedRoute = ActivatedRoute;
		this._windowRef = WindowRef;
		// TODO right place ?
		this._shell.init();
	}
	getEventBus() {
		return this._shell.getEventManager();
	}
	getConnection() {
		return this._shell.getConnectionManager();
	}
	getSocket() {
		return this._shell.getSocketManager();
	}
	getRouter() {
		return this._shell.getRouterManager();
	}
	getCache() {
		return this._shell.getCacheManager();
	}
	getLabels() {
		return this._shell.getTranslateManager();
	}
	getLazy() {
		return this._shell.getLazyManager();
	}
	getPopups() {
		return this._shell.getPopupManager();
	}
	getHistory() {
		return this._shell.getHistoryManager();
	}
	getTitle() {
		return this._title;
	}
	getHttpClient() {
		return this._httpClient;
	}
	getActivatedRoute() {
		return this._activatedRoute;
	}
	getWindowRef() {
		return this._windowRef;
	}
}

export default AbstractClassHelper;