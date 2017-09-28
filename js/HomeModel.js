define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function HomeModel(MsdbService, ConnectionManager, Title, CacheManager) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this._cacheManager = CacheManager;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
				},
				onRefresh: function () {
					if (this.data.mame.build === null) {
						this._msdbService.getMameInfos().subscribe((data) => {
							if (data !== null) {
								data.version = data.build.substr(0, data.build.indexOf("(")).trim();
								this.data.mame = data;
							}
						});
					}
				},
				_getInitData: function () {
					return {
						searchLastType: null,
						mame: {
							build: null
						}
					};
				}
			}
		});
	}
);