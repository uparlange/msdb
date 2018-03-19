define(["AbstractView", "AbstractClassHelper", "DetailModel", "DriverPopup", "RomsPopup",
	"ClonesPopup", "DipSwitchsPopup", "AppUtils", "ChipsPopup", "BiossetsPopup",
	"PortsPopup", "DeviceRefsPopup"],
	function (AbstractView, AbstractClassHelper, DetailModel, DriverPopup, RomsPopup,
		ClonesPopup, DipSwitchsPopup, AppUtils, ChipsPopup, BiossetsPopup,
		PortsPopup, DeviceRefsPopup) {
		return AppUtils.getClass({
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
	}
);