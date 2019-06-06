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
		this.setTitle(null);
		this.setKeywords(null);
		this.getRouter().restoreScrollPosition();
		const newParams = Object.assign({ online: this._helper.getConnection().online }, params);
		let paramsChanged = false;
		if (JSON.stringify(this.params) !== JSON.stringify(newParams)) {
			this.params = newParams;
			paramsChanged = true;
		}
		this._callInitMethod();
		if (paramsChanged) {
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
	getEventBus() {
		return this._helper.getEventBus();
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
	getHistory() {
		return this._helper.getHistory();
	}
	getFavorites() {
		return this._helper.getFavorites();
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
	setTitle(value) {
		let title = "Mame Smart Database";
		if (typeof value === "string") {
			title += ` - ${value}`;
		}
		this._helper.getTitle().setTitle(title);
	}
	setKeywords(value) {
		let content = "mame, mess, arcade, emulation, database, base de donnée, game, jeu";
		if (typeof value === "string") {
			content += `, ${value}`;
		}
		this._helper.getMeta().updateTag({
			content: content,
			name: "keywords"
		});
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
		return `${Math.round(value / step.value * 100) / 100} ${step.unit}`;
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
}

export default AbstractModel;