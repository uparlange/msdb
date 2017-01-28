define(["AbstractModel", "MsdbService", "ConnectionManager", "SocketManager"], 
function(AbstractModel, MsdbService, ConnectionManager, SocketManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, SocketManager, 
			function MyGamesModel (MsdbService, ConnectionManager, SocketManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
				
				this._socketManager = SocketManager;
				
				this._socketManagerConfigChangedSubscriber = null;
			}
		],
		onInit : function()
		{
			this._socketManagerConfigChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() =>
			{
				this.onRefresh();
			});
		},
		onRefresh:function()
		{
			this.data = this._getInitData();
			
			this._socketManager.emit("GET_MY_GAMES", null).subscribe((result) =>
			{
				if(result !== null && result.length > 0)
				{
					this._msdbService.search("name", result).subscribe((games) => 
					{
						const allGames = [];
						const allBios = [];
						games.forEach((game) =>
						{
							if(game.isbios === "no")
							{
								allGames.push(game);
							}
							else
							{
								allBios.push(game);
							}
						});
						
						this.data = {
							allGames : allGames,
							allBios : allBios
						};
					});
				}
			});
		},
		onDestroy:function()
		{
			this._socketManager.off(this._socketManagerConfigChangedSubscriber);
		},
		trackByName:function(index, item)
		{
			return item ? item.name : undefined;
		},
		_getInitData:function()
		{
			return {
				allGames : [],
				allBios : []
			};
		}
	});	
});