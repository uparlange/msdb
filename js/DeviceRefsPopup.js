import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";
import AppUtils from "./AppUtils.js";

class DeviceRefsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "deviceRefs" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
		this._routerAction = null;
	}
	showDeviceDetail(name) {
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

export default DeviceRefsPopup;