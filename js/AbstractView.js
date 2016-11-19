define(["app:AbstractClass"],
function(AbstractClass) 
{
	const AbstractView = function (Model, ActivatedRoute)
	{
		AbstractClass.call(this);
		
		this.model = Model;
			
		this._activatedRoute = ActivatedRoute;
		
		this._activatedRouteQueryParamsSubscriber = null;
	};
	
	return ng.core.Class({
		extends:AbstractClass,
		constructor:AbstractView,
		ngOnInit:function()
		{
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
			
			if(typeof this.onInit === "function")
			{
				this.getLogger().info("onInit");
				
				this.onInit();
			}
		},
		ngOnDestroy:function()
		{
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
			
			this.model.destroy();

			if(typeof this.onDestroy === "function")
			{
				this.getLogger().info("onDestroy");
				
				this.onDestroy();
			}
			else
			{
				this.getLogger().warn("onDestroy?");
			}
		}
	});			
});