define(["app:AbstractManager", "app:TranslateManager"],
function (AbstractManager, TranslateManager) 
{
	return ng.core.Class({
		extends:AbstractManager,
        constructor: [TranslateManager, 
			function UpdateManager (TranslateManager)
			{
				AbstractManager.call(this);
				
				this._translateManager = TranslateManager;
				
				this._checked = false;
				
				window.applicationCache.addEventListener("updateready", () =>
				{
					this._askForReload();
				});
			}
		],
		init:function()
		{
			if(window.applicationCache.status === window.applicationCache.UPDATEREADY)
			{
				this._askForReload();
			}
		},
		_askForReload : function()
		{
			if(!this._checked)
			{
				this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations) =>
				{
					if (confirm(translations.L10N_NEW_VERSION))
					{
						this._checked = true;
						
						window.location.reload();
					}
				});
			}
		}
    });
});