import { LoadingButton, useFormState } from "@realmocean/atlaskit";
import { SchemaBroker, useCreateDocument, useCreateRealm } from "@realmocean/sdk";
import { EventBus } from "@tuval/core";
import { UIViewBuilder, useFormController, useDialog, useFormBuilder, useNavigate, Button, Text, nanoid } from "@tuval/forms";
import { FormBuilder } from "../FormBuilder/FormBuilder";
import { useOrganization } from "../context/organization/context";
import { Schema } from "../schema/schema";


export const SaveDocumentAction = (formMeta, action) => UIViewBuilder(() => {
    const { label, successAction, successActions } = action;
    const formController = useFormController();
    const dialog = useDialog();
    const formBuilder = useFormBuilder();
    const navigate = useNavigate();

    let invalidateResource = null;
    let formMutate = null;
    let createMutate = null;
    let updateMutate = null;
    let isFormMutateExcuting = false;
    let isFormLoading = false;

    const views = []
    const { organizationId } = formMeta;
    const { createRealm } = useCreateRealm();

    const formData: any = useFormState({
        values: true,
        errors: true
    });

    return (
        LoadingButton().appearance("primary").label('Save')
            // .loading(isLoading)
            .onClick(() => {

                const data = formData?.values ?? {};


                createRealm({ realmId: nanoid(), name: data.name, organizationId: organizationId }, async (realm)=> {

                    SchemaBroker.Default
                    .setRealm(realm.$id);
                    await SchemaBroker.Default.create(null,Schema);
                    dialog.Hide();
                })

            })
    )
}
)

SaveDocumentAction.Id = nanoid();

export const AddProjectDialog = (organizationId: string) => {

    return {
        "title": 'Create project',
        "organizationId": organizationId,
        "actions": [
            {
                "label": "Save",
                "type": SaveDocumentAction.Id,
                /*  "successActions": [{
                     "type": "hide"
                 },
                 {
                     "type": "navigate",
                     "url": "/@/com.tuvalsoft.app.procetra/workspace/{{id}}"
                 }
                 ] */
                /*  "successActions": [{
                 "type": "hide"
             },
             {
                 "type": "navigate",
                 "url": "/@/com.tuvalsoft.app.procetra/workspace/{{id}}"
             }
             ] */
            }
        ],
        "fieldMap": {

            "list_name": {
                "label": "name",
                "type": "text",
                "name": "name"
            }
        }
    }

}

FormBuilder.injectAction(SaveDocumentAction);