import AppUtils from "./AppUtils.js";
import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

export default AppUtils.getClass({
	extends: AbstractPopup,
	constructor: function DeviceRefsPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
		AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
		this._routerAction = null;
	},
	parameters: [
		[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("deviceRefs"))
	],
	functions: {
		showDeviceDetail: function (name) {
			this._routerAction = {
				commands: ["/detail"],
				extras: { queryParams: { name: name } }
			};
			this.close();
		},
		beforeClose: function () {
			if (this._routerAction != null) {
				this.getRouter().navigate(this._routerAction.commands, this._routerAction.extras);
				this._routerAction = null;
			}
		}
	}
});