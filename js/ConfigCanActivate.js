define(["AppUtils", "AbstractClass"], 
function(AppUtils, AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor: [
			function ConfigCanActivate ()
			{
				AbstractClass.call(this);
			}
		],
		canActivate:function()
		{
			return AppUtils.runInNw();
		}
	});		
});