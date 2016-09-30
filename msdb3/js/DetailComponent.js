define(["DetailProvider", "AppUtils"], 
function(DetailProvider, AppUtils) 
{
	const componentName = "detail";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [DetailProvider, ng.router.ActivatedRoute,
			function (model, activatedRoute)
			{
				this._activatedRoute = activatedRoute;
				
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init(this._activatedRoute.queryParams.value);
		}
	});	
});