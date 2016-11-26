define(["app:AbstractModule", "app:CommonModule", "app:DetailView", "app:DetailModel", "app:DriverPopup", 
		"app:RomsPopup", "app:ClonesPopup", "app:VideoDirective", "app:GalleryComponent", "app:DipSwitchsPopup", 
		"app:ChipsPopup", "app:BiossetsPopup", "app:PortsPopup", "app:DeviceRefsPopup"], 
function(AbstractModule, CommonModule, DetailView, DetailModel, DriverPopup, 
		 RomsPopup, ClonesPopup, VideoDirective, GalleryComponent, DipSwitchsPopup, 
		 ChipsPopup, BiossetsPopup, PortsPopup, DeviceRefsPopup)
{
	const DetailModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
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
		constructor:[DetailModule]
	});
});