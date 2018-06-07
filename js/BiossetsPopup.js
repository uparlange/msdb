import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

class BiossetsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "biossets" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
	}
}

export default BiossetsPopup;