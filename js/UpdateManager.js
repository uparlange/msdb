import AbstractManager from "./AbstractManager.js";
import TranslateManager from "./TranslateManager.js";
import WindowRef from "./WindowRef.js";
import CacheManager from "./CacheManager.js";
import AppUtils from "./AppUtils.js";

class UpdateManager extends AbstractManager {
	static get parameters() {
		return AppUtils.getParameters(TranslateManager, WindowRef, CacheManager);
	}
	constructor(TranslateManager, WindowRef, CacheManager) {
		super();
		this._translateManager = TranslateManager;
		this._windowRef = WindowRef;
		this._cacheManager = CacheManager;
		this._checked = false;
	}
	init() {
		super.init();
		this._windowRef.nativeWindow.applicationCache.addEventListener("updateready", () => {
			this._askForReload();
		});
		if (this._windowRef.nativeWindow.applicationCache.status === this._windowRef.nativeWindow.applicationCache.UPDATEREADY) {
			this._askForReload();
		}
	}
	_askForReload() {
		if (!this._checked) {
			this._cacheManager.clear();
			this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations) => {
				if (confirm(translations.L10N_NEW_VERSION)) {
					this._checked = true;
					this._windowRef.nativeWindow.location.reload();
				}
			});
		}
	}
}

export default UpdateManager;