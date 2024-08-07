
import { IconButton } from '@atlaskit/button/new';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { ForEach, HStack, Icon, ReactView, Spinner, Text, UIController, UIView, VStack, cHorizontal, cLeading, cTopLeading } from "@tuval/forms";
import React, { useState } from "react";
import { JSONForm } from "../../../../../../JSONForms/JSONForm";
import { useProject } from "../../../../../../context/project/context";
import { useCreateForm } from "../../../../../../hooks/useCreateForm";
import { useListForms } from "../../../../../../hooks/useListForms";
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";
import { PageHeader } from "../../../../view/PageHeader";
import { AddFormDialogSchema } from "./dialogs/AddFormDialog";
//import { JsonEditor } from 'json-edit-react'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';

import Button from '@atlaskit/button/new';
import EmptyState from '@atlaskit/empty-state';

export class FormsController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();

    const { createForm } = useCreateForm();
    const { forms, isLoading } = useListForms();
    const { navigate } = useProjectNavigate();

    // const { fields, handleValidation } = createHeadlessForm(schema, { strictInputType: false });
    //  const { realms, isLoading } = useListRealms();
    //  console.log('Error -- :' + error?.code)

    //console.log(fields)
    const [formData, setFormData] = useState();
    return ( isLoading ? Spinner() :
      VStack({ alignment: cTopLeading, spacing: 5 })(
        PageHeader()
          .pageTitle('Forms')
          .breadcrumbs([
            {
              title: 'Projects'
            },
            {
              title: project.name
            }
          ])
          .onActionButtonClick(() => {
            JSONForm.Show(AddFormDialogSchema).then(({ formValues }) => {
              createForm(formValues)
              // alert(JSON.stringify(formValues))
            })
          }),

          forms.length === 0 &&    
          <EmptyState
          header="You don't have any form."
          description="Cihazlat sensor, smart phone veya el terminali olabilir."
          headingLevel={2}
          primaryAction={<Button appearance="primary">Create a form</Button>}
          imageUrl={`/images/device_and_hardware.png`}
        />,
        VStack({ alignment: cTopLeading })(
          ...ForEach(forms)(form =>
            HStack({ spacing: 20 })(
              Icon('\\d28f').fontSize(20),
              HStack({ alignment: cLeading })(
                VStack({ alignment: cLeading, spacing: 5 })(
                  Text(form.name)
                    .fontSize(16)
                    .foregroundColor('rgb(51, 51, 51)'),
                  Text(form.description).fontSize(12).foregroundColor('#333')
                )
                  .onClick(() => {
                    navigate('[forms]/' + form.$id);
                  })
              ),
              HStack(
                ReactView(
                  <DropdownMenu<HTMLButtonElement>
                    trigger={({ triggerRef, ...props }) => (
                      <IconButton {...props} icon={MoreIcon} label="more" ref={triggerRef} />
                    )}
                    shouldRenderToParent={false}
                  >
                    <DropdownItemGroup>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Share</DropdownItem>
                      <DropdownItem>Move</DropdownItem>
                      <DropdownItem>Clone</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                      <DropdownItem>Report</DropdownItem>
                    </DropdownItemGroup>
                  </DropdownMenu>
                  
                )
              ).width(200)
            ).height(70)
            .cursor('pointer')
            .padding(cHorizontal, 10)
              .shadow({ hover: 'rgba(0, 0, 0, 0.1) 0px 5px 30px 0px' })
              .transform({ hover: 'scale(1.01) perspective(0) translateZ(0)' })
              .transition('transform .2s,box-shadow .2s,background-color .2s')

          )
        )


        /*      ReactView(
               <WithReact schema={AddFormDialogSchema} handleSubmit={({ formValues, jsonValues }) => alert(formValues)}></WithReact>
             ) */

      )
        .padding(cHorizontal, 'var(--page-padding)')
        .background('white')

    )
  }
}