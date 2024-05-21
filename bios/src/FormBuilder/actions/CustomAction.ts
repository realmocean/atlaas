import { Button, Text, UIViewBuilder, useDialog, useFormController, useState } from "@tuval/forms";

export const CustomAction = (formMeta, action) => UIViewBuilder(() => {
    const { label, successAction, successActions, onClick } = action;
    const formController = useFormController();
    const dialog = useDialog();

    const [loading, setLoading] = useState(false);

    return (
        Button(
            Text(label)
        )
            .loading(loading)
            .onClick(() => {
                setLoading(true);
                onClick(formController.GetFormData()).then((result) => {
                    dialog.Hide();
                });

            })
    )
}
)