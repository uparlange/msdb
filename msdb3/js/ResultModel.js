define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager"], 
function(AbstractModel, MsdbService, ConnectionManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager,
			function(MsdbService, ConnectionManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
			}
		],
		getSearchLabel:function(type)
		{
			return (type) ? "L10N_SEARCH_BY_" + type.toUpperCase() : "";
		},
		_init:function()
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