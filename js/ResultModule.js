define(["app:AbstractModule", "app:CommonModule", "app:ResultComponent", "app:ResultModel"], 
function(AbstractModule, CommonModule, ResultComponent, ResultModel)
{
	const ResultModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: ResultComponent}
			])
		],
		declarations:[
			ResultComponent
		],
		providers:[
			ResultModel
		]
	}).Class({
		extends:AbstractModule,
		constructor:ResultModule
	});
});