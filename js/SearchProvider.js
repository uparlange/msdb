define(["MsdbProvider"], 
function(MsdbProvider) 
{
	return ng.core.Class({
		constructor: [MsdbProvider,
			function (msdbProvider)
			{
				this._msdbProvider = msdbProvider;
				
				this.data = this._getInitData();
			}
		],
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
		_loadData:function(dataName)
		{
			if(this.data[dataName] === null)
			{
				const serviceName = "get" + dataName[0].toUpperCase() + dataName.substr(1);
				this._msdbProvider[serviceName]().subscribe((data) => 
				{
					this.data[dataName] = data;
				});
			}
		},
		_getInitData : function()
		{
			return {
				selectedIndex:0,
				years:null,
				series:null,
				categories:null,
				manufacturers:null
			};
		}
	});		
});