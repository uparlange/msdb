define(["app:SearchModel", "app:AppUtils"], 
function(SearchModel, AppUtils) 
{
	const componentName = "search";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [SearchModel, ng.router.Router, ng.router.ActivatedRoute,
			function (model, router, activatedRoute)
			{
				this.model = model;
				
				this._router = router;
				
				this._activatedRoute = activatedRoute;
				
				this._activatedRouteQueryParamsSubscriber = null;
			}
		],
		ngOnInit:function()
		{
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		ngOnDestroy:function()
		{
			this.model.destroy();
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
		}
	});
});