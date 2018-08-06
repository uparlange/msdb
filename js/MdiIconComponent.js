import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class MdiIconComponent extends AbstractComponent {
    static get annotations() {
        return this.getAnnotations({
            selector: "mdiIcon",
            inputs: ["name", "size"],
            host: {
                "role": "img"
            }
        });
    }
    static get parameters() {
        return AppUtils.getParameters(AbstractClassHelper);
    }
    constructor(AbstractClassHelper) {
        super(AbstractClassHelper);
        this.name = "";
        this.size = 24;
        this.iconAvailable = false;
    }
    onInit() {
        this._refreshIconAvailable();
    }
    onChanges(event) {
        if (event.hasOwnProperty("name")) {
            this._refreshIconAvailable();
        }
    }
    _refreshIconAvailable() {
        this.iconAvailable = this._iconAvailable();
    }
    _iconAvailable() {
        const styleSheetsCount = document.styleSheets.length;
        for (let i = 0; i < styleSheetsCount; i++) {
            const styleSheet = document.styleSheets[i];
            if (styleSheet.href && styleSheet.href.indexOf("@mdi") != -1) {
                const rulesCount = styleSheet.rules.length;
                for (let j = 0; j < rulesCount; j++) {
                    const rule = styleSheet.rules[j];
                    if (rule.selectorText == ".mdi-" + this.name + "::before") {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

export default MdiIconComponent;