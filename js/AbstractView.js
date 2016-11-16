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
			console.info(this.constructor.name, "init");
			
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		ngOnDestroy:function()
		{
			console.info(this.constructor.name, "destroy");
			
			this.model.destroy();
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
		}
	});			
});