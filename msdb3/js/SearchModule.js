define(["app:CommonModule", "app:SearchComponent", "app:SearchModel"], 
function(CommonModule, SearchComponent, SearchModel)
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
			SearchModel
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});