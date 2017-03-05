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
			}
		],
		canDeactivate:function(component)
		{
			return new Promise((resolve) => 
			{
				if(component.model.hasChanges())
				{
					this._translateManager.getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations) =>
					{
						resolve(window.confirm(translations.L10N_CONFIRM_QUIT));
					});
				}
				else
				{
					resolve(true);
				}
			});
		}
	});		
});