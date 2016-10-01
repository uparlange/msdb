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
		}
	});		
});