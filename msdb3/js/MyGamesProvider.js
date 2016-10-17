define(["app:MsdbProvider", "app:AppUtils", "app:SocketManager"], 
function(MsdbProvider, AppUtils, SocketManager) 
{
	return ng.core.Class({
		constructor: [SocketManager, MsdbProvider,
			function (SocketManager, MsdbProvider)
			{
				this._socketManager = SocketManager;
				
				this._msdbProvider = MsdbProvider;
				
				this.data = this._getInitData();
			}
		],
		init : function()
		{
			this.data = this._getInitData();
		
			this._socketManager.sendMessage("GET_MY_GAMES", null).subscribe((result) =>
			{
				if(result !== null && result.length > 0)
				{
					this._msdbProvider.search('name', result).subscribe((games) => 
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
		getIconUrl : function(game)
		{
			return AppUtils.getIconUrl(game);
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