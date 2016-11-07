define(["app:AbstractViewModel", "app:MsdbService", "app:ConnectionManager"], 
function(AbstractViewModel, MsdbService, ConnectionManager) 
{
	return ng.core.Class({
		extends:AbstractViewModel,
		constructor:[MsdbService, ConnectionManager,
			function(MsdbService, ConnectionManager)
			{
				AbstractViewModel.call(this, MsdbService, ConnectionManager);
			}
		],
		_refresh : function()
		{
			if(this.data.build === null)
			{
				this._msdbService.getMameInfos().subscribe((data) => 
				{
					if(data !== null)
					{
						data.version = data.build.substr(0, data.build.indexOf("(")).trim();
						this.data = data;
					}
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