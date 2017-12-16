define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager", "CacheManager",
	"RouterManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager, CacheManager,
		RouterManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchModel(MsdbService, ConnectionManager, Title, CacheManager, RouterManager) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this._cacheManager = CacheManager;
				this._routerManager = RouterManager;
				this._tabsInfo = this._getTabsInfo();
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [CacheManager], [RouterManager]
			],
			functions: {
				onInit: function () {
					const type = this._routerManager.getLocation().path().split("/")[2];
					const tabInfo = this._tabsInfo.byType(type);
					this.data.selectedIndex = tabInfo.index;
				},
				onRefresh: function () {

				},
				onDestroy: function () {

				},
				tabChanged: function (event) {
					const tabInfo = this._tabsInfo.byIndex(event.index);
					this._cacheManager.setItem("searchLastType", tabInfo.type);
				},
				getSearchTabLabel: function (index) {
					const tabInfo = this._tabsInfo.byIndex(index);
					return tabInfo.key;
				},
				_getInitData: function () {
					return {
						selectedIndex: 0
					};
				},
				_getTabsInfo: function () {
					return {
						_tabs: [
							{ index: 0, key: "L10N_SEARCH_BY_DESCRIPTION", type: "description" },
							{ index: 1, key: "L10N_SEARCH_BY_CATEGORY", type: "categories" },
							{ index: 2, key: "L10N_SEARCH_BY_SERIES", type: "series" },
							{ index: 3, key: "L10N_SEARCH_BY_YEAR", type: "years" },
							{ index: 4, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers" },
							{ index: 5, key: "L10N_SEARCH_BY_MAMEVERSIONADDED", type: "versions" }
						],
						getTabs: function () {
							return this._tabs;
						},
						byIndex: function (value) {
							let tab = null;
							this._tabs.forEach((item) => {
								if (item.index === value) {
									tab = item;
									return;
								}
							});
							return tab;
						},
						byType: function (value) {
							let tab = null;
							this._tabs.forEach((item) => {
								if (item.type === value) {
									tab = item;
									return;
								}
							});
							return tab;
						}
					};
				}
			}
		});
	}
);