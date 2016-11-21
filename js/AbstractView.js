define(["app:AbstractComponent"],
function(AbstractComponent) 
{
	const AbstractView = function (Model, ActivatedRoute)
	{
		AbstractComponent.call(this);
		
		this.model = Model;
			
		this._activatedRoute = ActivatedRoute;
		
		this._activatedRouteQueryParamsSubscriber = null;
	};
	
	return ng.core.Class({
		extends:AbstractComponent,
		constructor:AbstractView,
		ngOnInit:function()
		{
			AbstractComponent.call(this);
			
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		ngOnDestroy:function()
		{
			AbstractComponent.call(this);
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
			
			this.model.destroy();
		}
	});			
});