define(["app:AbstractComponent", "app:DetailModel", "app:DriverComponent", "app:RomsComponent", "app:ClonesComponent", "app:AppUtils"], 
function(AbstractComponent, DetailModel, DriverComponent, RomsComponent, ClonesComponent, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("detail")).Class(
	{
		extends:AbstractComponent,
		constructor: [DetailModel, ng.router.ActivatedRoute, ng.core.ViewContainerRef, ng.material.MdDialog,
			function (model, activatedRoute, viewContainerRef, mdDialog)
			{
				AbstractComponent.call(this, model, activatedRoute);
				
				this._viewContainerRef = viewContainerRef;
				
				this._mdDialog = mdDialog;
				
				this._dialogRef = null;
			}
		],
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