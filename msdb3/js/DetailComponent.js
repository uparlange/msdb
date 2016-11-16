define(["app:AbstractViewComponent", "app:DetailModel", "app:DriverPopup", "app:RomsPopup", "app:ClonesPopup", 
		"app:DipSwitchsPopup", "app:AppUtils", "app:ChipsPopup", "app:BiossetsPopup", "app:PortsPopup",
		"app:DeviceRefsPopup"], 
function(AbstractViewComponent, DetailModel, DriverPopup, RomsPopup, ClonesPopup, 
		 DipSwitchsPopup, AppUtils, ChipsPopup, BiossetsPopup, PortsPopup,
		 DeviceRefsPopup) 
{
	const DetailComponent = function (DetailModel, ActivatedRoute, ViewContainerRef, MdDialog)
	{
		AbstractViewComponent.call(this, DetailModel, ActivatedRoute);
		
		this._viewContainerRef = ViewContainerRef;
		
		this._mdDialog = MdDialog;
		
		this._dialogRef = null;
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("detail")).Class(
	{
		extends:AbstractViewComponent,
		constructor: [DetailModel, ng.router.ActivatedRoute, ng.core.ViewContainerRef, ng.material.MdDialog, DetailComponent],
		videoStateChange:function(event)
		{
			this.model.setVideoAvailable((event.type !== "error"));
		},
		openDriverPopup:function()
		{
			this._openPopup(DriverPopup);
		},
		openRomsPopup:function()
		{
			this._openPopup(RomsPopup);
		},
		openClonesPopup:function()
		{
			this._openPopup(ClonesPopup);
		},
		openDipSwitchsPopup:function()
		{
			this._openPopup(DipSwitchsPopup);
		},
		openChipsPopup:function()
		{
			this._openPopup(ChipsPopup);
		},
		openBiossetsPopup:function()
		{
			this._openPopup(BiossetsPopup);
		},
		openPortsPopup:function()
		{
			this._openPopup(PortsPopup);
		},
		openDeviceReferencesPopup:function()
		{
			this._openPopup(DeviceRefsPopup);
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