
import { ForEach, HStack, Icon, ReactView, Text, UIController, UIView, VStack, cHorizontal, cLeading, cTopLeading } from "@tuval/forms";
import React from "react";
import { useProject } from "../../../../../../context/project/context";
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";

import { IconButton } from '@atlaskit/button/new';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import MoreIcon from '@atlaskit/icon/glyph/more';
import { JSONForm } from "../../../../../../JSONForms/JSONForm";
import { useCreateScenario } from "../../../../../../hooks/useCreateScenario";
import { useListScenarios } from "../../../../../../hooks/useListScenarios";
import { PageHeader } from "../../../../view/PageHeader";
import { AddScenarioDialog } from "./dialogs/AddScenarioDialog";

export class ScenariosController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();
  
    const { navigate } = useProjectNavigate();

    const {scenarios} = useListScenarios();
    const { createScenario } = useCreateScenario();

    return (
      VStack({ alignment: cTopLeading, spacing: 5 })(
        VStack(
          PageHeader('Scenarios')
          .breadcrumbs([
            {
              title:'Projects'
            },
            {
              title: project.name
            }
          ])
          .onActionButtonClick(() => {
            JSONForm.Show(AddScenarioDialog).then(({ formValues }) => {
              createScenario(formValues)
              // alert(JSON.stringify(formValues))
            })
          }),
        ).height().display('block'),
        VStack({ alignment: cTopLeading })(
          ...ForEach(scenarios)(scenario =>
            HStack({ spacing: 20 })(
              Icon('\\d373').fontSize(20),
              HStack({ alignment: cLeading })(
                VStack({ alignment: cLeading, spacing: 5 })(
                  Text(scenario.name)
                    .fontSize(16)
                    .foregroundColor('rgb(51, 51, 51)'),
                  Text(scenario.description).fontSize(12).foregroundColor('#333')
                )
                  .onClick(() => {
                    navigate('[scenarios]/' + scenario.$id);
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
      )
        .background('white')
        .padding(cHorizontal, 'var(--page-padding)')

    )
  }
}