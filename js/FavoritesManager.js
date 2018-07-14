import AbstractManager from "./AbstractManager.js";
import CacheManager from "./CacheManager.js";
import AppUtils from "./AppUtils.js";

class FavoritesManager extends AbstractManager {
	static get parameters() {
		return AppUtils.getParameters(CacheManager);
	}
	constructor(CacheManager) {
		super();
		this._cacheManager = CacheManager;
		this._favorites = null;
	}
	init() {
		super.init();
		this._favorites = this._cacheManager.getItem("favorites", "list", []);
	}
	add(name) {
		if (!this.has(name)) {
			this._favorites.push(name);
			this._save();
			this.emit("change", {
				action: "add",
				value: name
			});
		}
	}
	remove(name) {
		const index = this._favorites.indexOf(name);
		if (index !== -1) {
			this._favorites.splice(index, 1);
			this._save();
			this.emit("change", {
				action: "remove",
				value: name
			});
		}
	}
	has(name) {
		return (this._favorites.indexOf(name) !== -1);
	}
	getList() {
		const eventEmitter = new ng.core.EventEmitter();
		setTimeout(() => {
			eventEmitter.emit(this._favorites);
		}, 0);
		return eventEmitter;
	}
	_save() {
		this._cacheManager.setItem("favorites", "list", this._favorites);
	}
}

export default FavoritesManager;