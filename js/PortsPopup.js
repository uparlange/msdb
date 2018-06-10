import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";
import AppUtils from "./AppUtils.js";

class PortsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "ports" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
	}
	getPortValue(value) {
		return value.replace(/:/g, " > ");
	}
}

export default PortsPopup;