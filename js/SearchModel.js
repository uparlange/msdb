define(["AppUtils", "AbstractModel", "AbstractClassHelper", "MsdbService"],
	function (AppUtils, AbstractModel, AbstractClassHelper, MsdbService) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchModel(AbstractClassHelper, MsdbService) {
				AbstractModel.call(this, AbstractClassHelper, MsdbService);
				this._tabsInfo = this._getTabsInfo();
			},
			parameters: [
				[AbstractClassHelper], [MsdbService]
			],
			functions: {
				onInit: function () {
					const type = this.getRouter().getUrlWithoutQueryParams().split("/")[2];
					const tabInfo = this.getTabsInfo().byType(type);
					this.data.selectedIndex = tabInfo.index;
				},
				tabChanged: function (event) {
					const tabInfo = this.getTabsInfo().byIndex(event.index);
					this.getCache().setItem("searchLastType", tabInfo.type);
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
							{ index: 1, key: "L10N_SEARCH_BY_RATING", type: "ratings" },
							{ index: 2, key: "L10N_SEARCH_BY_CATEGORY", type: "categories" },
							{ index: 3, key: "L10N_SEARCH_BY_SERIES", type: "series" },
							{ index: 4, key: "L10N_SEARCH_BY_YEAR", type: "years" },
							{ index: 5, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers" },
							{ index: 6, key: "L10N_SEARCH_BY_MAMEVERSIONADDED", type: "versions" }
							
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