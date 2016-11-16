define(["app:AbstractViewComponent", "app:SearchModel", "app:AppUtils"], 
function(AbstractViewComponent, SearchModel, AppUtils) 
{
	const SearchComponent = function (SearchModel, ActivatedRoute)
	{
		AbstractViewComponent.call(this, SearchModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("search")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [SearchModel, ng.router.ActivatedRoute, SearchComponent]
	});
});