define(["app:AbstractView", "app:SearchModel", "app:AppUtils"], 
function(AbstractView, SearchModel, AppUtils) 
{
	const SearchView = function (SearchModel, ActivatedRoute)
	{
		AbstractView.call(this, SearchModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("search")).Class(
	{
		extends:AbstractView,
		constructor: [SearchModel, ng.router.ActivatedRoute, SearchView]
	});
});