define(["app:AbstractClass", "app:AppUtils"],  
function(AbstractClass, AppUtils) 
{
	const AbstractViewModel = function (MsdbService, ConnectionManager)
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
		constructor:AbstractViewModel,
		init:function(params)
		{
			console.info(this.constructor.name, "init");
			
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
			console.info(this.constructor.name, "destroy");
			
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
				console.info(this.constructor.name, "_init");
				
				this._init();
			}
		},
		_callRefreshMethod:function()
		{
			if(typeof this._refresh === "function")
			{
				console.info(this.constructor.name, "_refresh");
				
				this._refresh();
			}
		},
		_callDestroyMethod:function()
		{
			if(typeof this._destroy === "function")
			{
				console.info(this.constructor.name, "_destroy");
				
				this._destroy();
			}
		}
	});			
});