define(["SearchProvider", "AppUtils"], 
function(SearchProvider, AppUtils) 
{
	const componentName = "search";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		styleUrls: AppUtils.getStyleUrls(componentName)
	}).Class({
		constructor: [SearchProvider, ng.router.Router,
			function (model, router)
			{
				this._router = router;
				
				this.model = model;
			}
		],
		findByDescription:function()
		{
			this._showResults({
				type:"description",
				value:this.model.data.description
			});
		},
		findByYear : function(value)
		{
			this._showResults({
				type:"year",
				value:value
			});
		},
		findBySeries : function(value)
		{
			this._showResults({
				type:"series",
				value:value
			});
		},
		findByCategory : function(value)
		{
			this._showResults({
				type:"category",
				value:value
			});
		},
		findByManufacturer : function(value)
		{
			this._showResults({
				type:"manufacturer",
				value:value
			});
		},
		tabChanged:function(event)
		{
			switch(event.index)
			{
				case 0 : this.model.loadDescription(); break;
				case 1 : this.model.loadCategories(); break;
				case 2 : this.model.loadSeries(); break;
				case 3 : this.model.loadYears(); break;
				case 4 : this.model.loadManufacturers(); break;
			}
		},
		getSearchTabLabel:function(index)
		{
			var key = "";
			switch(index)
			{
				case 0 : key = "L10N_SEARCH_BY_DESCRIPTION"; break;
				case 1 : key = "L10N_SEARCH_BY_CATEGORY"; break;
				case 2 : key = "L10N_SEARCH_BY_SERIES"; break;
				case 3 : key = "L10N_SEARCH_BY_YEAR"; break;
				case 4 : key = "L10N_SEARCH_BY_MANUFACTURER"; break;
			}
			return key;
		},
		_showResults : function(queryParams)
		{
			this._router.navigate(['/result'], {
				queryParams:queryParams
			});
		}
	});
});