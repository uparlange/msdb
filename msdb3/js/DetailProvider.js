define(["app:MsdbProvider", "app:AppUtils", "app:SocketManager"], 
function(MsdbProvider, AppUtils, SocketManager) 
{
	return ng.core.Class({
		constructor: [MsdbProvider, SocketManager,
			function (msdbProvider, SocketManager)
			{
				this._msdbProvider = msdbProvider;
				
				this._socketManager = SocketManager;
				
				this.data = this._getInitData();
			}
		],
		init : function(params)
		{
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
					
					this._socketManager.sendMessage("IS_ROM_AVAILABLE", this.data.game.name).subscribe((result) =>
					{
						if(result.name === this.data.game.name)
						{
							this.data.gameAvailable = result.available;
						}
					});
					
					this._msdbProvider.search("clones", data.name).subscribe((data) => 
					{
						this.data.clones = data;
					});
				});
			}
		},
		playGame:function()
		{
			this._socketManager.sendMessage("PLAY_GAME", this.data.game.name);
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