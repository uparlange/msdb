define(["AbstractClass", "AppUtils"],
	function (AbstractClass, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractModel(AbstractClassHelper, Services) {
				AbstractClass.call(this);
				this.params = {};
				this.data = this._getInitData();
				this._helper = AbstractClassHelper;
				this._services = Services;
				this._connectionChangeSubscriber = null;
			},
			functions: {
				init: function (params) {
					this._connectionChangeSubscriber = this._helper.getConnection().on("change").subscribe((online) => {
						this.params.online = online;
						if (online) {
							this._callRefreshMethod(() => {
								this.getRouter().restoreScrollPosition();
							});
						}
					});
					this._setTitle();
					this._callInitMethod();
					this.getRouter().restoreScrollPosition();
					const currentParams = this.params;
					const newParams = Object.assign({ online: this._helper.getConnection().online }, params);
					if (JSON.stringify(currentParams) !== JSON.stringify(newParams)) {
						this.params = newParams;
						this._callRefreshMethod(() => {
							this.getRouter().restoreScrollPosition();
						});
					}
				},
				destroy: function () {
					this._callDestroyMethod();
					this._connectionChangeSubscriber.unsubscribe();
				},
				getServices: function () {
					return this._services;
				},
				getSocket: function () {
					return this._helper.getSocket();
				},
				getRouter: function () {
					return this._helper.getRouter();
				},
				getCache: function () {
					return this._helper.getCache();
				},
				getLabels: function () {
					return this._helper.getLabels();
				},
				getGameIconUrl: function (game) {
					return AppUtils.getGameIconUrl(game);
				},
				getGameVideoUrl: function (game) {
					return AppUtils.getGameVideoUrl(game);
				},
				getGameSoundTrackUrl: function (game) {
					return AppUtils.getGameSoundTrackUrl(game);
				},
				getGameFolder: function (game) {
					return AppUtils.getGameFolder(game);
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
					this._helper.getTitle().setTitle(title);
				}
			}
		});
	}
);