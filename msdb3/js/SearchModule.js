define(["app:CommonModule", "app:SearchComponent", "app:SearchProvider"], 
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