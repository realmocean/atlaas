
import { Button, useFormController, Text } from "@tuval/forms";
import { useFormBuilder } from "../FormBuilder";

export const NextFormAction = (formMeta, action) => {
    const { label } = action;
    const formController = useFormController();
    const formBuilder = useFormBuilder();

    const views = []
    const { fieldMap, layout, mode, resource, resourceId, title, protocol, mutation, query, actions } = formMeta as any;




    return (
        Button(
            Text(label)
        )
            .onClick(() => {
                formBuilder.nextForm()
            })
    )
}