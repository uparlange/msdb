import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class SearchModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
		this._tabsInfo = this._getTabsInfo();
	}
	onInit() {
		const type = this.getRouter().getUrlWithoutQueryParams().split("/")[2];
		const tabInfo = this.getTabsInfo().byType(type);
		this.data.selectedIndex = tabInfo.index;
	}
	tabChanged(event) {
		const tabInfo = this.getTabsInfo().byIndex(event.index);
		this.getCache().setItem("searchLastType", tabInfo.type, "version");
	}
	getSearchTabLabel(index) {
		const tabInfo = this.getTabsInfo().byIndex(index);
		return tabInfo.key;
	}
	getTabsInfo() {
		return this._tabsInfo;
	}
	trackByKey(index, item) {
		return item ? item.key : undefined;
	}
	_getInitData() {
		return {
			selectedIndex: 0
		};
	}
	_getTabsInfo() {
		return {
			_tabs: [
				{ index: 0, key: "L10N_SEARCH_BY_DESCRIPTION", type: "description", icon: "magnify" },
				{ index: 1, key: "L10N_SEARCH_BY_RATING", type: "ratings", icon: "star-circle-outline" },
				{ index: 2, key: "L10N_SEARCH_BY_CATEGORY", type: "categories", icon: "folder-outline" },
				{ index: 3, key: "L10N_SEARCH_BY_SERIES", type: "series", icon: "format-list-bulleted" },
				{ index: 4, key: "L10N_SEARCH_BY_YEAR", type: "years", icon: "calendar" },
				{ index: 5, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers", icon: "domain" },
				{ index: 6, key: "L10N_SEARCH_BY_VERSION", type: "versions", icon: "plus-one" }
			],
			getTabs() {
				return this._tabs;
			},
			byIndex(value) {
				let tab = null;
				this._tabs.forEach((item) => {
					if (item.index === value) {
						tab = item;
						return;
					}
				});
				return tab;
			},
			byType(value) {
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

export default SearchModel;