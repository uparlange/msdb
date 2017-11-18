define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractService(Http, EventManager) {
				AbstractClass.call(this);
				this._http = Http;
				this._eventManager = EventManager;
			},
			functions: {
				httpGet: function (url, params, defaultValue) {
					const source = this._http.get(url, { "params": params });
					return this._httpCall(source, defaultValue);
				},
				_httpCall: function (source, defaultValue) {
					const eventEmitter = new ng.core.EventEmitter();
					if (defaultValue === undefined) {
						defaultValue = null;
					}
					this._eventManager.emit("HTTP_BEGIN");
					source.timeout(GlobalConfig.HTTP_REQUEST_TIMEOUT).subscribe((result) => {
						this._eventManager.emit("HTTP_END");
						eventEmitter.emit(result);
					}, () => {
						this._eventManager.emit("HTTP_END");
						eventEmitter.emit(defaultValue);
					});
					return eventEmitter;
				}
			}
		});
	}
);