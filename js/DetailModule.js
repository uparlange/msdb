define(["app:CommonModule", "app:DetailComponent", "app:DetailModel", "app:DriverComponent", "app:RomsComponent", 
		"app:ClonesComponent", "app:VideoDirective", "app:GalleryComponent", "app:DipSwitchsComponent"], 
function(CommonModule, DetailComponent, DetailModel, DriverComponent, RomsComponent, 
		 ClonesComponent, VideoDirective, GalleryComponent, DipSwitchsComponent)
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
			DipSwitchsComponent
		],
		providers:[
			DetailModel
		],
		entryComponents:[
			DriverComponent,
			RomsComponent,
			ClonesComponent,
			DipSwitchsComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});