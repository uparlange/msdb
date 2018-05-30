import AppUtils from "./AppUtils.js";
import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

export default AppUtils.getClass({
	extends: AbstractModel,
	constructor: function ConfigModel(AbstractClassHelper, MsdbService) {
		AbstractModel.call(this, AbstractClassHelper, MsdbService);
	},
	parameters: [
		[AbstractClassHelper], [MsdbService]
	],
	functions: {
		onInit: function () {
			this.data.selectedLanguage = this.getLabels().getCurrentLanguage();
		},
		onRefresh: function (callback) {
			this._getConfiguration(callback);
		},
		save: function () {
			this.getSocket().emit("SAVE_CONFIGURATION", this.data.newValue).subscribe((result) => {
				if (result !== null) {
					this._getConfiguration();
				}
			});
		},
		cancel: function () {
			this._getConfiguration();
		},
		checkFormChanges: function () {
			this.data.newValue.romsDirectory = (typeof this.data.newValue.mameDirectory === "string" && this.data.newValue.mameDirectory.length > 0) ? this.data.newValue.mameDirectory + "\\roms" : null;
			this.data.enabled = this.hasChanges();
		},
		hasChanges: function () {
			const newValue = JSON.stringify(this.data.newValue);
			return (this.data.oldValue !== newValue);
		},
		_getConfiguration: function (callback) {
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
		},
		_getInitData: function () {
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
});