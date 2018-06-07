import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

class ConfigModel extends AbstractModel {
	static get parameters() {
		return this.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onInit() {
		this.data.selectedLanguage = this.getLabels().getCurrentLanguage();
	}
	onRefresh(callback) {
		this._getConfiguration(callback);
	}
	save() {
		this.getSocket().emit("SAVE_CONFIGURATION", this.data.newValue).subscribe((result) => {
			if (result !== null) {
				this._getConfiguration();
			}
		});
	}
	cancel() {
		this._getConfiguration();
	}
	checkFormChanges() {
		this.data.newValue.romsDirectory = (typeof this.data.newValue.mameDirectory === "string" && this.data.newValue.mameDirectory.length > 0) ? this.data.newValue.mameDirectory + "\\roms" : null;
		this.data.enabled = this.hasChanges();
	}
	hasChanges() {
		const newValue = JSON.stringify(this.data.newValue);
		return (this.data.oldValue !== newValue);
	}
	_getConfiguration(callback) {
		this.getSocket().emit("GET_CONFIGURATION").subscribe((result) => {
			if (result !== null) {
				this.data.oldValue = JSON.stringify(result);
				this.data.newValue = result;
				this.data.enabled = false;
			}
			if (callback) {
				callback();
			}
		});
	}
	_getInitData() {
		const availableLanguages = [
			{ data: "en", label: "English" },
			{ data: "fr", label: "Français" }
		];
		return {
			oldValue: {},
			newValue: {},
			enabled: false,
			languages: availableLanguages,
			selectedLanguage: null
		};
	}
}

export default ConfigModel;