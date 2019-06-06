import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class DetailModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
		this._socketConfigChangedSubscriber = null;
	}
	onInit() {
		this._socketConfigChangedSubscriber = this.getSocket().on("CONFIG_CHANGED").subscribe(() => {
			this._refreshGameAvailability();
		});
	}
	onRefresh(callback) {
		this.data = this._getInitData();
		this.getServices().getDetail(this.params.name).subscribe((data) => {
			if (data === null) {
				this.data.game.description = this.params.name;
			} else {
				this.data.game = data;
				this.getHistory().add({ label: this.data.game.description, url: this.getRouter().getUrl(), icon: "gamepad" });
				const images = [];
				this.data.game.images.forEach((image) => {
					if (image.name.indexOf(".ico") === -1) {
						images.push({
							name: image.name,
							src: `${this.getGameFolder(this.data.game)}/${image.name}`,
							w: image.width,
							h: image.height
						});
					}
				});
				this.data.images = images;
				this.setTitle(`${this.data.game.description}`);
				this.setKeywords(`${this.data.game.name}, ${this.data.game.description}`);
				this.getServices().search("clones", this.params.name).subscribe((data) => {
					this.data.clones = data;
					callback();
				});
				this._refreshGameAvailability();
			}
		});
	}
	onDestroy() {
		this._socketConfigChangedSubscriber.unsubscribe();
	}
	inFavorites(game) {
		return this.getFavorites().has(game.name);
	}
	addToFavorite(game) {
		this.getFavorites().add(game.name);
	}
	removeFromFavorites(game) {
		this.getFavorites().remove(game.name);
	}
	playGame(game) {
		this.getSocket().emit("PLAY_GAME", game.name);
	}
	getStatusClass(status) {
		return `label-${status}`;
	}
	getStatusLabel(status) {
		return (status != null) ? `L10N_${status.toUpperCase()}` : null;
	}
	getGameSizeLabel() {
		let size = 0;
		if (this.data.game.roms !== undefined) {
			this.data.game.roms.forEach((element) => {
				size += parseInt(element.size);
			});
		}
		return this.getSizeLabel(size);
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
	}
	trackByTag(index, item) {
		return item ? item.tag : undefined;
	}
	_refreshGameAvailability() {
		this.data.gameAvailable = false;
		this.getSocket().emit("IS_ROM_AVAILABLE", this.params.name).subscribe((result) => {
			if (result !== null && result.name === this.params.name) {
				this.data.gameAvailable = result.available;
			}
		});
	}
	_getInitData() {
		return {
			game: {
				dipswitchs: [],
				chips: [],
				biossets: [],
				ports: [],
				devicerefs: []
			},
			clones: [],
			images: [],
			gameAvailable: false
		};
	}
}

export default DetailModel;