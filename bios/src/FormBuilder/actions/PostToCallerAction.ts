
import { useFormController, useDialog, Button, Text } from "@tuval/forms";
import { useFormBuilder } from "../FormBuilder";

export const PostToCallerAction = (formMeta, action) => {
    const { label } = action;
    const formController = useFormController();
    const formBuilder = useFormBuilder();
    const dialog = useDialog();

    const views = []
    const { fieldMap, layout, mode, resource, resourceId, title, protocol, mutation, query, actions } = formMeta as any;




    return (
        Button(
            Text(label)
        )
            .onClick(() => {
                (dialog as any).ShowDialogAsyncResolve(formController.GetFormData());
                dialog.Hide();
            })
    )
}