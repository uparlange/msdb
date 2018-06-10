import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";
import AppUtils from "./AppUtils.js";

class ClonesPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "clones" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
		this._routerAction = null;
	}
	showCloneDetail(name) {
		this._routerAction = {
			commands: ["/detail"],
			extras: { queryParams: { name: name } }
		};
		this.close();
	}
	beforeClose() {
		if (this._routerAction != null) {
			this.getRouter().navigate(this._routerAction.commands, this._routerAction.extras);
			this._routerAction = null;
		}
	}
}

export default ClonesPopup;