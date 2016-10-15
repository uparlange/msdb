define(["app:CommonModule", "app:DetailComponent", "app:DetailProvider", "app:DriverComponent", "app:RomsComponent", "app:ClonesComponent", "app:VideoDirective", "app:GalleryComponent"], 
function(CommonModule, DetailComponent, DetailProvider, DriverComponent, RomsComponent, ClonesComponent, VideoDirective, GalleryComponent)
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
			GalleryComponent
		],
		providers:[
			DetailProvider
		],
		entryComponents:[
			DriverComponent,
			RomsComponent,
			ClonesComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});