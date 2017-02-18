define(["AbstractManager"],
function (AbstractManager) 
{
	return ng.core.Class({
		extends:AbstractManager,
        constructor: [
			function LazyManager ()
			{
				AbstractManager.call(this);
				
				this._blazy = new Blazy();
				
				this._timeoutInterval = null;
			}
		],
		refresh:function()
		{
			if(this._timeoutInterval !== null)
			{
				clearTimeout(this._timeoutInterval);
			}
			this._timeoutInterval = setTimeout(() =>
			{ 
				this._blazy.revalidate();
			}, 50);
		}
    });
});