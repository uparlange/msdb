define(["AbstractEventManager", "AppUtils"],  
function(AbstractEventManager, AppUtils) 
{
	return ng.core.Class({
		extends:AbstractEventManager,
		constructor:function AbstractModel (MsdbService, ConnectionManager, Title)
		{
			AbstractEventManager.call(this);
			
			this._msdbService = MsdbService;
			this._connectionManager = ConnectionManager;
			this._title = Title;
			
			this._connectionManagerChangeSubscriber = null;
			this._titleChangeSubscriber = null;
			
			this.params = {};
			
			this.data = this._getInitData();
		},
		init:function(params)
		{
			if(this._connectionManagerChangeSubscriber === null)
			{
				this._connectionManagerChangeSubscriber = this._connectionManager.on("change").subscribe((online) =>
				{
					this.params.online = online;

					if(online)
					{
						this._callRefreshMethod();
					}
				});
			}

			this._setTitle();
			this._titleChangeSubscriber = this.on("titleChange").subscribe((title) => 
			{
				this._setTitle(title);
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
			this._callDestroyMethod();
			
			this._connectionManager.off(this._connectionManagerChangeSubscriber);
			this._connectionManager = null;
			this._connectionManagerChangeSubscriber = null;

			this.off(this._titleChangeSubscriber);
			this._titleChangeSubscriber = null;
			
			this._msdbService = null;
			
			this.params = null;
			
			this.data = null;
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
				this.getLogger().debug("onInit");
				
				this.onInit();
			}
		},
		_callRefreshMethod:function()
		{
			if(typeof this.onRefresh === "function")
			{
				this.getLogger().debug("onRefresh");
				
				this.onRefresh();
			}
		},
		_callDestroyMethod:function()
		{
			if(typeof this.onDestroy === "function")
			{
				this.getLogger().debug("onDestroy");
				
				this.onDestroy();
			}
			else
			{
				this.getLogger().warn("onDestroy?");
			}
		},
		_setTitle : function(value)
		{
			let title = "Mame Smart Database";
			if(typeof value === "string")
			{
				title += " - " + value;
			} 
			this._title.setTitle(title);
		}
	});			
});