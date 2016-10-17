define(["app:ResultProvider", "app:AppUtils"], 
function(ResultProvider, AppUtils) 
{
	const componentName = "result";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [ResultProvider, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				this._activatedRoute = activatedRoute;
				
				this._activatedRouteQueryParamsSubscriber = null;
				
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		getSearchLabel:function(type)
		{
			return "L10N_SEARCH_BY_" + type.toUpperCase();
		}
	});		
});