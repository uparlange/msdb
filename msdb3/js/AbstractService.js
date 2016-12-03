define(["app:AbstractClass"],
function (AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor:function AbstractService (http, eventManager)
		{
			AbstractClass.call(this);
			
			this._http = http;
			
			this._eventManager = eventManager;
		},
		httpGet:function(url, defaultValue)
		{
			const eventEmitter = new ng.core.EventEmitter();

			if(defaultValue === undefined)
			{
				defaultValue = null;
			}
			
			this._eventManager.emit("HTTP_BEGIN");
			
			this._http.get(url).catch((e) =>
			{
				this._eventManager.emit("HTTP_END");
				
				eventEmitter.emit(defaultValue);
			}).subscribe((result) => 
			{
				this._eventManager.emit("HTTP_END");
				
				eventEmitter.emit(result.json());
			});
			
			return eventEmitter;
		}
	});			
});