import AppUtils from "./AppUtils.js";
import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

export default AppUtils.getClass({
	extends: AbstractModel,
	constructor: function MyGamesModel(AbstractClassHelper, MsdbService) {
		AbstractModel.call(this, AbstractClassHelper, MsdbService);
		this._socketConfigChangedSubscriber = null;
	},
	parameters: [
		[AbstractClassHelper], [MsdbService]
	],
	functions: {
		onInit: function () {
			this._socketConfigChangedSubscriber = this.getSocket().on("CONFIG_CHANGED").subscribe(() => {
				this._refreshList();
			});
		},
		onRefresh: function (callback) {
			this._refreshList(callback);
		},
		onDestroy: function () {
			this._socketConfigChangedSubscriber.unsubscribe();
		},
		trackByName: function (index, item) {
			return item ? item.name : undefined;
		},
		_refreshList: function (callback) {
			this.data = this._getInitData();
			this.getSocket().emit("GET_MY_GAMES", null).subscribe((result) => {
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
						if (callback) {
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