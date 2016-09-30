define(["CommonModule", "ResultComponent", "ResultProvider"], 
function(CommonModule, ResultComponent, ResultProvider)
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
			ResultProvider
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});