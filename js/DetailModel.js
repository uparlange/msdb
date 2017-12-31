define(["AppUtils", "AbstractModel", "AbstractModelHelper"],
	function (AppUtils, AbstractModel, AbstractModelHelper) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function DetailModel(AbstractModelHelper) {
				AbstractModel.call(this, AbstractModelHelper);
				this._socketManagerConfigChangedSubscriber = null;
			},
			parameters: [
				[AbstractModelHelper]
			],
			functions: {
				onInit: function () {
					this._socketManagerConfigChangedSubscriber = this.getSockets().on("CONFIG_CHANGED").subscribe(() => {
						this._refreshGameAvailability();
					});
				},
				onRefresh: function (callback) {
					this.data = this._getInitData();
					this.getServices().getDetail(this.params.name).subscribe((data) => {
						if (data === null) {
							data = {
								name: this.params.name,
								description: "?"
							};
						}
						this.data.game = data;
						const title = this.data.game.description + " - " + this.data.game.name;
						this._setTitle(title);
						this.getServices().search("clones", this.params.name).subscribe((data) => {
							this.data.clones = data;
							callback();
						});
						this._refreshGameAvailability();
					});
				},
				onDestroy: function () {
					this.getSockets().off(this._socketManagerConfigChangedSubscriber);
				},
				playGame: function () {
					this.getSockets().emit("PLAY_GAME", this.params.name);
				},
				setVideoAvailable: function (b) {
					this.data.videoAvailable = b;
				},
				getStatusClass: function (status) {
					return "label-" + status;
				},
				getStatusLabel: function (status) {
					return (status != null) ? "L10N_" + status.toUpperCase() : null;
				},
				getGameSizeLabel: function () {
					let size = 0;
					if (this.data.game.roms !== undefined) {
						this.data.game.roms.forEach((element) => {
							size += parseInt(element.size);
						});
					}
					return this.getSizeLabel(size);
				},
				trackByName: function (index, item) {
					return item ? item.name : undefined;
				},
				trackByTag: function (index, item) {
					return item ? item.tag : undefined;
				},
				_refreshGameAvailability: function () {
					this.data.gameAvailable = false;
					this.getSockets().emit("IS_ROM_AVAILABLE", this.params.name).subscribe((result) => {
						if (result !== null && result.name === this.params.name) {
							this.data.gameAvailable = result.available;
						}
					});
				},
				_getInitData: function () {
					return {
						game: {
							dipswitchs: [],
							chips: [],
							biossets: [],
							ports: [],
							devicerefs: []
						},
						clones: [],
						videoAvailable: true,
						gameAvailable: false
					};
				}
			}
		});
	}
);