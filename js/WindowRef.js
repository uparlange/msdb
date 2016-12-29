define(["app:AbstractClass"],
function (AbstractClass) 
{
	return ng.core.Class({
		extends:AbstractClass,
        constructor: [
			function WindowRef ()
			{
				AbstractClass.call(this);

                this.nativeWindow = window;
			}
		]
    });
});