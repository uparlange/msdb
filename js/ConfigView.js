import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import ConfigModel from "./ConfigModel.js";
import AppUtils from "./AppUtils.js";

class ConfigView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "config" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, ConfigModel);
	}
	constructor(AbstractClassHelper, ConfigModel) {
		super(AbstractClassHelper, ConfigModel);
	}
	onLanguageChanged(event) {
		this.getLabels().setLanguage(event.value);
	}
}

export default ConfigView;