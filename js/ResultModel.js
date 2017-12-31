define(["AppUtils", "AbstractModel", "AbstractModelHelper"],
	function (AppUtils, AbstractModel, AbstractModelHelper) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function ResultModel(AbstractModelHelper) {
				AbstractModel.call(this, AbstractModelHelper);
				this.SYSTEM_DEVICE = "System / Device";
				this.SYSTEM_BIOS = "System / BIOS";
				this.showBios = false;
				this.showDevice = false;
				this.showClone = false;
			},
			parameters: [
				[AbstractModelHelper]
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
				onRefresh: function (callback) {
					this.data = this._getInitData();
					this.getServices().search(this.params.type, this.params.value).subscribe((data) => {
						this.data.count = Array.isArray(data) ? data.length : 0;
						this.data.list = this.getGroupedArrayByFirstLetter(data, "description");
						callback();
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