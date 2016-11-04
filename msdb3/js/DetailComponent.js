define(["app:DetailModel", "app:DriverComponent", "app:RomsComponent", "app:ClonesComponent", "app:AppUtils"], 
function(DetailModel, DriverComponent, RomsComponent, ClonesComponent, AppUtils) 
{
	const componentName = "detail";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [DetailModel, ng.router.ActivatedRoute, ng.core.ViewContainerRef, ng.material.MdDialog,
			function (model, activatedRoute, viewContainerRef, mdDialog)
			{
				this.model = model;
				
				this._activatedRoute = activatedRoute;
				
				this._viewContainerRef = viewContainerRef;
				
				this._mdDialog = mdDialog;
				
				this._dialogRef = null;
				
				this._activatedRouteQueryParamsSubscriber = null;
			}
		],
		ngOnInit : function()
		{
			this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) =>
			{
				this.model.init(params);
			});
		},
		ngOnDestroy : function()
		{
			this.model.destroy();
			
			this._activatedRouteQueryParamsSubscriber.unsubscribe();
		},
		videoStateChange:function(event)
		{
			this.model.setVideoAvailable((event.type !== "error"));
		},
		openDriverPopup:function()
		{
			this._openPopup(DriverComponent);
		},
		openRomsPopup:function()
		{
			this._openPopup(RomsComponent);
		},
		openClonesPopup:function()
		{
			this._openPopup(ClonesComponent);
		},
		_openPopup:function(clazz)
		{
			if(this._dialogRef === null)
			{
				const config = new ng.material.MdDialogConfig();
				config.viewContainerRef = this._viewContainerRef;
				
				this._dialogRef = this._mdDialog.open(clazz, config);
				
				this._dialogRef.afterClosed().subscribe((result) =>
				{
					this._dialogRef = null;
				});
			}
		}
	});	
});