define(["app:AppUtils", "app:MsdbProvider"], 
function(AppUtils, MsdbProvider) 
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
		destroy : function()
		{
			
		},
		getEncodedValue:function(value)
		{
			return AppUtils.getEncodedValue(value);
		},
		_getInitData : function()
		{
			return {
				build:null
			};
		}
	});	
});