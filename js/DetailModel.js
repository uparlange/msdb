define(["app:AbstractViewModel", "app:MsdbService", "app:ConnectionManager", "app:SocketManager"], 
function(AbstractViewModel, MsdbService, ConnectionManager, SocketManager) 
{
	return ng.core.Class({
		extends:AbstractViewModel,
		constructor: [MsdbService, ConnectionManager, SocketManager,
			function (MsdbService, ConnectionManager, SocketManager)
			{
				AbstractViewModel.call(this, MsdbService, ConnectionManager);
				
				this._socketManager = SocketManager;
				
				this._socketManagerConfigChangedSubscriber = null;
			}
		],
		playGame:function()
		{
			this._socketManager.emit("PLAY_GAME", this.params.name);
		},
		setVideoAvailable:function(b)
		{
			this.data.videoAvailable = b;
		},
		getStatusClass:function(status)
		{
			return "label-" + status;
		},
		getStatusLabel:function(status)
		{
			return "L10N_" + status.toUpperCase();
		},
		_init : function()
		{
			this._socketManagerConfigChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() =>
			{
				this._refreshGameAvailability();
			});
		},
		_refresh:function()
		{
			this.data = this._getInitData();
				
			this._msdbService.getDetail(this.params.name).subscribe((data) => 
			{
				if(data === null)
				{
					data = {
						name:this.params.name,
						description:"?"
					};
				}
				
				this.data.game = data;
				
				this._msdbService.search("clones", this.params.name).subscribe((data) => 
				{
					this.data.clones = data;
				});
				
				this._refreshGameAvailability();
			});
		},
		_destroy:function()
		{
			this._socketManager.off(this._socketManagerConfigChangedSubscriber);
		},
		_refreshGameAvailability:function()
		{
			this.data.gameAvailable = false;
			
			this._socketManager.emit("IS_ROM_AVAILABLE", this.params.name).subscribe((result) =>
			{
				if(result !== null && result.name === this.params.name)
				{
					this.data.gameAvailable = result.available;
				}
			});
		},
		_getInitData:function()
		{
			return {
				game:{
					dipswitchs:[],
					chips:[],
					biossets:[],
					ports:[],
					devicerefs:[]
				},
				clones:[],
				videoAvailable:true,
				gameAvailable:false
			};
		}
	});		
});