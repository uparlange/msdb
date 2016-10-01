define(["MsdbProvider"], 
function(MsdbProvider) 
{
	return ng.core.Class({
		constructor: [MsdbProvider,
			function (msdbProvider)
			{
				this._msdbProvider = msdbProvider;
				
				this.data = {};
			}
		],
		init : function(params)
		{
			if(this.data.name !== params.name)
			{
				this.data = {};
				
				this._msdbProvider.getDetail(params.name).subscribe((data) => 
				{
					this.data = data;
				});
			}
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
			var sizeLabel = "?";
			if(this.data.roms !== undefined)
			{
				var size = 0;
				this.data.roms.forEach((element, index, array) =>
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
		}
	});		
});