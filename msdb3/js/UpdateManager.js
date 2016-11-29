define(["app:AbstractManager", "app:TranslateManager"],
function (AbstractManager, TranslateManager) 
{
	const UpdateManager = function (TranslateManager)
	{
		AbstractManager.call(this);
		
		this._translateManager = TranslateManager;
		
		this._checked = false;
		
		window.applicationCache.addEventListener("updateready", () =>
		{
			this._askForReload();
		});
	};
	
    return ng.core.Class({
		extends:AbstractManager,
        constructor: [TranslateManager, UpdateManager],
		check:function()
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