define(["app:AbstractService", "app:EventManager", "app:AppUtils"], 
function(AbstractService, EventManager, AppUtils) 
{
	const MsdbService = function (http, eventManager)
	{
		AbstractService.call(this);
		
		this._http = http;
		this._eventManager = eventManager;
		
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
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				if(this._initialized)
				{
					this._http.get(url).catch((e) =>
					{
						this._eventManager.emit("HTTP_END");
						
						eventEmitter.emit(null);
					}).subscribe((result) => 
					{
						this._eventManager.emit("HTTP_END");
						
						eventEmitter.emit(result.json().data);
					});
				}
				else
				{
					this._eventManager.emit("HTTP_END");
					
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
				this._http.get(AppUtils.getServiceUrl("init")).catch((e) =>
				{
					eventEmitter.emit();
				}).subscribe(() => 
				{
					this._initialized = true;
					
					eventEmitter.emit();
				});
			}
			return eventEmitter;
		}
	});
});