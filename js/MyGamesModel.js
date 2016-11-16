define(["app:AbstractViewModel", "app:MsdbService", "app:ConnectionManager", "app:SocketManager"], 
function(AbstractViewModel, MsdbService, ConnectionManager, SocketManager) 
{
	const MyGamesModel = function (MsdbService, ConnectionManager, SocketManager)
	{
		AbstractViewModel.call(this, MsdbService, ConnectionManager);
		
		this._socketManager = SocketManager;
		
		this._socketManagerConfigChangedSubscriber = null;
	};
	
	return ng.core.Class({
		extends:AbstractViewModel,
		constructor: [MsdbService, ConnectionManager, SocketManager, MyGamesModel],
		_init : function()
		{
			this._socketManagerConfigChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() =>
			{
				this._refresh();
			});
		},
		_refresh:function()
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
						games.forEach((game, index, array) =>
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
		_destroy:function()
		{
			this._socketManager.off(this._socketManagerConfigChangedSubscriber);
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