import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

class DriverPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "driver" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
		this._routerAction = null;
	}
	showGamesForMameVersion(version) {
		this._routerAction = {
			commands: ["/result"],
			extras: { queryParams: { type: "version", value: version } }
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

export default DriverPopup;