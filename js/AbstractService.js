import AbstractClass from "./AbstractClass.js";

class AbstractService extends AbstractClass {
	constructor(AbstractClassHelper) {
		super();
		this._helper = AbstractClassHelper;
	}
	httpGet(config) {
		const httpConfig = {};
		if (config.params) {
			httpConfig.params = config.params;
		}
		if (config.responseType) {
			httpConfig.responseType = config.responseType;
		}
		const source = this._helper.getHttpClient().get(config.url, httpConfig);
		return this._httpCall(source, config.defaultValue);
	}
	getCache() {
		return this._helper.getCache();
	}
	_httpCall(source, defaultValue) {
		const eventEmitter = new ng.core.EventEmitter();
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		this._helper.getEventBus().emit("HTTP_BEGIN");
		// source.timeout(AppUtils.getHttpRequestTimeOut())
		source.subscribe((result) => {
			this._helper.getEventBus().emit("HTTP_END");
			eventEmitter.emit(result);
		}, () => {
			this._helper.getEventBus().emit("HTTP_END");
			eventEmitter.emit(defaultValue);
		});
		return eventEmitter;
	}
}

export default AbstractService;