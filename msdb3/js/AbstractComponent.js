define(function() 
{
	return ng.core.Class({
		constructor:function (model, activatedRoute)
		{
			this.model = model;
				
			this._activatedRoute = activatedRoute;
			
			this._activatedRouteQueryParamsSubscriber = null;
		},
		ngOnInit:function()
		{
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		ngOnDestroy:function()
		{
			this.model.destroy();
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
		}
	});			
});