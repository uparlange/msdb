define(["app:AbstractViewComponent", "app:SearchModel", "app:AppUtils"], 
function(AbstractViewComponent, SearchModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("search")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [SearchModel, ng.router.ActivatedRoute,
			function (SearchModel, ActivatedRoute)
			{
				AbstractViewComponent.call(this, SearchModel, ActivatedRoute);
			}
		]
	});
});