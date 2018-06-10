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
import AppUtils from "./AppUtils.js";

class DetailView extends AbstractView {
	static get annotations() {
		return this.getAnnotations({ selector: "detail" });
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialog);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialog) {
		super(AbstractClassHelper, DetailModel);
		this._matDialog = MatDialog;
	}
	openDriverPopup() {
		this._openPopup(DriverPopup);
	}
	openRomsPopup() {
		this._openPopup(RomsPopup);
	}
	openClonesPopup() {
		this._openPopup(ClonesPopup);
	}
	openDipSwitchsPopup() {
		this._openPopup(DipSwitchsPopup);
	}
	openChipsPopup() {
		this._openPopup(ChipsPopup);
	}
	openBiossetsPopup() {
		this._openPopup(BiossetsPopup);
	}
	openPortsPopup() {
		this._openPopup(PortsPopup);
	}
	openDeviceReferencesPopup() {
		this._openPopup(DeviceRefsPopup);
	}
	_openPopup(clazz) {
		this.getPopups().open(this._matDialog, clazz, { disableClose: true });
	}
}

export default DetailView;