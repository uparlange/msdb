define(["app:AbstractViewComponent", "app:DetailModel", "app:DriverComponent", "app:RomsComponent", "app:ClonesComponent", 
		"app:DipSwitchsComponent", "app:AppUtils", "app:ChipsComponent", "app:BiossetsComponent", "app:PortsComponent"], 
function(AbstractViewComponent, DetailModel, DriverComponent, RomsComponent, ClonesComponent, 
		 DipSwitchsComponent, AppUtils, ChipsComponent, BiossetsComponent, PortsComponent) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("detail")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [DetailModel, ng.router.ActivatedRoute, ng.core.ViewContainerRef, ng.material.MdDialog,
			function (DetailModel, ActivatedRoute, ViewContainerRef, MdDialog)
			{
				AbstractViewComponent.call(this, DetailModel, ActivatedRoute);
				
				this._viewContainerRef = ViewContainerRef;
				
				this._mdDialog = MdDialog;
				
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
		openDipSwitchsPopup:function()
		{
			this._openPopup(DipSwitchsComponent);
		},
		openChipsPopup:function()
		{
			this._openPopup(ChipsComponent);
		},
		openBiossetsPopup:function()
		{
			this._openPopup(BiossetsComponent);
		},
		openPortsPopup:function()
		{
			this._openPopup(PortsComponent);
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