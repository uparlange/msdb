define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByYearsModel(MsdbService, ConnectionManager, Title) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title]
			],
			functions: {
				onInit: function () {
					this._msdbService.getYears().subscribe((data) => {
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
				_getInitData: function () {
					return {
						list: null
					};
				}
			}
		});
	}
);