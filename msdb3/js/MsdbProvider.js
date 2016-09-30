define(["EventManager", "AppUtils"], 
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
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const url = AppUtils.getServiceUrl("mameinfos");
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
			});
			return eventEmitter;
		},
		getDetail : function(name)
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const url = AppUtils.getServiceUrl("detail") + "?name=" + name;
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
			});
			return eventEmitter;
		},
		search : function(type, value)
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const params = {};
				params[type] = value;
				const url = AppUtils.getServiceUrl("search") + "?params=" + JSON.stringify(params);
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
			});
			return eventEmitter;
		},
		getYears : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const url = AppUtils.getServiceUrl("years");
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
			});
			return eventEmitter;
		},
		getSeries : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const url = AppUtils.getServiceUrl("series");
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
			});
			return eventEmitter;
		},
		getCategories : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const url = AppUtils.getServiceUrl("categories");
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
			});
			return eventEmitter;
		},
		getManufacturers : function()
		{
			const eventEmitter = new ng.core.EventEmitter();
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._init().subscribe(() => 
			{
				const url = AppUtils.getServiceUrl("manufacturers");
				this._http.get(url).subscribe((result) => 
				{
					this._eventManager.emit("HTTP_END");
					
					eventEmitter.emit(result.json().data);
				});
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
				this._http.get(AppUtils.getServiceUrl("init")).subscribe(() => 
				{
					eventEmitter.emit();
					
					this._initialized = true;
				});
			}
			return eventEmitter;
		}
	});
});