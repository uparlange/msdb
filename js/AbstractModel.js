define(["app:AbstractClass", "app:AppUtils"],  
function(AbstractClass, AppUtils) 
{
	const AbstractModel = function (MsdbService, ConnectionManager)
	{
		AbstractClass.call(this);
		
		this._msdbService = MsdbService;
		this._connectionManager = ConnectionManager;
		
		this._connectionManagerChangeSubscriber = null;
		
		this.params = {};
		
		this.data = this._getInitData();
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractModel,
		init:function(params)
		{
			this._connectionManagerChangeSubscriber = this._connectionManager.on("change").subscribe((online) =>
			{
				this.params.online = online;
				if(online)
				{
					this._callRefreshMethod();
				}
			});
			
			const currentParams = this.params;
			const newParams = Object.assign({online:this._connectionManager.online}, params);
			
			if(JSON.stringify(currentParams) !== JSON.stringify(newParams))
			{
				this.params = newParams;
				
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
			if(typeof this.onInit === "function")
			{
				this.getLogger().info("onInit");
				
				this.onInit();
			}
		},
		_callRefreshMethod:function()
		{
			if(typeof this.onRefresh === "function")
			{
				this.getLogger().info("onRefresh");
				
				this.onRefresh();
			}
		},
		_callDestroyMethod:function()
		{
			if(typeof this.onDestroy === "function")
			{
				this.getLogger().info("onDestroy");
				
				this.onDestroy();
			}
			else
			{
				this.getLogger().warn("onDestroy?");
			}
		}
	});			
});