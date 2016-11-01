define(["app:MsdbProvider"], 
function(MsdbProvider) 
{
	return ng.core.Class({
		constructor: [MsdbProvider,
			function (msdbProvider)
			{
				this._msdbProvider = msdbProvider;
				
				this.data = this._getInitData();
				
				this._activatedRouteQueryParamsSubscriber = null;
			}
		],
		init:function(params)
		{
			const tabIndex = this._getTabInfos().byType(params.type).index;
			this.data.selectedIndex = tabIndex;
			
			const methodeName = "load" + params.type[0].toUpperCase() + params.type.substring(1);
			this[methodeName]();
		},
		destroy:function()
		{
			
		},
		loadDescription:function()
		{
			this.data.count = 0;
		},
		loadYears : function()
		{
			this._loadData("years");
		},
		loadSeries : function()
		{
			this._loadData("series");
		},
		loadCategories : function()
		{
			this._loadData("categories");
		},
		loadManufacturers : function()
		{
			this._loadData("manufacturers");
		},
		getSearchTabLabel:function(index)
		{
			const tabKey = this._getTabInfos().byIndex(index).key;
			return tabKey;
		},
		_loadData:function(dataName)
		{
			this.data.count = 0;
			
			if(this.data[dataName] === null)
			{
				const serviceName = "get" + dataName[0].toUpperCase() + dataName.substr(1);
				this._msdbProvider[serviceName]().subscribe((data) => 
				{
					this.data[dataName] = data;
					
					this.data.count = this.data[dataName].length;
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
					{index:4,key:"L10N_SEARCH_BY_MANUFACTURER",type:"manufacturers"}
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
		},
		_getInitData : function()
		{
			return {
				selectedIndex:0,
				years:null,
				series:null,
				categories:null,
				manufacturers:null,
				count:0
			};
		}
	});		
});