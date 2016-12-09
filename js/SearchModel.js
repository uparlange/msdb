define(["app:AbstractModel", "app:MsdbService", "app:ConnectionManager", "app:CacheManager"], 
function(AbstractModel, MsdbService, ConnectionManager, CacheManager) 
{
	return ng.core.Class({
		extends:AbstractModel,
		constructor:[MsdbService, ConnectionManager, CacheManager, ng.router.Router,
			function SearchModel(MsdbService, ConnectionManager, CacheManager, Router)
			{
				AbstractModel.call(this, MsdbService, ConnectionManager);
				
				this._cacheManager = CacheManager;
				this._router = Router;
				
				this._tabsInfo = this._getTabsInfo();
			}
		],
		onInit:function()
		{
			this.data.description = this._cacheManager.getItem("searchDescription", "");
		},
		onRefresh:function()
		{
			const type = (this.params.type !== undefined) ? this.params.type : "description";
			const tabInfo = this._tabsInfo.byType(type);
			
			this._cacheManager.setItem("searchLastType", tabInfo.type);

			this.data.selectedIndex = tabInfo.index;
			
			const methodeName = "_load" + type[0].toUpperCase() + type.substring(1);
			this[methodeName]();
			
			setTimeout(() =>
			{
				const tabs = this._tabsInfo.getTabs();
				tabs.forEach((element, index, array) => 
				{
					if(index > 0 && index != tabInfo.index)
					{
						this.data[element.type] = {
							list : null,
							count : 0
						};
					}
				});
			},0);
		},
		onDestroy:function()
		{
			this._cacheManager.setItem("searchDescription", this.data.description);
		},
		tabChanged:function(event)
		{
			const tabInfo = this._tabsInfo.byIndex(event.index);
			this._displayTabView(tabInfo.type);
		},
		getSearchTabLabel:function(index)
		{
			const tabInfo = this._tabsInfo.byIndex(index);
			return tabInfo.key;
		},
		getVersion:function(value)
		{
			let version = value;
			version = version.replace("0.00", "0");
			version = version.replace("0.0", "0");
			version = version.replace("0.", "0");
			return version;
		},
		changeLogAvailable:function(value)
		{
			return (value.indexOf("u") === -1 && value.indexOf("b") === -1);
		},
		_displayTabView:function(type)
		{
			this._router.navigate(['/search'], {
				queryParams:{
					type:type
				}
			});
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
				description:"",
				years:{list:null,count:0},
				series:{list:null,count:0},
				categories:{list:null,count:0},
				manufacturers:{list:null,count:0},
				versions:{list:null,count:0},
				count:0,
				itemByPage:20
			};
		},
		_loadData:function(dataName)
		{
			this.data.count = 0;
			
			if(this.data[dataName].list === null)
			{
				const serviceName = "get" + dataName[0].toUpperCase() + dataName.substr(1);
				this._msdbService[serviceName]().subscribe((data) => 
				{
					if(Array.isArray(data))
					{
						this.data[dataName].count = data.length;
						
						this.data.count = data.length;

						const groups = {};
						data.forEach((item, index, array) => 
						{
							let group = null;
							const letter = item.label[0].toUpperCase();
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
						
						this.data[dataName].list = list;
					}
				});
			}
			else
			{
				this.data.count = this.data[dataName].count;
			}
		},
		_getTabsInfo : function()
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
				getTabs:function()
				{
					return this._tabs;
				},
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