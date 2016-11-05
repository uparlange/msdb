define(["app:AppModel", "app:AppUtils"], 
function(AppModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("app")).Class(
	{
		constructor: [AppModel,
			function (model)
			{
				this.model = model;
			}
		],
		ngOnInit:function()
		{
			this.model.init();
		},
		ngOnDestroy:function()
		{
			this.model.destroy();
		},
		toggleLanguage:function()
		{
			this.model.toggleLanguage();
		}
	});
});