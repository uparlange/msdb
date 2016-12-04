define(["app:AbstractComponent"],
function(AbstractComponent) 
{
	return ng.core.Class({
		extends:AbstractComponent,
		constructor:function AbstractView (Model, ActivatedRoute)
		{
			AbstractComponent.call(this);
			
			this.model = Model;
				
			this._activatedRoute = ActivatedRoute;
			
			this._activatedRouteQueryParamsSubscriber = null;
		},
		ngOnInit:function()
		{
			AbstractComponent.prototype.ngOnInit.call(this);
			
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{	
				this.model.init(params);
			});
		},
		ngOnDestroy:function()
		{
			AbstractComponent.prototype.ngOnDestroy.call(this);
			
			this.model.destroy();
			this.model = null;
			
			this._activatedRoute = null;
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
			this._activatedRouteQueryParamsSubscriber = null;
		}
	});			
});