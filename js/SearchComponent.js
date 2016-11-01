define(["app:SearchProvider", "app:AppUtils"], 
function(SearchProvider, AppUtils) 
{
	const componentName = "search";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [SearchProvider, ng.router.Router, ng.router.ActivatedRoute,
			function (model, router, activatedRoute)
			{
				this.model = model;
				
				this._router = router;
				
				this._activatedRoute = activatedRoute;
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
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
			
			this.model.destroy();
		}
	});
});