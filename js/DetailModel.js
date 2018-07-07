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
		this.UNKNOWN_GAME_DESCRIPTION = "?";
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
				data = {
					name: this.params.name,
					description: this.UNKNOWN_GAME_DESCRIPTION,
					clones: [],
					images: [],
					gameAvailable: false
				};
			}
			this.data.game = data;
			if (this.data.game.description !== this.UNKNOWN_GAME_DESCRIPTION) {
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
				const title = `${this.data.game.description} - ${this.data.game.name}`;
				this._setTitle(title);
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
	playGame() {
		this.getSocket().emit("PLAY_GAME", this.params.name);
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