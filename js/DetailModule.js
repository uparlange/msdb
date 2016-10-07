define(["CommonModule", "DetailComponent", "DetailProvider", "DriverComponent", "RomsComponent", "ClonesComponent"], 
function(CommonModule, DetailComponent, DetailProvider, DriverComponent, RomsComponent, ClonesComponent)
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
			ClonesComponent
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