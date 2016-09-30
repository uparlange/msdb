define(["CommonModule", "SearchComponent", "SearchProvider"], 
function(CommonModule, SearchComponent, SearchProvider)
{
	const routes = [
		{path: "", component: SearchComponent}
	];
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild(routes)
		],
		declarations:[
			SearchComponent
		],
		providers:[
			SearchProvider
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});