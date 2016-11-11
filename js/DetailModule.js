define(["app:CommonModule", "app:DetailComponent", "app:DetailModel", "app:DriverComponent", "app:RomsComponent", 
		"app:ClonesComponent", "app:VideoDirective", "app:GalleryComponent", "app:DipSwitchsComponent", "app:ChipsComponent",
		"app:BiossetsComponent", "app:PortsComponent"], 
function(CommonModule, DetailComponent, DetailModel, DriverComponent, RomsComponent, 
		 ClonesComponent, VideoDirective, GalleryComponent, DipSwitchsComponent, ChipsComponent,
		 BiossetsComponent, PortsComponent)
{
	const routes = [
		{path: "", component: DetailComponent}
	];
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild(routes)
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
			PortsComponent
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
			PortsComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});