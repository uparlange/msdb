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
					
					const groups = {};
					data.forEach((item, index, array) => 
					{
						let group = null;
						const letter = item.description[0].toUpperCase();
						group = isNaN(parseInt(letter)) ? letter : "0-9";
						if(groups[group] === undefined)
						{
							groups[group] = [];
						}
						groups[group].push(item);
					});
					
					const list = [];
					for(let group in groups)
					{
						list.push({
							label:group,
							data:groups[group]
						});
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