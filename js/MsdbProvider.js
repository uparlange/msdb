define(["app:EventManager", "app:AppUtils"], 
function(EventManager, AppUtils) 
{
	return ng.core.Class({
		constructor: [ng.http.Http, ng.common.PlatformLocation, EventManager,
			function (http, platformLocation, eventManager)
			{
				this._http = http;
				this._platformLocation = platformLocation;
				this._eventManager = eventManager;
				
				this._initialized = false;
			}
		],
		getMameInfos : function()
		{
			const url = AppUtils.getServiceUrl("mameinfos", null);
			
			return this._callService(url, null);
		},
		getDetail : function(name)
		{
			const url = AppUtils.getServiceUrl("detail") + "?name=" + name;
			
			return this._callService(url, null);
		},
		search : function(type, value)
		{
			const params = {};
			params[type] = value;
			const url = AppUtils.getServiceUrl("search") + "?params=" + JSON.stringify(params);
			
			return this._callService(url, []);
		},
		getYears : function()
		{
			const url = AppUtils.getServiceUrl("years");
			
			return this._callService(url, null);
		},
		getSeries : function()
		{
			const url = AppUtils.getServiceUrl("series");
			
			return this._callService(url, null);
		},
		getCategories : function()
		{
			const url = AppUtils.getServiceUrl("categories");
			
			return this._callService(url, null);
		},
		getManufacturers : function()
		{
			const url = AppUtils.getServiceUrl("manufacturers");
			
			return this._callService(url, null);
		},
		getVersions : function()
		{
			const url = AppUtils.getServiceUrl("versions");
			
			return this._callService(url, null);
		},
		_callService : function(url, defaultValue)
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
						
						eventEmitter.emit(defaultValue);
					}).subscribe((result) => 
					{
						this._eventManager.emit("HTTP_END");
						
						eventEmitter.emit(result.json().data);
					});
				}
				else
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(defaultValue);
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