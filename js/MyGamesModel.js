define(["app:MsdbService", "app:AppUtils", "app:SocketManager"], 
function(MsdbService, AppUtils, SocketManager) 
{
	return ng.core.Class({
		constructor: [SocketManager, MsdbService,
			function (SocketManager, MsdbService)
			{
				this._socketManager = SocketManager;
				
				this._MsdbService = MsdbService;
				
				this._configChangedSubscriber = null;
				
				this.data = this._getInitData();
			}
		],
		init : function()
		{
			this._configChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() =>
			{
				this._refreshGames();
			});
			
			this._refreshGames();
		},
		destroy:function()
		{
			this._socketManager.off(this._configChangedSubscriber);
		},
		getIconUrl : function(game)
		{
			return AppUtils.getIconUrl(game);
		},
		_refreshGames:function()
		{
			this.data = this._getInitData();
			
			this._socketManager.emit("GET_MY_GAMES", null).subscribe((result) =>
			{
				if(result !== null && result.length > 0)
				{
					this._MsdbService.search('name', result).subscribe((games) => 
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
		_getInitData:function()
		{
			return {
				allGames : [],
				allBios : []
			};
		}
	});	
});