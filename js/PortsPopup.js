import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

class PortsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "ports" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
	}
	getPortValue(value) {
		return value.replace(/:/g, " > ");
	}
}

export default PortsPopup;