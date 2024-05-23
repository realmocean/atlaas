
import { Atlaas } from "@realmocean/atlaas";
import { HStack, Text, UIController, UIView, VStack, cHorizontal, cTopLeading } from "@tuval/forms";
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import React from "react";
import Heading from '@atlaskit/heading';
import { useProject } from "../../../../../../context/project/context";
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";
import { useOrganization } from "../../../../../../context/organization/context";
import { useOrganizationNavigate } from "../../../../../../hooks/useOrganizationNavigate";

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import __noop from '@atlaskit/ds-lib/noop';
import { Box, Inline, xcss } from '@atlaskit/primitives';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search'
import { PageHeader } from "../../../../view/PageHeader";


export class ScenariosController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();
  

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
        ).height().display('block')
      )
        .background('white')
        .padding(cHorizontal, 'var(--page-padding)')

    )
  }
}