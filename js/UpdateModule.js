define(["app:CommonModule", "app:UpdateComponent", "app:UpdateProvider"], 
function(CommonModule, UpdateComponent, UpdateProvider)
{
	const routes = [
		{path: "", component: UpdateComponent}
	];
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild(routes)
		],
		declarations:[
			UpdateComponent
		],
		providers:[
			UpdateProvider
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});