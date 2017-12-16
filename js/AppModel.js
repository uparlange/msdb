define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function AppModel(MsdbService, ConnectionManager, Title, CacheManager) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this._cacheManager = CacheManager;
				this._cacheManagerOnChangeSubscriber = null;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
					this._cacheManagerOnChangeSubscriber = this._cacheManager.on("change").subscribe((event) => {
						if (event.key === "searchLastType") {
							this.data.searchLastType = event.newValue;
						}
					});
				},
				onDestroy: function () {
					this._cacheManager.off(this._cacheManagerOnChangeSubscriber);
				},
				_getInitData: function () {
					return {
						searchLastType: null
					};
				}
			}
		});
	}
);