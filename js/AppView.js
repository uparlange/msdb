define(["app:AbstractView", "app:AppModel", "app:AppUtils", "app:TranslateManager", "app:ConnectionManager"], 
function(AbstractView, AppModel, AppUtils, TranslateManager, ConnectionManager) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		extends:AbstractView,
		constructor: [AppModel, ng.router.ActivatedRoute, ng.core.ViewContainerRef,  ng.material.MdSnackBar, TranslateManager, ConnectionManager,
			function AppView (AppModel, ActivatedRoute, ViewContainerRef, MdSnackBar, TranslateManager, ConnectionManager)
			{
				AbstractView.call(this, AppModel, ActivatedRoute);

				this._viewContainerRef = ViewContainerRef;
				this._mdSnackBar = MdSnackBar;
				this._translateManager = TranslateManager;
				this._connectionManager = ConnectionManager;

				this._connectionManager.on("change").subscribe((online) =>
				{
					const config = new ng.material.MdSnackBarConfig();
					config.duration = 1500;
					config.viewContainerRef = this._viewContainerRef;

					const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";

					this._translateManager.getValues([key]).subscribe((translations) => 
					{
						this._mdSnackBar.open(translations[key], null, config);
					});
				});
			}
		]
	});
});