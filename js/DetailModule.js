define(["CommonModule", "DetailComponent", "DetailProvider", "DriverComponent", "RomsComponent"], 
function(CommonModule, DetailComponent, DetailProvider, DriverComponent, RomsComponent)
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
			RomsComponent
		],
		providers:[
			DetailProvider
		],
		entryComponents:[
			DriverComponent,
			RomsComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});