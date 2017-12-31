define(["AppUtils", "AbstractModel", "AbstractModelHelper", "CacheManager",
	"RouterManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, CacheManager,
		RouterManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchModel(AbstractModelHelper, CacheManager, RouterManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._cacheManager = CacheManager;
				this._routerManager = RouterManager;
				this._tabsInfo = this._getTabsInfo();
			},
			parameters: [
				[AbstractModelHelper], [CacheManager], [RouterManager]
			],
			functions: {
				onInit: function () {
					const type = this._routerManager.getUrlWithoutQueryParams().split("/")[2];
					const tabInfo = this.getTabsInfo().byType(type);
					this.data.selectedIndex = tabInfo.index;
				},
				tabChanged: function (event) {
					const tabInfo = this.getTabsInfo().byIndex(event.index);
					this._cacheManager.setItem("searchLastType", tabInfo.type);
				},
				getSearchTabLabel: function (index) {
					const tabInfo = this.getTabsInfo().byIndex(index);
					return tabInfo.key;
				},
				getTabsInfo: function () {
					return this._tabsInfo;
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