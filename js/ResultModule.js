define(["AbstractModule", "CommonModule", "ResultView", "ResultModel"], 
function(AbstractModule, CommonModule, ResultView, ResultModel)
{
	return {
		module:ng.core.NgModule({
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
			constructor:[
				function ResultModule ()
				{
					AbstractModule.call(this);
				}
			]
		})
	};
});