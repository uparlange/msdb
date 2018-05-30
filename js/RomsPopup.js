import AppUtils from "./AppUtils.js";
import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

export default AppUtils.getClass({
	extends: AbstractPopup,
	constructor: function RomsPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
		AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
	},
	parameters: [
		[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("roms"))
	]
});