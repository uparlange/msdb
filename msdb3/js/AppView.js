define(["app:AbstractView", "app:AppModel", "app:AppUtils"], 
function(AbstractView, AppModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		extends:AbstractView,
		constructor: [AppModel, ng.router.ActivatedRoute, 
			function AppView (AppModel, ActivatedRoute)
			{
				AbstractView.call(this, AppModel, ActivatedRoute);
			}
		]
	});
});