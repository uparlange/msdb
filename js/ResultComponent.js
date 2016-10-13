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
				
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init(this._activatedRoute.queryParams.value);
		},
		getSearchLabel:function(type)
		{
			return "L10N_SEARCH_BY_" + type.toUpperCase();
		}
	});		
});