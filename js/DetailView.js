import AppUtils from "./AppUtils.js";
import AbstractView from "./AbstractView.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";
import DriverPopup from "./DriverPopup.js";
import RomsPopup from "./RomsPopup.js";
import ClonesPopup from "./ClonesPopup.js";
import DipSwitchsPopup from "./DipSwitchsPopup.js";
import ChipsPopup from "./ChipsPopup.js";
import BiossetsPopup from "./BiossetsPopup.js";
import PortsPopup from "./PortsPopup.js";
import DeviceRefsPopup from "./DeviceRefsPopup.js";

export default AppUtils.getClass({
	extends: AbstractView,
	constructor: function DetailView(AbstractClassHelper, DetailModel, MatDialog) {
		AbstractView.call(this, AbstractClassHelper, DetailModel);
		this._matDialog = MatDialog;
	},
	parameters: [
		[AbstractClassHelper], [DetailModel], [ng.material.MatDialog]
	],
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("detail"))
	],
	functions: {
		openDriverPopup: function () {
			this._openPopup(DriverPopup);
		},
		openRomsPopup: function () {
			this._openPopup(RomsPopup);
		},
		openClonesPopup: function () {
			this._openPopup(ClonesPopup);
		},
		openDipSwitchsPopup: function () {
			this._openPopup(DipSwitchsPopup);
		},
		openChipsPopup: function () {
			this._openPopup(ChipsPopup);
		},
		openBiossetsPopup: function () {
			this._openPopup(BiossetsPopup);
		},
		openPortsPopup: function () {
			this._openPopup(PortsPopup);
		},
		openDeviceReferencesPopup: function () {
			this._openPopup(DeviceRefsPopup);
		},
		_openPopup: function (clazz) {
			this.getPopups().open(this._matDialog, clazz, { disableClose: true });
		}
	}
});