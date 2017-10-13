define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractEventManager() {
				AbstractClass.call(this);
				this._eventEmitters = {};
			},
			functions: {
				on: function (eventName) {
					let eventEmitter = this._eventEmitters[eventName];
					if (eventEmitter === undefined) {
						eventEmitter = new ng.core.EventEmitter();
						this._eventEmitters[eventName] = eventEmitter;
					}
					return eventEmitter;
				},
				emit: function (eventName, evt) {
					const eventEmitter = this._eventEmitters[eventName];
					if (eventEmitter !== undefined) {
						eventEmitter.emit(evt);
					}
				},
				off: function (eventSubscriber) {
					eventSubscriber.unsubscribe();
				}
			}
		});
	}
);