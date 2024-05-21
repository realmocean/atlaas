import { DialogView,  Spinner, VStack, ViewProperty } from "@tuval/forms";
import { FormBuilder } from "./FormBuilder";


export class DynoDialog extends DialogView {

    @ViewProperty()
    private form: any;

    public constructor() {
        super();
        this.Header = 'Form'
        this.Width = '624px';
        this.Position = 'right';
        this.Height = '100%'
    }

    public BindRouterParams(formData) {
        this.form = formData;
    }

    public OnOK() {
        this.ShowDialogAsyncResolve();
        this.Hide();
    }

    public OnCancel() {
        this.Hide();
    }

    public override LoadView() {
        return (this.form == null ? Spinner():

                VStack(
                    FormBuilder.render(this.form)
                )

        )
    }

    public static Show(formData: any) {
        const dialog = new DynoDialog();
        dialog.ShowHeader = false;
        dialog.BindRouterParams(formData)
        return dialog.ShowDialogAsync();
    }
}