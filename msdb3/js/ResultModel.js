define(["app:MsdbService", "app:AppUtils"], 
function(MsdbService, AppUtils) 
{
	return ng.core.Class({
		constructor: [MsdbService,
			function (MsdbService)
			{
				this._MsdbService = MsdbService;
				
				this.data = {
					list:null,
					params:{}
				};
			}
		],
		init : function(params)
		{
			if(this.data.params.type !== params.type || this.data.params.value !== params.value || this.data.list === null)
			{
				this.data.list = null;
				this.data.params = params;
				
				this._MsdbService.search(params.type, params.value).subscribe((data) => 
				{
					this.data.list = data;
				});
			}
		},
		destroy : function()
		{
			
		},
		getSearchLabel:function(type)
		{
			return (type) ? "L10N_SEARCH_BY_" + type.toUpperCase() : "";
		},
		getIconUrl : function(game)
		{
			return AppUtils.getIconUrl(game);
		},
		getDecodedValue:function(value)
		{
			return AppUtils.getDecodedValue(value);
		}
	});	
});