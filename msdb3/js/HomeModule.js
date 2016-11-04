define(["app:CommonModule", "app:HomeComponent", "app:HomeModel"], 
function(CommonModule, HomeComponent, HomeModel)
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
			HomeModel
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});