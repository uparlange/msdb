define(["MsdbProvider"], 
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
		init : function(params)
		{
			if(this.data.name !== params.name)
			{
				this.data = this._getInitData();
				
				this._msdbProvider.getDetail(params.name).subscribe((data) => 
				{
					this.data = data;
				});
			}
		},
		_getInitData : function()
		{
			return {
				driver:{},
				input:{}
			};
		}
	});		
});