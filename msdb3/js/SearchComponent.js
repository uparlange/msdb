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
				case 0 : break;
				case 1 : this.model.loadSeries(); break;
				case 2 : this.model.loadCategories(); break;
				case 3 : this.model.loadYears(); break;
				case 4 : this.model.loadManufacturers(); break;
			}
		},
		_showResults : function(queryParams)
		{
			this._router.navigate(['/result'], {
				queryParams:queryParams
			});
		}
	});
});