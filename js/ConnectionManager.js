import AbstractManager from "./AbstractManager.js";
import WindowRef from "./WindowRef.js";
import AppUtils from "./AppUtils.js";

class ConnectionManager extends AbstractManager {
	static get parameters() {
		return AppUtils.getParameters(WindowRef);
	}
	constructor(WindowRef) {
		super();
		this._windowRef = WindowRef;
		this.online = this._windowRef.nativeWindow.navigator.onLine;
	}
	init() {
		super.init();
		this._windowRef.nativeWindow.addEventListener("offline", () => {
			this._changeHandler();
		});
		this._windowRef.nativeWindow.addEventListener("online", () => {
			this._changeHandler();
		});
	}
	_changeHandler() {
		this.online = this._windowRef.nativeWindow.navigator.onLine;
		this.emit("change", this.online);
	}
}

export default ConnectionManager;