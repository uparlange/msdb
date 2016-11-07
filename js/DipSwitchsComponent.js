define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	return ng.core.Component(AppUtils.getComponentConfiguration("dipSwitchs")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef,
			function (DetailModel, MdDialogRef)
			{
				AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
				
				this.provider = [];
			}
		],
		ngOnInit:function()
		{
			const map = {};
			const provider = [];
			this.model.data.game.dipswitchs.forEach((dipswitch, index, array) => 
			{
                if(map[dipswitch.tag] === undefined)
				{
					map[dipswitch.tag] = {name:dipswitch.tag, switchs:[]};
					provider.push(map[dipswitch.tag]);
				}
				map[dipswitch.tag].switchs.push(dipswitch);
            });
			this.provider = provider;
		}
	});	
});