define(["MsdbProvider", "AppUtils"], 
function(MsdbProvider, AppUtils) 
{
	return ng.core.Class({
		constructor: [MsdbProvider,
			function (msdbProvider)
			{
				this._msdbProvider = msdbProvider;
				
				this.data = this._getInitData();
			}
		],
		init : function(params)
		{
			if(this.data.params.type !== params.type || this.data.params.value !== params.value)
			{
				this.data = this._getInitData();
				
				this._msdbProvider.search(params.type, params.value).subscribe((data) => 
				{
					this.data = {
						list:data,
						params:params
					};
				});
			}
		},
		getIconUrl : function(game)
		{
			return AppUtils.getIconUrl(game);
		},
		_getInitData:function()
		{
			return {
				list:null,
				params:{}
			};
		}
	});	
});