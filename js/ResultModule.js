define(["app:AbstractModule", "app:CommonModule", "app:ResultView", "app:ResultModel"], 
function(AbstractModule, CommonModule, ResultView, ResultModel)
{
	const ResultModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: ResultView}
			])
		],
		declarations:[
			ResultView
		],
		providers:[
			ResultModel
		]
	}).Class({
		extends:AbstractModule,
		constructor:[ResultModule]
	});
});