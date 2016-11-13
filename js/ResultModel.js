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
			this.data = this._getInitData();
			this._msdbService.search(this.params.type, this.params.value).subscribe((data) => 
			{
				if(Array.isArray(data))
				{
					this.data.count = data.length;
					
					const list = [];
					while (data.length > 0) 
					{
						list.push(data.splice(0, this.data.itemByPage));
					}
					this.data.list = list;
				}
			});	
		},
		_getInitData:function()
		{
			return {
				list:[],
				count:0,
				itemByPage:20
			};
		}
	});	
});