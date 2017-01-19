define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager"], 
function(AbstractModel, MsdbService, ConnectionManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager, 
			function ResultModel (MsdbService, ConnectionManager)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
			}
		],
		onRefresh:function()
		{
			this.data = this._getInitData();
			
			this._msdbService.search(this.params.type, this.params.value).subscribe((data) => 
			{
				if(Array.isArray(data))
				{
					this.data.count = data.length;
					
					const groups = {};
					data.forEach((item) => 
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
				else
				{
					this.data.count = 0;
				}
			});	
		},
		getSearchLabel:function(type)
		{
			return (type) ? "L10N_SEARCH_BY_" + type.toUpperCase() : "";
		},
		trackByLabel:function(index, item)
		{
			return item ? item.label : undefined;
		},
		trackByName:function(index, item)
		{
			return item ? item.name : undefined;
		},
		_getInitData:function()
		{
			return {
				list:[],
				count:-1
			};
		}
	});	
});