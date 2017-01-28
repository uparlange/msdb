define(["AbstractManager", "TranslateManager", "WindowRef"],
function (AbstractManager, TranslateManager, WindowRef) 
{
	return ng.core.Class({
		extends:AbstractManager,
        constructor: [TranslateManager, WindowRef,
			function UpdateManager (TranslateManager, WindowRef)
			{
				AbstractManager.call(this);
				
				this._translateManager = TranslateManager;
				this._window = WindowRef.nativeWindow;
				
				this._checked = false;
				
				this._window.applicationCache.addEventListener("updateready", () =>
				{
					this._askForReload();
				});
			}
		],
		init:function()
		{
			if(this._window.applicationCache.status === this._window.applicationCache.UPDATEREADY)
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
						
						this._window.location.reload();
					}
				});
			}
		}
    });
});