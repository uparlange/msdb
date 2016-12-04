define(["app:AbstractView", "app:SearchModel", "app:AppUtils"], 
function(AbstractView, SearchModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("search")).Class(
	{
		extends:AbstractView,
		constructor: [SearchModel, ng.router.ActivatedRoute, 
			function SearchView (SearchModel, ActivatedRoute)
			{
				AbstractView.call(this, SearchModel, ActivatedRoute);
			}
		]
	});
});