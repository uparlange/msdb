define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("dipSwitchs")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, 
			function DipSwitchsPopup (DetailModel, MdDialogRef)
			{
				AbstractPopup.call(this, DetailModel, MdDialogRef);
				
				this.provider = [];
			}
		],
		onInit:function()
		{
			const map = {};
			const provider = [];
			this.model.data.game.dipswitchs.forEach((item) => 
			{
                if(map[item.tag] === undefined)
				{
					map[item.tag] = {name:item.tag, switchs:[]};
					provider.push(map[item.tag]);
				}
				map[item.tag].switchs.push(item);
            });
			this.provider = provider;
		}
	});	
});