import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class MdiIconComponent extends AbstractComponent {
    static get annotations() {
        return this.getAnnotations({
            selector: "mdi-icon",
            inputs: ["name", "size"],
            host: {
                "role": "img"
            }
        });
    }
    static get parameters() {
        return AppUtils.getParameters(AbstractClassHelper, ng.core.ElementRef);
    }
    constructor(AbstractClassHelper, ElementRef) {
        super(AbstractClassHelper);
        this._element = ElementRef.nativeElement;
        this.name = "";
        this.size = 24;
        this.iconExists = false;
    }
    onInit() {
        this._refreshIconExists();
    }
    onChanges(event) {
        if (event.hasOwnProperty("name")) {
            this._refreshIconExists();
        }
    }
    _refreshIconExists() {
        this.iconExists = this._iconExists();
    }
    _iconExists() {
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