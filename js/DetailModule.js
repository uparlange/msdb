define(["CommonModule", "DetailComponent", "DetailProvider"], 
function(CommonModule, DetailComponent, DetailProvider)
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
			DetailComponent
		],
		providers:[
			DetailProvider
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});