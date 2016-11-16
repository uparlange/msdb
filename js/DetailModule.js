define(["app:AbstractModule", "app:CommonModule", "app:DetailComponent", "app:DetailModel", "app:DriverComponent", 
		"app:RomsComponent", "app:ClonesComponent", "app:VideoDirective", "app:GalleryComponent", "app:DipSwitchsComponent", 
		"app:ChipsComponent", "app:BiossetsComponent", "app:PortsComponent", "app:DeviceRefsComponent"], 
function(AbstractModule, CommonModule, DetailComponent, DetailModel, DriverComponent, 
		 RomsComponent, ClonesComponent, VideoDirective, GalleryComponent, DipSwitchsComponent, 
		 ChipsComponent, BiossetsComponent, PortsComponent, DeviceRefsComponent)
{
	const DetailModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: DetailComponent}
			])
		],
		declarations:[
			DetailComponent,
			DriverComponent,
			RomsComponent,
			ClonesComponent,
			VideoDirective, 
			GalleryComponent,
			DipSwitchsComponent,
			ChipsComponent,
			BiossetsComponent,
			PortsComponent,
			DeviceRefsComponent
		],
		providers:[
			DetailModel
		],
		entryComponents:[
			DriverComponent,
			RomsComponent,
			ClonesComponent,
			DipSwitchsComponent,
			ChipsComponent,
			BiossetsComponent,
			PortsComponent,
			DeviceRefsComponent
		]
	}).Class({
		extends:AbstractModule,
		constructor:DetailModule
	});
});