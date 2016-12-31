define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:SocketManager"], 
function(AbstractModel, MsdbService, ConnectionManager, SocketManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager, SocketManager,
			function HomeModel (MsdbService, ConnectionManager, SocketManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
				
				this._socketManager = SocketManager;
			}
		],
		onRefresh : function()
		{
			this._getConfiguration();
		},
		save:function()
		{
			this._socketManager.emit("SAVE_CONFIGURATION", this.data.newValue).subscribe((result) =>
			{
				if(result !== null)
				{
					this._getConfiguration();
				}
			});
		},
		cancel:function()
		{
			this._getConfiguration();
		},
		checkFormChanges:function()
		{
			this.data.newValue.romsDirectory = (typeof this.data.newValue.mameDirectory === "string" && this.data.newValue.mameDirectory.length > 0) ? this.data.newValue.mameDirectory + "\\roms" : null;
		
			const newValue = JSON.stringify(this.data.newValue);
			this.data.enabled = (this.data.oldValue !== newValue);
		},
		_getConfiguration:function()
		{
			this._socketManager.emit("GET_CONFIGURATION").subscribe((result) =>
			{
				if(result !== null)
				{
					this.data.oldValue = JSON.stringify(result);
					this.data.newValue = result;

					this.data.enabled = false;
				}
			});
		},
		_getInitData : function()
		{
			return {
				oldValue:{},
				newValue:{},
				enabled:false
			};
		}
	});	
});