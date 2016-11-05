define(["app:AppUtils"],  
function(AppUtils) 
{
	return ng.core.Class({
		constructor:function (MsdbService, ConnectionManager)
		{
			this._msdbService = MsdbService;
			this._connectionManager = ConnectionManager;
			
			this._connectionManagerChangeSubscriber = null;
			
			this.params = null;
			
			this.data = this._getInitData();
		},
		init:function(params)
		{
			this._connectionManagerChangeSubscriber = this._connectionManager.on("change").subscribe((online) =>
			{
				if(online)
				{
					this._callInitMethod();
				}
			});
			
			if(JSON.stringify(this.params) !== JSON.stringify(params))
			{
				this.params = params;
				
				this._callInitMethod();
			}
		},
		destroy:function()
		{
			this._connectionManagerChangeSubscriber.unsubscribe();
			
			this._callDestroyMethod();
		},
		getIconUrl : function(game)
		{
			return AppUtils.getIconUrl(game);
		},
		getEncodedValue:function(value)
		{
			return AppUtils.getEncodedValue(value);
		},
		getDecodedValue:function(value)
		{
			return AppUtils.getDecodedValue(value);
		},
		_callInitMethod:function()
		{
			if(typeof this._init === "function")
			{
				this._init();
			}
		},
		_callDestroyMethod:function()
		{
			if(typeof this._destroy === "function")
			{
				this._destroy();
			}
		}
	});			
});