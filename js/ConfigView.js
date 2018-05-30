import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import ConfigModel from "./ConfigModel.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function ConfigView(AbstractClassHelper, ConfigModel) {
		AbstractView.call(this, AbstractClassHelper, ConfigModel);
	},
	parameters: [
		[AbstractClassHelper], [ConfigModel]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("config"))
	],
	functions: {
		onLanguageChanged: function (event) {
			this.getLabels().setLanguage(event.value);
		}
	}
});