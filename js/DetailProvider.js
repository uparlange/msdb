define(["app:MsdbProvider", "app:AppUtils", "app:SocketManager"], 
function(MsdbProvider, AppUtils, SocketManager) 
{
	return ng.core.Class({
		constructor: [MsdbProvider, SocketManager,
			function (msdbProvider, SocketManager)
			{
				this._msdbProvider = msdbProvider;
				
				this._socketManager = SocketManager;
				
				this._configChangedSubscriber = null;
				
				this.data = this._getInitData();
			}
		],
		init : function(params)
		{
			this._configChangedSubscriber = this._socketManager.on("CONFIG_CHANGED").subscribe(() =>
			{
				this._refreshGameAvailability();
			});
			
			if(this.data.game.name !== params.name)
			{
				this.data = this._getInitData();
				
				this._msdbProvider.getDetail(params.name).subscribe((data) => 
				{
					if(data === null)
					{
						data = {
							name:params.name,
							description:"?"
						};
					}
					
					this.data.game = data;
					
					this._msdbProvider.search("clones", data.name).subscribe((data) => 
					{
						this.data.clones = data;
					});
					
					this._refreshGameAvailability();
				});
			}
		},
		destroy:function()
		{
			this._socketManager.off(this._configChangedSubscriber);
		},
		playGame:function()
		{
			this._socketManager.emit("PLAY_GAME", this.data.game.name);
		},
		setVideoAvailable:function(b)
		{
			this.data.videoAvailable = b;
		},
		getVideoUrl:function()
		{
			return (this.data.game.name !== undefined) ? "http://adb.arcadeitalia.net/download_file.php?tipo=mame_current&codice=" + this.data.game.name + "&entity=shortplay&oper=streaming&filler=" + this.data.game.name + ".mp4" : null;
		},
		getStatusClass:function(status)
		{
			return "label-" + status;
		},
		getStatusLabel:function(status)
		{
			return "L10N_" + status.toUpperCase();
		},
		getGameFolder:function()
		{
			return AppUtils.getGameFolder(this.data.game);
		},
		getGameSizeLabel:function()
		{
			var sizeLabel = "?";
			if(this.data.game.roms !== undefined)
			{
				var size = 0;
				this.data.game.roms.forEach((element, index, array) =>
				{
					size += parseInt(element.size);
				});
				sizeLabel = this.getSizeLabel(size);
			}
			return sizeLabel;
		},
		getSizeLabel: function (value)
		{
			var lbl = value + " Octet(s)";
			if (value >= 1073741824)
			{
				lbl = (Math.round(value / 1073741824 * 100) / 100) + " Go";
			}
			else if (value >= 1048576)
			{
				lbl = (Math.round(value / 1048576 * 100) / 100) + " Mo";
			}
			else if (value >= 1024)
			{
				lbl = (Math.round(value / 1024 * 100) / 100) + " Ko";
			}
			return lbl;
		},
		getFrequencyLabel: function (value)
		{
			var lbl = value + " Hz";
			if (value >= 1000000000)
			{
				lbl = (Math.round(value / 1073741824 * 100) / 100) + " GHz";
			}
			else if (value >= 1000000)
			{
				lbl = (Math.round(value / 1048576 * 100) / 100) + " MHz";
			}
			return lbl;
		},
		getEncodedValue:function(value)
		{
			return AppUtils.getEncodedValue(value);
		},
		_refreshGameAvailability:function()
		{
			this.data.gameAvailable = false;
			
			this._socketManager.emit("IS_ROM_AVAILABLE", this.data.game.name).subscribe((result) =>
			{
				if(result !== null && result.name === this.data.game.name)
				{
					this.data.gameAvailable = result.available;
				}
			});
		},
		_getInitData:function()
		{
			return {
				game:{},
				clones:[],
				videoAvailable:true,
				gameAvailable:false
			};
		}
	});		
});