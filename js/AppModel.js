define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:UpdateManager", "app:RouterManager", 
		"app:CacheManager", "app:TranslateManager"], 
function(AbstractModel, MsdbService, ConnectionManager, UpdateManager, RouterManager, 
		 CacheManager, TranslateManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, UpdateManager, RouterManager, CacheManager, ng.material.MdSnackBar, TranslateManager,
			function AppModel (MsdbService, ConnectionManager, UpdateManager, RouterManager, CacheManager, MdSnackBar, TranslateManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);

				this._updateManager = UpdateManager;
				this._routerManager = RouterManager;
				this._cacheManager = CacheManager;
				this._mdSnackBar = MdSnackBar;
				this._translateManager = TranslateManager;
				
				this._routerManager.init();
				
				this._updateManager.init();
				
				this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
				this._cacheManagerOnChangeSubscriber = this._cacheManager.on("change").subscribe((event) =>
				{	
					if(event.key === "searchLastType")
					{
						this.data.searchLastType = event.newValue;
					}
				});
			}
		],
		onConnectionChange:function(online)
		{
			const config = new ng.material.MdSnackBarConfig();
			config.duration = 1500;

			const key = online ? "L10_CONNECTED" : "L10_NO_CONNECTION";

			this._translateManager.getValues([key]).subscribe((translations) => 
			{
				this._mdSnackBar.open(translations[key], null, config);
			});
		},
		_getInitData:function()
		{
			return {
				searchLastType:null
			};
		}
	});		
});