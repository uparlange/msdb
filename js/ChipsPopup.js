define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("chips")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, 
			function ChipsPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			}
		],
		onInit:function()
		{
			const map = {};
			const provider = [];
			this.model.data.game.chips.forEach((item) => 
			{
                if(map[item.type] === undefined)
				{
					map[item.type] = {name:item.type.toUpperCase(), values:[]};
					provider.push(map[item.type]);
				}
				map[item.type].values.push(item);
            });
			this.provider = provider;
		}
	});	
});