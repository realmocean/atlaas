import { is } from "@tuval/core";
import { Button, Fragment, Text, UIViewBuilder, compileFormula, useDialog, useFormBuilder, useFormController, useNavigate, useQueryClient } from "@tuval/forms";

import { useBroker } from "@realmocean/sdk";

export const SaveAction = (formMeta, action) => UIViewBuilder(() => {
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
    const { protocol, resource, method } = formMeta as any;
    const queryClient = useQueryClient();

    if (protocol) {
        const spacesBroker = useBroker(protocol);
        const resourceMethods = (spacesBroker as any).getResourceMethods()?.[resource];

        if (method === 'create') {
            createMutate = resourceMethods["create"];
        }

        if (method === 'update') {
            updateMutate = resourceMethods["update"];
        }

    }


    return (
        (!is.function(formMutate) && !is.function(createMutate) && !is.function(updateMutate)) ? Fragment() :
            Button(
                Text(label)
            )
                .loading(isFormMutateExcuting)
                .onClick(() => {
                    if (createMutate != null) {
                        createMutate(formController.GetFormData())
                            .then((e) => {
                                queryClient.invalidateQueries([resource]);
                                /* if (is.function(invalidateResource)) {
                                    invalidateResource();
                                } */
                                if (successAction === 'prev') {
                                    formBuilder.prevForm();
                                } else if (successAction === 'next') {
                                    formBuilder.nextForm();
                                } else if (successAction === 'hide') {
                                    dialog.Hide();
                                }

                                if (is.array(successActions)) {
                                    successActions.forEach(successAction => {
                                        if (successAction.type === 'prev') {
                                            formBuilder.prevForm();
                                        } else if (successAction.type === 'next') {
                                            formBuilder.nextForm();
                                        } else if (successAction.type === 'hide') {
                                            dialog.Hide();
                                        } else if (successAction.type === 'navigate') {
                                            navigate(compileFormula(e, successAction.url))
                                        }
                                    })
                                }
                            })
                        /*  createMutate(formController.GetFormData(), {
                             onSuccess: (e) => {
                                 if (is.function(invalidateResource)) {
                                     invalidateResource();
                                 }
                                 if (successAction === 'prev') {
                                     formBuilder.prevForm();
                                 } else if (successAction === 'next') {
                                     formBuilder.nextForm();
                                 } else if (successAction === 'hide') {
                                     dialog.Hide();
                                 }
 
                                 if (is.array(successActions)) {
                                     successActions.forEach(successAction => {
                                         if (successAction.type === 'prev') {
                                             formBuilder.prevForm();
                                         } else if (successAction.type === 'next') {
                                             formBuilder.nextForm();
                                         } else if (successAction.type === 'hide') {
                                             dialog.Hide();
                                         } else if (successAction.type === 'navigate') {
                                             navigate(compileFormula(e, successAction.url))
                                         }
                                     })
                                 }
                             }
                         }); */
                    }
                    if (updateMutate != null) {
                        /*   updateMutate(resourceId, formController.GetFormData(), {
                              onSuccess: (e) => {
                                  if (is.function(invalidateResource)) {
                                      invalidateResource();
                                  }
                                  if (successAction === 'prev') {
                                      formBuilder.prevForm();
                                  } else if (successAction === 'next') {
                                      formBuilder.nextForm();
                                  } else if (successAction === 'hide') {
                                      dialog.Hide();
                                  }
  
                                  if (is.array(successActions)) {
                                      successActions.forEach(successAction => {
                                          if (successAction.type === 'prev') {
                                              formBuilder.prevForm();
                                          } else if (successAction.type === 'next') {
                                              formBuilder.nextForm();
                                          } else if (successAction.type === 'hide') {
                                              dialog.Hide();
                                          } else if (successAction.type === 'navigate') {
                                              navigate(compileFormula(e, successAction.url))
                                          }
                                      })
                                  }
                              }
                          }); */
                    }

                })
    )
}
)