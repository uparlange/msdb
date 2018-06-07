import AppUtils from "./AppUtils.js";
import AbstractClass from "./AbstractClass.js";

class AbstractModel extends AbstractClass {
	constructor(AbstractClassHelper, Services) {
		super();
		this.params = {};
		this.data = this._getInitData();
		this._helper = AbstractClassHelper;
		this._services = Services;
		this._connectionChangeSubscriber = null;
	}
	init(params) {
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
	}
	destroy() {
		this._callDestroyMethod();
		this._connectionChangeSubscriber.unsubscribe();
	}
	getServices() {
		return this._services;
	}
	getSocket() {
		return this._helper.getSocket();
	}
	getRouter() {
		return this._helper.getRouter();
	}
	getCache() {
		return this._helper.getCache();
	}
	getLabels() {
		return this._helper.getLabels();
	}
	getGameIconUrl(game) {
		return AppUtils.getGameIconUrl(game);
	}
	getGameVideoUrl(game) {
		return AppUtils.getGameVideoUrl(game);
	}
	getGameManualUrl(game) {
		return AppUtils.getGameManualUrl(game);
	}
	getGameSoundTrackUrl(game) {
		return AppUtils.getGameSoundTrackUrl(game);
	}
	getGameFolder(game) {
		return AppUtils.getGameFolder(game);
	}
	getSizeLabel(value) {
		return this._getUnitLabel(value, ["B", "KiB", "MiB", "GiB"], 1024);
	}
	getFrequencyLabel(value) {
		return this._getUnitLabel(value, ["Hz", "kHz", "MHz", "GHz"], 1000);
	}
	getGroupedArrayByFirstLetter(data, attribute) {
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
	}
	getGroupedArrayByItemsNumber(data, number) {
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
	}
	_getUnitLabel(value, steps, stepMultiplier) {
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
	}
	_callInitMethod() {
		if (typeof this.onInit === "function") {
			this.getLogger().debug("onInit");
			this.onInit();
		}
	}
	_callRefreshMethod(callback) {
		if (typeof this.onRefresh === "function") {
			this.getLogger().debug("onRefresh");
			this.onRefresh(callback);
		}
	}
	_callDestroyMethod() {
		if (typeof this.onDestroy === "function") {
			this.getLogger().debug("onDestroy");
			this.onDestroy();
		}
		else {
			this.getLogger().warn("onDestroy?");
		}
	}
	_setTitle(value) {
		let title = "Mame Smart Database";
		if (typeof value === "string") {
			title += " - " + value;
		}
		this._helper.getTitle().setTitle(title);
	}
}

export default AbstractModel;