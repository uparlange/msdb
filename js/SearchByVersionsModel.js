define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByVersionsModel(MsdbService, ConnectionManager, Title) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title]
			],
			functions: {
				onInit: function () {
					this._msdbService.getVersions().subscribe((data) => {
						this.data.list = data;
					});
				},
				onRefresh: function () {

				},
				onDestroy: function () {

				},
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				getVersion: function (value) {
					let version = value;
					version = version.replace("0.00", "0");
					version = version.replace("0.0", "0");
					version = version.replace("0.", "0");
					return version.toLowerCase();
				},
				changeLogAvailable: function (value) {
					return (value.indexOf("u") === -1 && value.indexOf("b") === -1);
				},
				_getInitData: function () {
					return {
						list: null
					};
				}
			}
		});
	}
);