define(["app:AbstractComponent", "app:SearchModel", "app:AppUtils"], 
function(AbstractComponent, SearchModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("search")).Class(
	{
		extends:AbstractComponent,
		constructor: [SearchModel, ng.router.ActivatedRoute,
			function (SearchModel, ActivatedRoute)
			{
				AbstractComponent.call(this, SearchModel, ActivatedRoute);
			}
		]
	});
});