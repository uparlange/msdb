define(["AbstractModule", "CommonModule", "DetailView", "DetailModel", "DriverPopup", 
		"RomsPopup", "ClonesPopup", "VideoDirective", "GalleryComponent", "DipSwitchsPopup", 
		"ChipsPopup", "BiossetsPopup", "PortsPopup", "DeviceRefsPopup"], 
function(AbstractModule, CommonModule, DetailView, DetailModel, DriverPopup, 
		RomsPopup, ClonesPopup, VideoDirective, GalleryComponent, DipSwitchsPopup, 
		ChipsPopup, BiossetsPopup, PortsPopup, DeviceRefsPopup)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: DetailView}
				])
			],
			declarations:[
				DetailView,
				DriverPopup,
				RomsPopup,
				ClonesPopup,
				VideoDirective, 
				GalleryComponent,
				DipSwitchsPopup,
				ChipsPopup,
				BiossetsPopup,
				PortsPopup,
				DeviceRefsPopup
			],
			providers:[
				DetailModel
			],
			entryComponents:[
				DriverPopup,
				RomsPopup,
				ClonesPopup,
				DipSwitchsPopup,
				ChipsPopup,
				BiossetsPopup,
				PortsPopup,
				DeviceRefsPopup
			]
		}).Class({
			extends:AbstractModule,
			constructor:[
				function DetailModule ()
				{
					AbstractModule.call(this);
				}
			]
		})
	};
});