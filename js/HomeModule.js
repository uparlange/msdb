define(["CommonModule", "HomeComponent", "HomeProvider"], 
function(CommonModule, HomeComponent, HomeProvider)
{
	const routes = [
		{path: "", component: HomeComponent}
	];
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild(routes)
		],
		declarations:[
			HomeComponent
		],
		providers:[
			HomeProvider
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});