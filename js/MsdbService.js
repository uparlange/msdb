define(["app:AbstractService", "app:EventManager", "app:CacheManager", "app:AppUtils"], 
function(AbstractService, EventManager, CacheManager, AppUtils) 
{
	return ng.core.Class({
		extends:AbstractService,
		constructor: [ng.http.Http, EventManager, CacheManager, 
			function MsdbService (Http, EventManager, CacheManager)
			{
				AbstractService.call(this, Http, EventManager);
				
				this._cacheManager = CacheManager;
				
				this._mameInfos = null;
			}
		],
		getMameInfos : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._init().subscribe(() => 
			{
				eventEmitter.emit(this._mameInfos);
			});
			
			return eventEmitter;
		},
		getDetail : function(name)
		{
			const params = new ng.http.URLSearchParams();
			params.set("name", name);
			
			const config = {
				url:AppUtils.getServiceUrl("detail"),
				params:params,
				useCache:true
			};
			
			return this._callService(config);
		},
		search : function(type, value)
		{
			const search = {};
			search[type] = value;
			
			const params = new ng.http.URLSearchParams();
			params.set("params", JSON.stringify(search));
			
			const config = {
				url:AppUtils.getServiceUrl("search"),
				params:params,
				useCache:false
			};
			
			return this._callService(config);
		},
		getYears : function()
		{
			const config = {
				url:AppUtils.getServiceUrl("years"),
				useCache:true
			};
			
			return this._callService(config);
		},
		getSeries : function()
		{
			const config = {
				url:AppUtils.getServiceUrl("series"),
				useCache:true
			};
			
			return this._callService(config);
		},
		getCategories : function()
		{
			const config = {
				url:AppUtils.getServiceUrl("categories"),
				useCache:true
			};
			
			return this._callService(config);
		},
		getManufacturers : function()
		{
			const config = {
				url:AppUtils.getServiceUrl("manufacturers"),
				useCache:true
			};
			
			return this._callService(config);
		},
		getVersions : function()
		{
			const config = {
				url:AppUtils.getServiceUrl("versions"),
				useCache:true
			};
			
			return this._callService(config);
		},
		_callService : function(config)
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			const cacheKey = this._getCacheKey(config);
			let value = null;
			
			if(config.useCache === true)
			{
				value = this._cacheManager.getItem(cacheKey);
			}
			
			if(value !== null)
			{
				setTimeout(() =>
				{
					eventEmitter.emit(value);
				},0);
			}
			else
			{
				this._init().subscribe(() => 
				{
					if(this._initialized())
					{
						this.httpGet(config.url, config.params).subscribe((result) =>
						{
							value = this._getData(result);
							
							if(config.useCache === true)
							{
								this._cacheManager.setItem(cacheKey, value);
							}

							eventEmitter.emit(value);
						});
					}
					else
					{
						eventEmitter.emit(null);
					}	
				});
			}

			return eventEmitter;
		},
		_getCacheKey:function(config)
		{
			let cacheKey = "service_" + config.url;
			if(config.params !== undefined)
			{
				cacheKey += "?" + config.params.toString();
			}
			return cacheKey;
		},
		_initialized:function()
		{
			return (this._mameInfos !== null);
		},
		_getData:function(result)
		{
			return (result !== null) ? result.data : result;
		},
		_init : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			if(this._initialized())
			{
				setTimeout(() =>
				{
					eventEmitter.emit();
				},0);
			}
			else
			{
				const url = AppUtils.getServiceUrl("init");
				this.httpGet(url).subscribe((result) =>
				{
					this._mameInfos = this._getData(result);
					
					if(this._mameInfos !== null)
					{
						this._cacheManager.setDefaultNs(this._mameInfos.build);
					}
					
					eventEmitter.emit();
				});
			}
			
			return eventEmitter;
		}
	});
});