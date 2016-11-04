define(["app:CommonModule", "app:ResultComponent", "app:ResultModel"], 
function(CommonModule, ResultComponent, ResultModel)
{
	const routes = [
		{path: "", component: ResultComponent}
	];
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild(routes)
		],
		declarations:[
			ResultComponent
		],
		providers:[
			ResultModel
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});