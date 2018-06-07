import AbstractClass from "./AbstractClass.js";

class AbstractEventManager extends AbstractClass {
	constructor() {
		super();
		this._eventEmitters = {};
	}
	on(eventName) {
		let eventEmitter = this._eventEmitters[eventName];
		if (eventEmitter === undefined) {
			eventEmitter = new ng.core.EventEmitter();
			this._eventEmitters[eventName] = eventEmitter;
		}
		return eventEmitter;
	}
	emit(eventName, evt) {
		const eventEmitter = this._eventEmitters[eventName];
		if (eventEmitter !== undefined) {
			eventEmitter.emit(evt);
		}
	}
}

export default AbstractEventManager;