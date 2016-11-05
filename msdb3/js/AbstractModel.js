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
			this._connectionManagerChangeSubscriber.unsubscribe();
			
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
			var lbl = value + " Octet(s)";
			if (value >= 1073741824)
			{
				lbl = (Math.round(value / 1073741824 * 100) / 100) + " Go";
			}
			else if (value >= 1048576)
			{
				lbl = (Math.round(value / 1048576 * 100) / 100) + " Mo";
			}
			else if (value >= 1024)
			{
				lbl = (Math.round(value / 1024 * 100) / 100) + " Ko";
			}
			return lbl;
		},
		getFrequencyLabel: function (value)
		{
			var lbl = value + " Hz";
			if (value >= 1000000000)
			{
				lbl = (Math.round(value / 1073741824 * 100) / 100) + " GHz";
			}
			else if (value >= 1000000)
			{
				lbl = (Math.round(value / 1048576 * 100) / 100) + " MHz";
			}
			return lbl;
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