define(["app:TranslateManager"], 
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
				
				this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => 
				{
					this._refreshTranslation();
				});
				
				this.tranlateKey = null;
				
				this.tranlateValue = null;
			}
		],
		transform:function(value, attr) 
		{
			if(this.tranlateKey !== value)
			{
				this.tranlateKey = value;
				
				this._refreshTranslation();
			}
			return this.tranlateValue;
		},
		ngOnDestroy()
		{ 
			this._onLanguageChangeSubscriber.unsubscribe();
		},
		_refreshTranslation:function()
		{
			this._translateManager.getValues([this.tranlateKey]).subscribe((translations) => 
			{
				this.tranlateValue = translations[this.tranlateKey];
				
				this._needRefresh = false;
			});
		}
	});
});