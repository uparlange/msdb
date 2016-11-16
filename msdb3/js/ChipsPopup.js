define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const ChipsPopup = function (DetailModel, MdDialogRef)
	{
		AbstractPopup.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("chips")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, ChipsPopup],
		onInit:function()
		{
			const map = {};
			const provider = [];
			this.model.data.game.chips.forEach((item, index, array) => 
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