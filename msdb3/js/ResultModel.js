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
		getSearchLabel:function(type)
		{
			return (type) ? "L10N_SEARCH_BY_" + type.toUpperCase() : "";
		},
		_refresh:function()
		{
			this.data.list = null;
			this._msdbService.search(this.params.type, this.params.value).subscribe((data) => 
			{
				this.data.list = data;
			});
		},
		_getInitData:function()
		{
			return {
				list:null
			};
		}
	});	
});