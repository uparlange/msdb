import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";
import AppUtils from "./AppUtils.js";

class RomsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "roms" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
	}
}

export default RomsPopup;