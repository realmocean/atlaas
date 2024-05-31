import Button from '@atlaskit/button/new';
import { UIController, UIView, VStack, cHorizontal, cTopLeading } from "@tuval/forms";
import { useProject } from "../../../../../../context/project/context";
import { PageHeader } from "../../../../view/PageHeader";
import EmptyState from '@atlaskit/empty-state';
import React from 'react';


export class DataStoresController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();
    return (
      VStack({ alignment: cTopLeading, spacing: 5 })(
        PageHeader()
          .pageTitle('Data stores')
          .breadcrumbs([
            {
              title: 'Projects'
            },
            {
              title: project.name
            }
          ]),
          <EmptyState
          header="You don't have any data store."
          description="Cihazlat sensor, smart phone veya el terminali olabilir."
          headingLevel={2}
          primaryAction={<Button appearance="primary">Create a sata store</Button>}
          imageUrl={`/images/device_and_hardware.png`}
        />
      )
        .background('white')
        .padding(cHorizontal, 'var(--page-padding)')

    )
  }
}