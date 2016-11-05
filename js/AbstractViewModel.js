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
			
			this.online = this._connectionManager.online;
			
			this.data = this._getInitData();
		},
		init:function(params)
		{
			this._connectionManagerChangeSubscriber = this._connectionManager.on("change").subscribe((online) =>
			{
				this.online = online;
				if(online)
				{
					this._callRefreshMethod();
				}
			});
			
			if(JSON.stringify(this.params) !== JSON.stringify(params))
			{
				this.params = params;
				
				this._callInitMethod();
				
				this._callRefreshMethod();
			}
		},
		destroy:function()
		{
			this._connectionManager.off(this._connectionManagerChangeSubscriber);
			
			this._callDestroyMethod();
		},
		getGameIconUrl : function(game)
		{
			return AppUtils.getGameIconUrl(game);
		},
		getGameFolder:function(game)
		{
			return AppUtils.getGameFolder(game);
		},
		getGameVideoUrl:function(game)
		{
			return AppUtils.getGameVideoUrl(game);
		},	
		getGameSizeLabel:function()
		{
			let size = 0;
			if(this.data.game.roms !== undefined)
			{
				this.data.game.roms.forEach((element, index, array) =>
				{
					size += parseInt(element.size);
				});
			}
			return this.getSizeLabel(size);
		},
		getEncodedValue:function(value)
		{
			return AppUtils.getEncodedValue(value);
		},
		getDecodedValue:function(value)
		{
			return AppUtils.getDecodedValue(value);
		},
		getSizeLabel: function (value)
		{
			return AppUtils.getSizeLabel(value);
		},
		getFrequencyLabel: function (value)
		{
			return AppUtils.getFrequencyLabel(value);
		},		
		_callInitMethod:function()
		{
			if(typeof this._init === "function")
			{
				this._init();
			}
		},
		_callRefreshMethod:function()
		{
			if(typeof this._refresh === "function")
			{
				this._refresh();
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