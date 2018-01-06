define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractService(AbstractClassHelper) {
				AbstractClass.call(this);
				this._helper = AbstractClassHelper;
			},
			functions: {
				httpGet: function (url, params, defaultValue) {
					const source = this._helper.getHttpClient().get(url, { "params": params });
					return this._httpCall(source, defaultValue);
				},
				getCache: function () {
					return this._helper.getCache();
				},
				_httpCall: function (source, defaultValue) {
					const eventEmitter = new ng.core.EventEmitter();
					if (defaultValue === undefined) {
						defaultValue = null;
					}
					this._helper.getEventBus().emit("HTTP_BEGIN");
					source.timeout(GlobalConfig.HTTP_REQUEST_TIMEOUT).subscribe((result) => {
						this._helper.getEventBus().emit("HTTP_END");
						eventEmitter.emit(result);
					}, () => {
						this._helper.getEventBus().emit("HTTP_END");
						eventEmitter.emit(defaultValue);
					});
					return eventEmitter;
				}
			}
		});
	}
);