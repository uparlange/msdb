define(["app:AbstractManager"],
function (AbstractManager) 
{
	const LazyManager = function ()
	{
		AbstractManager.call(this);
		
		this._blazy = new Blazy();
		
		this._timeoutInterval = null;
	};
	
    return ng.core.Class({
		extends:AbstractManager,
        constructor: [LazyManager],
		register:function(element)
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