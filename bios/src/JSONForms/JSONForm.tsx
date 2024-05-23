import { DialogView, ReactView, Spinner, VStack, ViewProperty } from "@tuval/forms";
import { AddFormDialogSchema } from "../routes/@/app/organization-[organizationId]/project-[projectId]/forms/dialogs/AddFormDialog";
import { WithReact } from "./WithReact";
import React from "react";


export class JSONForm extends DialogView {

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
        return (this.form == null ? Spinner() :

            ReactView(
                <WithReact schema={this.form} handleSubmit={({ formValues, jsonValues }) => {
                    this.ShowDialogAsyncResolve({ formValues, jsonValues });
                    this.Hide();
                }
                }></WithReact>
            )

        )
    }

    public static Show(formData: any) {
        const dialog = new JSONForm();
        dialog.ShowHeader = false;
        dialog.BindRouterParams(formData)
        return dialog.ShowDialogAsync();
    }
}