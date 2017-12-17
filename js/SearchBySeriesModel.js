define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchBySeriesModel(MsdbService, ConnectionManager, Title) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title]
			],
			functions: {
				onRefresh: function () {
					this._msdbService.getSeries().subscribe((data) => {
						this.data.list = this.getGroupedArrayByFirstLetter(data, "label");
					});
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