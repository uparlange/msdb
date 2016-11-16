define(["app:AbstractView", "app:AppModel", "app:AppUtils"], 
function(AbstractView, AppModel, AppUtils) 
{
	const AppView = function (AppModel, ActivatedRoute)
	{
		AbstractView.call(this, AppModel, ActivatedRoute);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		extends:AbstractView,
		constructor: [AppModel, ng.router.ActivatedRoute, AppView]
	});
});