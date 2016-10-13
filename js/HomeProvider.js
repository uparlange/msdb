define(["app:MsdbProvider"], 
function(MsdbProvider) 
{
	return ng.core.Class({
		constructor: [MsdbProvider,
			function (msdbProvider)
			{
				this._msdbProvider = msdbProvider;
				
				this.data = this._getInitData();
			}
		],
		init : function()
		{
			if(this.data.build === null)
			{
				this._msdbProvider.getMameInfos().subscribe((data) => 
				{
					data.version = data.build.substr(0, data.build.indexOf("(")).trim();
					
					this.data = data;
				});
			}
		},
		_getInitData : function()
		{
			return {
				build:null
			};
		}
	});	
});