define(["TranslateManager"], 
function(TranslateManager) 
{
	return ng.core.Class({
		constructor: [TranslateManager,
			function (translateManager)
			{
				this._translateManager = translateManager;
				
				this.data = this._getInitData();
				
				this._onLanguageChangeSubscriber = null;
			}
		],
		init : function()
		{
			if(this.data.lang === null)
			{
				this.data.lang = this._translateManager.getCurrentLanguage();
				
				this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => 
				{
					this.data.lang = this._translateManager.getCurrentLanguage();
				});
			}
		},
		toggleLanguage:function()
		{
			this._translateManager.setLanguage(this.data.lang === "fr" ? "en" : "fr");
		},
		_getInitData : function()
		{
			return {
				lang:null
			};
		}
	});		
});