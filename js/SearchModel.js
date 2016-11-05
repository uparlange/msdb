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
		getSearchTabLabel:function(index)
		{
			const tabKey = this._getTabInfos().byIndex(index).key;
			return tabKey;
		},
		_refresh:function()
		{
			const tabIndex = this._getTabInfos().byType(this.params.type).index;
			this.data.selectedIndex = tabIndex;
			
			const methodeName = "_load" + this.params.type[0].toUpperCase() + this.params.type.substring(1);
			this[methodeName]();
		},
		_loadDescription:function()
		{
			this.data.count = 0;
		},
		_loadYears : function()
		{
			this._loadData("years");
		},
		_loadSeries : function()
		{
			this._loadData("series");
		},
		_loadCategories : function()
		{
			this._loadData("categories");
		},
		_loadManufacturers : function()
		{
			this._loadData("manufacturers");
		},
		_loadVersions : function()
		{
			this._loadData("versions");
		},
		_getInitData : function()
		{
			return {
				selectedIndex:0,
				years:null,
				series:null,
				categories:null,
				manufacturers:null,
				versions:null,
				count:0
			};
		},
		_loadData:function(dataName)
		{
			this.data.count = 0;
			
			if(this.data[dataName] === null)
			{
				const serviceName = "get" + dataName[0].toUpperCase() + dataName.substr(1);
				this._msdbService[serviceName]().subscribe((data) => 
				{
					if(data !== null)
					{
						this.data[dataName] = data;
					
						this.data.count = this.data[dataName].length;
					}
				});
			}
			else
			{
				this.data.count = this.data[dataName].length;
			}
		},
		_getTabInfos : function()
		{
			return {
				_tabs : [
					{index:0,key:"L10N_SEARCH_BY_DESCRIPTION",type:"description"},
					{index:1,key:"L10N_SEARCH_BY_CATEGORY",type:"categories"},
					{index:2,key:"L10N_SEARCH_BY_SERIES",type:"series"},
					{index:3,key:"L10N_SEARCH_BY_YEAR",type:"years"},
					{index:4,key:"L10N_SEARCH_BY_MANUFACTURER",type:"manufacturers"},
					{index:5,key:"L10N_SEARCH_BY_MAMEVERSIONADDED",type:"versions"}
				],
				byIndex:function(value)
				{
					let tab = null;
					this._tabs.forEach((item, index, array) => 
					{
						if(item.index === value)
						{
							tab = item;
							return;
						}
					});
					return tab;
				},
				byType:function(value)
				{
					let tab = null;
					this._tabs.forEach((item, index, array) => 
					{
						if(item.type === value)
						{
							tab = item;
							return;
						}
					});
					return tab;
				}
			};
		}
	});		
});