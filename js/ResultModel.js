define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function ResultModel(MsdbService, ConnectionManager, Title) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this.SYSTEM_DEVICE = "System / Device";
				this.SYSTEM_BIOS = "System / BIOS";
				this.showBios = false;
				this.showDevice = false;
				this.showClone = false;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title]
			],
			functions: {
				onInit: function () {
					switch (this.params.value) {
						case this.SYSTEM_DEVICE:
							this.showBios = false;
							this.showDevice = true;
							this.showClone = false;
							break;
						case this.SYSTEM_BIOS:
							this.showBios = true;
							this.showDevice = false;
							this.showClone = false;
							break;
						default:
							this.showBios = false;
							this.showDevice = false;
							this.showClone = true;
							break;
					}
				},
				onRefresh: function () {
					this.data = this._getInitData();
					this._msdbService.search(this.params.type, this.params.value).subscribe((data) => {
						this.data.count = Array.isArray(data) ? data.length : 0;
						this.data.list = this.getGroupedArrayByFirstLetter(data, "description");
					});
				},
				canShowGame: function (game) {
					return (
						(game.category !== this.SYSTEM_DEVICE && game.category !== this.SYSTEM_BIOS && game.cloneof == null) ||
						(game.cloneof != null && this.showClone) ||
						(game.category === this.SYSTEM_DEVICE && this.showDevice) ||
						(game.category === this.SYSTEM_BIOS && this.showBios)
					)
				},
				getSearchLabel: function (type) {
					return (type) ? "L10N_SEARCH_BY_" + type.toUpperCase() : "";
				},
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				trackByName: function (index, item) {
					return item ? item.name : undefined;
				},
				_getInitData: function () {
					return {
						list: [],
						count: -1
					};
				}
			}
		})
	}
);