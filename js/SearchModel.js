define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager", "CacheManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchModel(MsdbService, ConnectionManager, Title, CacheManager, Router) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				this._cacheManager = CacheManager;
				this._router = Router;
				this._tabsInfo = this._getTabsInfo();
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [CacheManager], [ng.router.Router]
			],
			functions: {
				onInit: function () {
					this.data.description = this._cacheManager.getItem("searchDescription", "");
				},
				onRefresh: function () {
					const type = (this.params.type !== undefined) ? this.params.type : "description";
					const tabInfo = this._tabsInfo.byType(type);
					this._cacheManager.setItem("searchLastType", tabInfo.type);
					const methodeName = "_load" + type[0].toUpperCase() + type.substring(1);
					this[methodeName]().subscribe(() => {
						this.data.selectedIndex = tabInfo.index;
					});
				},
				onDestroy: function () {
					this._cacheManager.setItem("searchDescription", this.data.description);
				},
				tabChanged: function (event) {
					const tabInfo = this._tabsInfo.byIndex(event.index);
					this._displayTabView(tabInfo.type);
				},
				getSearchTabLabel: function (index) {
					const tabInfo = this._tabsInfo.byIndex(index);
					return tabInfo.key;
				},
				getVersion: function (value) {
					let version = value;
					version = version.replace("0.00", "0");
					version = version.replace("0.0", "0");
					version = version.replace("0.", "0");
					return version.toLowerCase();
				},
				changeLogAvailable: function (value) {
					return (value.indexOf("u") === -1 && value.indexOf("b") === -1);
				},
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				_displayTabView: function (type) {
					this._router.navigate(['/search'], {
						queryParams: {
							type: type
						}
					});
				},
				_loadDescription: function () {
					const eventEmitter = new ng.core.EventEmitter();
					setTimeout(() => {
						this.data.count = 0;
						eventEmitter.emit();
					});
					return eventEmitter;
				},
				_loadYears: function () {
					return this._loadData("years");
				},
				_loadSeries: function () {
					return this._loadData("series");
				},
				_loadCategories: function () {
					return this._loadData("categories");
				},
				_loadManufacturers: function () {
					return this._loadData("manufacturers");
				},
				_loadVersions: function () {
					return this._loadData("versions");
				},
				_getInitData: function () {
					return {
						selectedIndex: 0,
						description: "",
						years: { list: null, count: 0 },
						series: { list: null, count: 0 },
						categories: { list: null, count: 0 },
						manufacturers: { list: null, count: 0 },
						versions: { list: null, count: 0 },
						count: 0,
						itemByPage: 20
					};
				},
				_loadData: function (dataName) {
					const eventEmitter = new ng.core.EventEmitter();
					this.data.count = 0;
					if (this.data[dataName].list === null) {
						const serviceName = "get" + dataName[0].toUpperCase() + dataName.substr(1);
						this._msdbService[serviceName]().subscribe((data) => {
							if (Array.isArray(data)) {
								this.data[dataName].count = data.length;
								this.data.count = data.length;
								const groups = {};
								data.forEach((item) => {
									let group = null;
									const letter = item.label[0].toUpperCase();
									group = isNaN(parseInt(letter)) ? letter : "0-9";
									if (groups[group] === undefined) {
										groups[group] = [];
									}
									groups[group].push(item);
								});
								const list = [];
								for (let group in groups) {
									list.push({
										label: group,
										data: groups[group]
									});
								}
								this.data[dataName].list = list;
								eventEmitter.emit();
							}
						});
					}
					else {
						setTimeout(() => {
							this.data.count = this.data[dataName].count;
							eventEmitter.emit();
						});
					}
					return eventEmitter;
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