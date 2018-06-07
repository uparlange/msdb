import AbstractManager from "./AbstractManager.js";

class LazyManager extends AbstractManager {
	constructor() {
		super();
		this._blazy = new Blazy();
		this._timeoutInterval = null;
	}
	refresh() {
		if (this._timeoutInterval !== null) {
			clearTimeout(this._timeoutInterval);
		}
		this._timeoutInterval = setTimeout(() => {
			this._blazy.revalidate();
		}, 50);
	}
}

export default LazyManager;