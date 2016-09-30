define(["TranslateManager"], 
function(TranslateManager) 
{
	return ng.core.Pipe({
		name:"translate",
		pure: false
	}).Class({
		constructor: [TranslateManager,
			function (translateManager)
			{
				this._translateManager = translateManager;
				
				this._needRefresh = true;
				
				this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => 
				{
					this._needRefresh = true;
					
					this._refreshTranslation();
				});
				
				this.tranlateKey = null;
				
				this.tranlateValue = null;
			}
		],
		transform:function(value, attr) 
		{
			this.tranlateKey = value;
			
			this._refreshTranslation();
			
			return this.tranlateValue;
		},
		ngOnDestroy()
		{ 
			this._onLanguageChangeSubscriber.unsubscribe();
		},
		_refreshTranslation:function()
		{
			if(this._needRefresh)
			{
				this._translateManager.getValues([this.tranlateKey]).subscribe((translations) => 
				{
					this.tranlateValue = translations[this.tranlateKey];
					
					this._needRefresh = false;
				});
			}
		}
	});
});