import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class Counter
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _label : HTMLSpanElement;
    private _value : number;
    private _notifyOutputChanged: () => void;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void{
        this._notifyOutputChanged = notifyOutputChanged;
        const minus = document.createElement("button");
        minus.innerText= "-";
        minus.addEventListener("click", this.OnMinus.bind(this));

        this._label = document.createElement("span");
        const plus = document.createElement("button");
        plus.innerText="+";
        plus.addEventListener("click", this.onPlus.bind(this));

        container.appendChild(minus);
        container.appendChild(this._label);
        container.appendChild(plus);
    }
    public updateView(context:ComponentFramework.Context<IInputs>): void{
        this._value = context.parameters.counterValue.raw || 0;
        this._label.innerText = this._value.toString();
    }
    public onPlus():void{
        this._value++;
        this._notifyOutputChanged();
    }
    public OnMinus():void{
        this._value--;
        this._notifyOutputChanged();
    }
    public getOutputs(): IOutputs{
        return{counterValue: this._value};
}
public destroy():void{
// Add cleanup code if necessary
}
  }