define(["MsdbProvider", "AppUtils"], 
function(MsdbProvider, AppUtils) 
{
	return ng.core.Class({
		constructor: [MsdbProvider,
			function (msdbProvider)
			{
				this._msdbProvider = msdbProvider;
				
				this._params = {};
				
				this.data = this._getInitData();
			}
		],
		init : function(params)
		{
			if(this._params.type !== params.type || this._params.value !== params.value)
			{
				this.data = this._getInitData();
				
				this._msdbProvider.search(params.type, params.value).subscribe((data) => 
				{
					this.data = data;
					
					this._params = params;
				});
			}
		},
		getIconUrl : function(game)
		{
			return AppUtils.getIconUrl(game);
		},
		_getInitData : function()
		{
			return [];
		}
	});	
});