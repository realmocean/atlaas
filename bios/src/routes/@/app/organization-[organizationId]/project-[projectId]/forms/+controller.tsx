
import { Atlaas } from "@realmocean/atlaas";
import { HStack, Text, UIController, UIView, VStack, cTopLeading } from "@tuval/forms";
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import React from "react";
import Heading from '@atlaskit/heading';
import { useProject } from "../../../../../../context/project/context";
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";
import { useOrganization } from "../../../../../../context/organization/context";
import { useOrganizationNavigate } from "../../../../../../hooks/useOrganizationNavigate";
import { PageHeader } from "../../../../view/PageHeader";



export class FormsController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();
    //  const { realms, isLoading } = useListRealms();
    //  console.log('Error -- :' + error?.code)
    return (
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
      )
        .background('white')
    )
  }
}