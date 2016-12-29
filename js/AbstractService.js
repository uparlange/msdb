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
		httpGet:function(url, params, defaultValue)
		{
			const source = this._http.get(url,{search:params});

			return this._httpCall(source, defaultValue);
		},
		_httpCall:function(source, defaultValue)
		{
			const eventEmitter = new ng.core.EventEmitter();

			if(defaultValue === undefined)
			{
				defaultValue = null;
			}
			
			this._eventManager.emit("HTTP_BEGIN");
			
			source.timeout(GlobalConfig.HTTP_REQUEST_TIMEOUT).subscribe((result) => 
			{
				this._eventManager.emit("HTTP_END");

				eventEmitter.emit(result.json());
			},(error) =>
			{
				this._eventManager.emit("HTTP_END");

				eventEmitter.emit(defaultValue);
			});
			
			return eventEmitter;
		}
	});			
});