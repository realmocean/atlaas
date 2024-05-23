
import { UIController, UIView, VStack, cTopLeading } from "@tuval/forms";
import { useProject } from "../../../../../../context/project/context";
import { PageHeader } from "../../../../view/PageHeader";






export class DevicesController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();
    return (
      VStack({ alignment: cTopLeading, spacing: 5 })(
        PageHeader()
          .pageTitle('Devices')
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