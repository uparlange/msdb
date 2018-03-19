define(["AbstractService", "AbstractClassHelper", "AppUtils"],
	function (AbstractService, AbstractClassHelper, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractService,
			constructor: function MsdbService(AbstractClassHelper) {
				AbstractService.call(this, AbstractClassHelper);
				this._mameInfos = null;
				this._token = null;
			},
			parameters: [
				[AbstractClassHelper]
			],
			functions: {
				getMameInfos: function () {
					const eventEmitter = new ng.core.EventEmitter();
					this._init().subscribe(() => {
						eventEmitter.emit(this._mameInfos);
					});
					return eventEmitter;
				},
				getDetail: function (name) {
					const config = {
						url: AppUtils.getServiceUrl("detail"),
						params: new ng.common.http.HttpParams().set("name", name),
						useCache: true
					};
					return this._callService(config);
				},
				search: function (type, value) {
					const s = {};
					s[type] = value;
					const config = {
						url: AppUtils.getServiceUrl("search"),
						params: new ng.common.http.HttpParams().set("params", JSON.stringify(s)),
						useCache: false
					};
					return this._callService(config);
				},
				getYears: function () {
					const config = {
						url: AppUtils.getServiceUrl("years"),
						useCache: true
					};
					return this._callService(config);
				},
				getRatings: function () {
					const config = {
						url: AppUtils.getServiceUrl("ratings"),
						useCache: true
					};
					return this._callService(config);
				},
				getSeries: function () {
					const config = {
						url: AppUtils.getServiceUrl("series"),
						useCache: true
					};
					return this._callService(config);
				},
				getCategories: function () {
					const config = {
						url: AppUtils.getServiceUrl("categories"),
						useCache: true
					};
					return this._callService(config);
				},
				getManufacturers: function () {
					const config = {
						url: AppUtils.getServiceUrl("manufacturers"),
						useCache: true
					};
					return this._callService(config);
				},
				getVersions: function () {
					const config = {
						url: AppUtils.getServiceUrl("versions"),
						useCache: true
					};
					return this._callService(config);
				},
				_callService: function (config) {
					const eventEmitter = new ng.core.EventEmitter();
					const cacheKey = this._getCacheKey(config);
					let value = null;
					if (config.useCache === true) {
						value = this.getCache().getItem(cacheKey);
					}
					if (value !== null) {
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
										this.getCache().setItem(cacheKey, value);
									}
									eventEmitter.emit(value);
								});
							}
							else {
								eventEmitter.emit(null);
							}
						});
					}
					return eventEmitter;
				},
				_getCacheKey: function (config) {
					let cacheKey = "service_" + config.url;
					if (config.params !== undefined) {
						cacheKey += "?" + config.params.toString();
					}
					return cacheKey;
				},
				_initialized: function () {
					return (this._mameInfos !== null);
				},
				_getData: function (result) {
					return (result !== null) ? result.data : result;
				},
				_init: function () {
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
								this.getCache().setDefaultNs(data.mameInfos.build);
							}
							eventEmitter.emit();
						});
					}
					return eventEmitter;
				}
			}
		});
	}
);