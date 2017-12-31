define(["AbstractClass", "AppUtils"],
	function (AbstractClass, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractModel(AbstractModelHelper) {
				AbstractClass.call(this);
				this.params = {};
				this.data = this._getInitData();
				this._helper = AbstractModelHelper;
				this._connectionManagerChangeSubscriber = null;
			},
			functions: {
				init: function (params) {
					this._connectionManagerChangeSubscriber = this._helper.connectionManager.on("change").subscribe((online) => {
						this.params.online = online;
						if (online) {
							this._callRefreshMethod(() => {
								this._helper.routerManager.restoreScrollPosition();
							});
						}
					});
					this._setTitle();
					this._callInitMethod();
					this._helper.routerManager.restoreScrollPosition();
					const currentParams = this.params;
					const newParams = Object.assign({ online: this._helper.connectionManager.online }, params);
					if (JSON.stringify(currentParams) !== JSON.stringify(newParams)) {
						this.params = newParams;
						this._callRefreshMethod(() => {
							this._helper.routerManager.restoreScrollPosition();
						});
					}
				},
				destroy: function () {
					this._callDestroyMethod();
					this._helper.connectionManager.off(this._connectionManagerChangeSubscriber);
				},
				getServices: function () {
					return this._helper.msdbService;
				},
				getSockets: function () {
					return this._helper.socketManager;
				},
				getGameIconUrl: function (game) {
					return AppUtils.getGameIconUrl(game);
				},
				getGameFolder: function (game) {
					return AppUtils.getGameFolder(game);
				},
				getGameVideoUrl: function (game) {
					return AppUtils.getGameVideoUrl(game);
				},
				getSizeLabel: function (value) {
					return this._getUnitLabel(value, ["B", "KiB", "MiB", "GiB"], 1024);
				},
				getFrequencyLabel: function (value) {
					return this._getUnitLabel(value, ["Hz", "kHz", "MHz", "GHz"], 1000);
				},
				getGroupedArrayByFirstLetter: function (data, attribute) {
					if (!Array.isArray(data)) {
						return data;
					}
					const groups = {};
					data.forEach((item) => {
						let group = null;
						const letter = item[attribute][0].toUpperCase();
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
					return list;
				},
				getGroupedArrayByItemsNumber: function (data, number) {
					if (!Array.isArray(data)) {
						return data;
					}
					const list = [];
					let group = null;
					let groupIndex = 0;
					data.forEach((item, index) => {
						if (groupIndex === 0) {
							group = {
								label: (index + 1) + " ... " + (index + number),
								data: []
							};
							list.push(group);
						}
						group.data.push(item);
						groupIndex++;
						if (groupIndex === number) {
							groupIndex = 0;
						}
					});
					return list;
				},
				_getUnitLabel: function (value, steps, stepMultiplier) {
					let step = null;
					steps.forEach((item, index) => {
						const stepValue = Math.pow(stepMultiplier, index);
						if (value >= stepValue) {
							step = { unit: item, value: stepValue };
						}
						else {
							return;
						}
					});
					return (Math.round(value / step.value * 100) / 100) + " " + step.unit;
				},
				_callInitMethod: function () {
					if (typeof this.onInit === "function") {
						this.getLogger().debug("onInit");
						this.onInit();
					}
				},
				_callRefreshMethod: function (callback) {
					if (typeof this.onRefresh === "function") {
						this.getLogger().debug("onRefresh");
						this.onRefresh(callback);
					}
				},
				_callDestroyMethod: function () {
					if (typeof this.onDestroy === "function") {
						this.getLogger().debug("onDestroy");
						this.onDestroy();
					}
					else {
						this.getLogger().warn("onDestroy?");
					}
				},
				_setTitle: function (value) {
					let title = "Mame Smart Database";
					if (typeof value === "string") {
						title += " - " + value;
					}
					this._helper.title.setTitle(title);
				}
			}
		});
	}
);