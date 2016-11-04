define(["app:AppUtils", "app:MsdbService"], 
function(AppUtils, MsdbService) 
{
	return ng.core.Class({
		constructor: [MsdbService,
			function (MsdbService)
			{
				this._MsdbService = MsdbService;
				
				this.data = this._getInitData();
			}
		],
		init : function()
		{
			if(this.data.build === null)
			{
				this._MsdbService.getMameInfos().subscribe((data) => 
				{
					if(data !== null)
					{
						data.version = data.build.substr(0, data.build.indexOf("(")).trim();
					
						this.data = data;
					}
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