define(["AbstractView", "ResultModel", "AppUtils"],
	function (AbstractView, ResultModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractView,
			constructor: function ResultView(ResultModel, ActivatedRoute) {
				AbstractView.call(this, ResultModel, ActivatedRoute);
				this.showBios = false;
				this.showDevice = false;
				this.showClone = true;
			},
			parameters: [
				[ResultModel], [ng.router.ActivatedRoute]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("result"))
			],
			functions: {
				canShowGame: function (game) {
					return (
						(game.category !== "System / Device" && game.category !== "System / BIOS" && game.cloneof == null) ||
						(game.cloneof != null && this.showClone) ||
						(game.category === "System / Device" && this.showDevice) ||
						(game.category === "System / BIOS" && this.showBios)
					)
				}
			}
		});
	}
);