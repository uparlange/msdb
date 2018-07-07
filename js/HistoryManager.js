import AbstractManager from "./AbstractManager.js";

class HistoryManager extends AbstractManager {
	constructor() {
		super();
		this._history = [];
	}
	add(newItem) {
		const index = this._history.findIndex(function (currentItem) {
			return newItem.url === currentItem.url;
		});
		if (index !== -1) {
			this._history.splice(index, 1);
		}
		this._history.unshift(newItem);
	}
	getList() {
		const eventEmitter = new ng.core.EventEmitter();
		setTimeout(() => {
			eventEmitter.emit(this._history);
		}, 0);
		return eventEmitter;
	}
}

export default HistoryManager;