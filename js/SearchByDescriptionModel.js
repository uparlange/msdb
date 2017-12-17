define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByDescriptionModel(MsdbService, ConnectionManager, Title, CacheManager) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this._cacheManager = CacheManager;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.description = this._cacheManager.getItem("searchDescription", "");
				},
				onDestroy: function () {
					this._cacheManager.setItem("searchDescription", this.data.description);
				},
				_getInitData: function () {
					return {
						description: ""
					};
				}
			}
		});
	}
);