define(["AbstractModule", "CommonModule", "DetailView", "DetailModel", "DriverPopup",
	"RomsPopup", "ClonesPopup", "GalleryComponent", "DipSwitchsPopup", "ChipsPopup",
	"BiossetsPopup", "PortsPopup", "DeviceRefsPopup", "AppUtils"],
	function (AbstractModule, CommonModule, DetailView, DetailModel, DriverPopup,
		RomsPopup, ClonesPopup, GalleryComponent, DipSwitchsPopup, ChipsPopup,
		BiossetsPopup, PortsPopup, DeviceRefsPopup, AppUtils) {
		return AppUtils.getLazyModuleClass({
			extends: AbstractModule,
			constructor: function DetailModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: DetailView }
						])
					],
					declarations: [
						DetailView,
						DriverPopup,
						RomsPopup,
						ClonesPopup,
						GalleryComponent,
						DipSwitchsPopup,
						ChipsPopup,
						BiossetsPopup,
						PortsPopup,
						DeviceRefsPopup
					],
					providers: [
						DetailModel
					],
					entryComponents: [
						DriverPopup,
						RomsPopup,
						ClonesPopup,
						DipSwitchsPopup,
						ChipsPopup,
						BiossetsPopup,
						PortsPopup,
						DeviceRefsPopup
					]
				})
			]
		});
	}
);