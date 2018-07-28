import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class MdiIconComponent extends AbstractComponent {
    static get annotations() {
        return this.getAnnotations({
            selector: "mdi-icon",
            inputs: ["name", "size"]
        });
    }
    static get parameters() {
        return AppUtils.getParameters(AbstractClassHelper);
    }
    constructor(AbstractClassHelper) {
        super(AbstractClassHelper);
        this.name = "help";
        this.size = 24;
    }
}

export default MdiIconComponent;