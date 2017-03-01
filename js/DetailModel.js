define(["AbstractModel", "MsdbService", "ConnectionManager", "SocketManager"], 
function(AbstractModel, MsdbService, ConnectionManager, SocketManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor: [MsdbService, ConnectionManager, ng.platformBrowser.Title, SocketManager, 
			function DetailModel (MsdbService, ConnectionManager, Title, SocketManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
				
				this._socketManager = SocketManager;
				
				this._socketManagerConfigChangedSubscriber = null;
			}
		],
		onInit : function()
		{
			this._socketManagerConfigChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() =>
			{
				this._refreshGameAvailability();
			});
		},
		onRefresh:function()
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

				const title = this.data.game.description + " - " + this.data.game.name;
				this.emit("titleChange", title);
				
				this._msdbService.search("clones", this.params.name).subscribe((data) => 
				{
					this.data.clones = data;
				});
				
				this._refreshGameAvailability();
			});
		},
		onDestroy:function()
		{
			this._socketManager.off(this._socketManagerConfigChangedSubscriber);
		},
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
		getGameSizeLabel:function()
		{
			let size = 0;
			if(this.data.game.roms !== undefined)
			{
				this.data.game.roms.forEach((element) =>
				{
					size += parseInt(element.size);
				});
			}
			return this.getSizeLabel(size);
		},
		trackByName:function(index, item)
		{
			return item ? item.name : undefined;
		},
		trackByTag:function(index, item)
		{
			return item ? item.tag : undefined;
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