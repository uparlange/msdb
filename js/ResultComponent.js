define(["app:ResultModel", "app:AppUtils"], 
function(ResultModel, AppUtils) 
{
	const componentName = "result";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [ResultModel, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				this.model = model;
				
				this._activatedRoute = activatedRoute;
				
				this._activatedRouteQueryParamsSubscriber = null;
			}
		],
		ngOnInit : function()
		{
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		ngOnDestroy : function()
		{
			this.model.destroy();
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
		}
	});		
});