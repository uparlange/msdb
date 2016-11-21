define(["app:AbstractPipe", "app:TranslateManager"], 
function(AbstractPipe, TranslateManager) 
{
	const TranslatePipe = function (translateManager)
	{
		AbstractPipe.call(this);
		
		this._translateManager = translateManager;
		
		this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => 
		{
			this._refreshTranslation();
		});
		
		this.tranlateKey = null;
		
		this.tranlateValue = null;
	};
	
	return ng.core.Pipe({
		name:"translate",
		pure: false
	}).Class({
		extends:AbstractPipe,
		constructor: [TranslateManager, TranslatePipe],
		transform:function(value, attr) 
		{
			if(this.tranlateKey !== value)
			{
				this.tranlateKey = value;
				
				this._refreshTranslation();
			}
			return this.tranlateValue;
		},
		onDestroy()
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