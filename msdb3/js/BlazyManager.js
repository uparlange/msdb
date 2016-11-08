define(function () 
{
    return ng.core.Class({
        constructor: [
			function ()
			{
				this._blazy = new Blazy();
				
				this._timeoutInterval = null;
			}
		],
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