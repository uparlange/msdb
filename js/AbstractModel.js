define(["AbstractClass", "AppUtils"],
	function (AbstractClass, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractModel(MsdbService, ConnectionManager, Title) {
				AbstractClass.call(this);
				this._msdbService = MsdbService;
				this._connectionManager = ConnectionManager;
				this._title = Title;
				this._connectionManagerChangeSubscriber = null;
				this.params = {};
				this.data = this._getInitData();
			},
			functions: {
				init: function (params) {
					this._connectionManagerChangeSubscriber = this._connectionManager.on("change").subscribe((online) => {
						this.params.online = online;
						if (online) {
							this._callRefreshMethod();
						}
					});
					this._setTitle();
					this._callInitMethod();
					const currentParams = this.params;
					const newParams = Object.assign({ online: this._connectionManager.online }, params);
					if (JSON.stringify(currentParams) !== JSON.stringify(newParams)) {
						this.params = newParams;
						this._callRefreshMethod();
					}
				},
				destroy: function () {
					this._callDestroyMethod();
					this._connectionManager.off(this._connectionManagerChangeSubscriber);
					this._connectionManagerChangeSubscriber = null;
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
				_callRefreshMethod: function () {
					if (typeof this.onRefresh === "function") {
						this.getLogger().debug("onRefresh");
						this.onRefresh();
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
					this._title.setTitle(title);
				}
			}
		});
	}
);