define(["AbstractComponent", "AppUtils"],
	function (AbstractComponent, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function TreeComponent() {
				AbstractComponent.call(this);
				this.provider = [];
				this.onClick = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("tree", {
					inputs: ["provider"],
					outputs: ["onClick"],
					queries: {
						panels: new ng.core.ViewChildren(ng.material.MatExpansionPanel)
					}
				}))
			],
			functions: {
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				toggleNode: function (panelRef) {
					this.panels.forEach((panel) => {
						if(panelRef !== panel) {
							panel.expanded = false;
						}
					});
				},
				selectNode: function (item) {
					this.onClick.emit(item);
				}
			}
		});
	}
);