define(["AppUtils", "AbstractModel", "AbstractModelHelper", "SocketManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, SocketManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function MyGamesModel(AbstractModelHelper, SocketManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._socketManager = SocketManager;
				this._socketManagerConfigChangedSubscriber = null;
			},
			parameters: [
				[AbstractModelHelper], [SocketManager]
			],
			functions: {
				onInit: function () {
					this._socketManagerConfigChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() => {
						this._refreshList();
					});
				},
				onRefresh: function (callback) {
					this._refreshList(callback);
				},
				onDestroy: function () {
					this._socketManager.off(this._socketManagerConfigChangedSubscriber);
				},
				trackByName: function (index, item) {
					return item ? item.name : undefined;
				},
				_refreshList:function(callback) {
					this.data = this._getInitData();
					this._socketManager.emit("GET_MY_GAMES", null).subscribe((result) => {
						if (result !== null && result.length > 0) {
							this.getServices().search("name", result).subscribe((games) => {
								const allGames = [];
								const allBios = [];
								games.forEach((game) => {
									if (game.isbios === "no") {
										allGames.push(game);
									}
									else {
										allBios.push(game);
									}
								});
								this.data = {
									allGames: allGames,
									allBios: allBios
								};
								if(callback) {
									callback();
								}
							});
						}
					});
				},
				_getInitData: function () {
					return {
						allGames: [],
						allBios: []
					};
				}
			}
		});
	}
);