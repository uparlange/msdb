import AppUtils from "./AppUtils.js";
import AbstractService from "./AbstractService.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class MsdbService extends AbstractService {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this._mameInfos = null;
		this._token = null;
	}
	getMameInfos() {
		const eventEmitter = new ng.core.EventEmitter();
		this._init().subscribe(() => {
			eventEmitter.emit(this._mameInfos);
		});
		return eventEmitter;
	}
	getDetail(name) {
		const config = {
			url: AppUtils.getServiceUrl("detail"),
			params: new ng.common.http.HttpParams().set("name", name),
			useCache: true
		};
		return this._callService(config);
	}
	search(type, value) {
		const s = {};
		s[type] = value;
		const config = {
			url: AppUtils.getServiceUrl("search"),
			params: new ng.common.http.HttpParams().set("params", JSON.stringify(s)),
			useCache: false
		};
		return this._callService(config);
	}
	getYears() {
		const config = {
			url: AppUtils.getServiceUrl("years"),
			useCache: true
		};
		return this._callService(config);
	}
	getRatings() {
		const config = {
			url: AppUtils.getServiceUrl("ratings"),
			useCache: true
		};
		return this._callService(config);
	}
	getSeries() {
		const config = {
			url: AppUtils.getServiceUrl("series"),
			useCache: true
		};
		return this._callService(config);
	}
	getCategories() {
		const config = {
			url: AppUtils.getServiceUrl("categories"),
			useCache: true
		};
		return this._callService(config);
	}
	getManufacturers() {
		const config = {
			url: AppUtils.getServiceUrl("manufacturers"),
			useCache: true
		};
		return this._callService(config);
	}
	getVersions() {
		const config = {
			url: AppUtils.getServiceUrl("versions"),
			useCache: true
		};
		return this._callService(config);
	}
	_callService(config) {
		const eventEmitter = new ng.core.EventEmitter();
		const cacheKey = this._getCacheKey(config);
		this.getCache().getItem(cacheKey).subscribe((value) => {
			if (config.useCache === true && value !== null) {
				setTimeout(() => {
					eventEmitter.emit(value);
				}, 0);
			}
			else {
				this._init().subscribe(() => {
					if (this._initialized()) {
						let params = config.params || new ng.common.http.HttpParams();
						params = params.set("token", this._token);
						this.httpGet({ url: config.url, params: params }).subscribe((result) => {
							value = this._getData(result);
							if (config.useCache === true) {
								this.getCache().setItem(cacheKey, value, "version");
							}
							eventEmitter.emit(value);
						});
					}
					else {
						eventEmitter.emit(null);
					}
				});
			}
		});
		return eventEmitter;
	}
	_getCacheKey(config) {
		let cacheKey = `service_${config.url}`;
		if (config.params !== undefined) {
			cacheKey += `?${config.params.toString()}`;
		}
		return cacheKey;
	}
	_initialized() {
		return (this._mameInfos !== null);
	}
	_getData(result) {
		return (result !== null) ? result.data : result;
	}
	_init() {
		const eventEmitter = new ng.core.EventEmitter();
		if (this._initialized()) {
			setTimeout(() => {
				eventEmitter.emit();
			}, 0);
		}
		else {
			const url = AppUtils.getServiceUrl("init");
			this.httpGet({ url: url }).subscribe((result) => {
				const data = this._getData(result);
				if (data !== null) {
					this._token = data.token;
					this._mameInfos = data.mameInfos;
					this.getCache().setItem("version", data.mameInfos.build).subscribe((event) => {
						if (event.newValue !== event.oldValue) {
							this.getCache().deleteNamespace("version");
						}
					});
				}
				eventEmitter.emit();
			});
		}
		return eventEmitter;
	}
}

export default MsdbService;