import AppUtils from "./AppUtils.js";
import AbstractManager from "./AbstractManager.js";
import EventManager from "./EventManager.js";

class SocketManager extends AbstractManager {
	static get parameters() {
		return AppUtils.getParameters(EventManager);
	}
	constructor(EventManager) {
		super();
		this._eventManager = EventManager;
		this._url = AppUtils.getSocketUrl();
		this._socket = null;
	}
	on(eventName) {
		let eventEmitter = this._eventEmitters[eventName];
		if (eventEmitter === undefined) {
			eventEmitter = new ng.core.EventEmitter();
			this._eventEmitters[eventName] = eventEmitter;
			this._getSocket().subscribe((socket) => {
				if (socket !== null) {
					socket.on(eventName, () => {
						eventEmitter.emit();
					});
				}
			});
		}
		return eventEmitter;
	}
	emit(eventName, params) {
		const eventEmitter = new ng.core.EventEmitter();
		this._eventManager.emit("HTTP_BEGIN");
		this._getSocket().subscribe((socket) => {
			if (socket !== null) {
				socket.emit(eventName, params, (result) => {
					this._eventManager.emit("HTTP_END");
					eventEmitter.emit(result);
				});
			}
			else {
				this._eventManager.emit("HTTP_END");
				eventEmitter.emit(null);
			}
		});
		return eventEmitter;
	}
	_getSocket() {
		const eventEmitter = new ng.core.EventEmitter();
		if (AppUtils.runInNw()) {
			if (this._socket === null) {
				this._socket = io(this._url, {
					reconnection: false
				});
				this._socket.on("connect", () => {
					eventEmitter.emit(this._socket);
				});
				this._socket.on("connect_error", () => {
					this._socket = null;
					eventEmitter.emit(this._socket);
				});
			}
			else {
				setTimeout(() => {
					eventEmitter.emit(this._socket);
				}, 0);
			}
		}
		else {
			setTimeout(() => {
				eventEmitter.emit(null);
			}, 0);
		}
		return eventEmitter;
	}
}

export default SocketManager;