define(["app:DetailProvider", "app:DriverComponent", "app:RomsComponent", "app:ClonesComponent", "app:AppUtils"], 
function(DetailProvider, DriverComponent, RomsComponent, ClonesComponent, AppUtils) 
{
	const componentName = "detail";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName)
	}).Class({
		constructor: [DetailProvider, ng.router.ActivatedRoute, ng.core.ViewContainerRef, ng.material.MdDialog,
			function (model, activatedRoute, viewContainerRef, mdDialog)
			{
				this._activatedRoute = activatedRoute;
				
				this._viewContainerRef = viewContainerRef;
				
				this._mdDialog = mdDialog;
				
				this._dialogRef = null;
				
				this.model = model;
			}
		],
		ngOnInit : function()
		{
			this.model.init(this._activatedRoute.queryParams.value);
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
			const config = new ng.material.MdDialogConfig();
			config.viewContainerRef = this._viewContainerRef;
			
			this._dialogRef = this._mdDialog.open(clazz, config);
			
			this._dialogRef.afterClosed().subscribe((result) =>
			{
				this._dialogRef = null;
			});
		}
	});	
});