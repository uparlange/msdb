define(["AbstractView", "SearchModel", "AppUtils"], 
function(AbstractView, SearchModel, AppUtils) 
{
	const conf = AppUtils.getComponentConfiguration("search");

	return ng.core.Component(conf).Class(
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