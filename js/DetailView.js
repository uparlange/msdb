define(["AbstractView", "DetailModel", "DriverPopup", "RomsPopup", "ClonesPopup",
	"DipSwitchsPopup", "AppUtils", "ChipsPopup", "BiossetsPopup", "PortsPopup",
	"DeviceRefsPopup"],
	function (AbstractView, DetailModel, DriverPopup, RomsPopup, ClonesPopup,
		DipSwitchsPopup, AppUtils, ChipsPopup, BiossetsPopup, PortsPopup,
		DeviceRefsPopup) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function DetailView(DetailModel, ActivatedRoute, ViewContainerRef, MdDialog) {
				AbstractView.call(this, DetailModel, ActivatedRoute);
				this._viewContainerRef = ViewContainerRef;
				this._mdDialog = MdDialog;
				this._dialogRef = null;
			},
			parameters: [
				[DetailModel], [ng.router.ActivatedRoute], [ng.core.ViewContainerRef], [ng.material.MatDialog]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("detail"))
			],
			functions: {
				videoStateChange: function (event) {
					this.model.setVideoAvailable((event.type !== "error"));
				},
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
					if (this._dialogRef === null) {
						const config = new ng.material.MatDialogConfig();
						config.disableClose = true;
						config.viewContainerRef = this._viewContainerRef;
						this._dialogRef = this._mdDialog.open(clazz, config);
						this._dialogRef.afterClosed().subscribe(() => {
							this._dialogRef = null;
						});
					}
				}
			}
		});
	}
);