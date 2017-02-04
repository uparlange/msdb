define(["AppUtils", "AbstractClass"], 
function(AppUtils, AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
		constructor: [
			function MyGamesCanActivate ()
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