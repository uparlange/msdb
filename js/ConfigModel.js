define(["AppUtils", "AbstractModel", "AbstractModelHelper", "SocketManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, SocketManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function ConfigModel(AbstractModelHelper, SocketManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._socketManager = SocketManager;
			},
			parameters: [
				[AbstractModelHelper], [SocketManager]
			],
			functions: {
				onRefresh: function (callback) {
					this._getConfiguration(callback);
				},
				save: function () {
					this._socketManager.emit("SAVE_CONFIGURATION", this.data.newValue).subscribe((result) => {
						if (result !== null) {
							this._getConfiguration();
						}
					});
				},
				cancel: function () {
					this._getConfiguration();
				},
				checkFormChanges: function () {
					this.data.newValue.romsDirectory = (typeof this.data.newValue.mameDirectory === "string" && this.data.newValue.mameDirectory.length > 0) ? this.data.newValue.mameDirectory + "\\roms" : null;
					this.data.enabled = this.hasChanges();
				},
				hasChanges: function () {
					const newValue = JSON.stringify(this.data.newValue);
					return (this.data.oldValue !== newValue);
				},
				_getConfiguration: function (callback) {
					this._socketManager.emit("GET_CONFIGURATION").subscribe((result) => {
						if (result !== null) {
							this.data.oldValue = JSON.stringify(result);
							this.data.newValue = result;
							this.data.enabled = false;
						}
						if (callback) {
							callback();
						}
					});
				},
				_getInitData: function () {
					return {
						oldValue: {},
						newValue: {},
						enabled: false
					};
				}
			}
		});
	}
);