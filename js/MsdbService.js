define(["app:AbstractService", "app:EventManager", "app:CacheManager", "app:AppUtils"], 
function(AbstractService, EventManager, CacheManager, AppUtils) 
{
	const MsdbService = function (http, eventManager, CacheManager)
	{
		AbstractService.call(this, http, eventManager);
		
		this._cacheManager = CacheManager;
		
		this._mameInfos = null;
	};
	
	return ng.core.Class({
		extends:AbstractService,
		constructor: [ng.http.Http, EventManager, CacheManager, MsdbService],
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
			const url = AppUtils.getServiceUrl("detail") + "?name=" + name;
			
			return this._callService(url, true);
		},
		search : function(type, value)
		{
			const params = {};
			params[type] = value;
			const url = AppUtils.getServiceUrl("search") + "?params=" + JSON.stringify(params);
			
			return this._callService(url);
		},
		getYears : function()
		{
			const url = AppUtils.getServiceUrl("years");
			
			return this._callService(url, true);
		},
		getSeries : function()
		{
			const url = AppUtils.getServiceUrl("series");
			
			return this._callService(url, true);
		},
		getCategories : function()
		{
			const url = AppUtils.getServiceUrl("categories");
			
			return this._callService(url, true);
		},
		getManufacturers : function()
		{
			const url = AppUtils.getServiceUrl("manufacturers");
			
			return this._callService(url, true);
		},
		getVersions : function()
		{
			const url = AppUtils.getServiceUrl("versions");
			
			return this._callService(url, true);
		},
		_callService : function(url, useCache)
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			let value = null;
			
			if(useCache === true)
			{
				value = this._cacheManager.getItem(url);
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
						this.httpGet(url).subscribe((result) =>
						{
							value = this._getData(result);
							
							if(useCache === true)
							{
								this._cacheManager.setItem(url, value);
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