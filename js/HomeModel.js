define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function HomeModel(MsdbService, ConnectionManager, Title, CacheManager) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this._cacheManager = CacheManager;
				//this._cacheManagerOnChangeSubscriber = null;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
					/*
					this._cacheManagerOnChangeSubscriber = this._cacheManager.on("change").subscribe((event) => {
						if (event.key === "searchLastType") {
							this.data.searchLastType = event.newValue;
						}
					});
					*/
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
				onDestroy: function () {
					
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