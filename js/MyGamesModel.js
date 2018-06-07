import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

class MyGamesModel extends AbstractModel {
	static get parameters() {
		return this.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
		this._socketConfigChangedSubscriber = null;
	}
	onInit() {
		this._socketConfigChangedSubscriber = this.getSocket().on("CONFIG_CHANGED").subscribe(() => {
			this._refreshList();
		});
	}
	onRefresh(callback) {
		this._refreshList(callback);
	}
	onDestroy() {
		this._socketConfigChangedSubscriber.unsubscribe();
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
	}
	_refreshList(callback) {
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
	}
	_getInitData() {
		return {
			allGames: [],
			allBios: []
		};
	}
}

export default MyGamesModel;