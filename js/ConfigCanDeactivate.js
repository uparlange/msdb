define(["AbstractClass", "TranslateManager"], 
function(AbstractClass, TranslateManager) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor: [TranslateManager,
			function ConfigCanDeactivate (TranslateManager)
			{
				AbstractClass.call(this);

				this._translateManager = TranslateManager;

				// bug 4.0.0-rc.2
				this._L10N_CONFIRM_QUIT = null;
				this._translateManager.getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations) =>
				{
					this._L10N_CONFIRM_QUIT = translations.L10N_CONFIRM_QUIT;
				});
			}
		],
		// bug 4.0.0-rc.2
		canDeactivate:function(component)
		{
			if(component.model.hasChanges())
			{
				return window.confirm(this._L10N_CONFIRM_QUIT)
			}
			else
			{
				return true;
			}
		}
		/*
		canDeactivate:function(component)
		{
			const eventEmitter = new ng.core.EventEmitter();

			setTimeout(() =>
			{
				if(component.model.hasChanges())
				{
					this._translateManager.getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations) =>
					{
						eventEmitter.emit(window.confirm(translations.L10N_CONFIRM_QUIT));
					});
				}
				else
				{
					eventEmitter.emit(true);
				}
			},0);
			
			return eventEmitter;
		}
		*/
	});		
});