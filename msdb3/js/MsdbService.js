define(["app:AbstractService", "app:EventManager", "app:AppUtils"], 
function(AbstractService, EventManager, AppUtils) 
{
	const MsdbService = function (http, eventManager)
	{
		AbstractService.call(this, http, eventManager);
		
		this._initialized = false;
	};
	
	return ng.core.Class({
		extends:AbstractService,
		constructor: [ng.http.Http, EventManager, MsdbService],
		getMameInfos : function()
		{
			const url = AppUtils.getServiceUrl("mameinfos");
			
			return this._callService(url);
		},
		getDetail : function(name)
		{
			const url = AppUtils.getServiceUrl("detail") + "?name=" + name;
			
			return this._callService(url);
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
			
			return this._callService(url);
		},
		getSeries : function()
		{
			const url = AppUtils.getServiceUrl("series");
			
			return this._callService(url);
		},
		getCategories : function()
		{
			const url = AppUtils.getServiceUrl("categories");
			
			return this._callService(url);
		},
		getManufacturers : function()
		{
			const url = AppUtils.getServiceUrl("manufacturers");
			
			return this._callService(url);
		},
		getVersions : function()
		{
			const url = AppUtils.getServiceUrl("versions");
			
			return this._callService(url);
		},
		_callService : function(url)
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._init().subscribe(() => 
			{
				if(this._initialized)
				{
					this.httpGet(url).subscribe((result) =>
					{
						const value = (result !== null) ? result.data : result;
						eventEmitter.emit(value);
					});
				}
				else
				{
					eventEmitter.emit(null);
				}	
			});
			
			return eventEmitter;
		},
		_init : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			if(this._initialized)
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
					this._initialized = (result !== null);
					
					eventEmitter.emit();
				});
			}
			
			return eventEmitter;
		}
	});
});