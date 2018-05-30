import AppUtils from "./AppUtils.js";
import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

export default AppUtils.getClass({
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
		trackByKey: function (index, item) {
			return item ? item.key : undefined;
		},
		_getInitData: function () {
			return {
				selectedIndex: 0
			};
		},
		_getTabsInfo: function () {
			return {
				_tabs: [
					{ index: 0, key: "L10N_SEARCH_BY_DESCRIPTION", type: "description", icon: "search" },
					{ index: 1, key: "L10N_SEARCH_BY_RATING", type: "ratings", icon: "stars" },
					{ index: 2, key: "L10N_SEARCH_BY_CATEGORY", type: "categories", icon: "folder_open" },
					{ index: 3, key: "L10N_SEARCH_BY_SERIES", type: "series", icon: "list" },
					{ index: 4, key: "L10N_SEARCH_BY_YEAR", type: "years", icon: "today" },
					{ index: 5, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers", icon: "business" },
					{ index: 6, key: "L10N_SEARCH_BY_VERSION", type: "versions", icon: "plus_one" }
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