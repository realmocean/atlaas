
import { Atlaas } from "@realmocean/atlaas";
import { HStack, UIController, UIView, VStack, cHorizontal, cTopLeading } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";
import { useProject } from "../../../../../../context/project/context";

export class ScenarioController extends UIController {
    public override LoadView(): UIView {
        const {project} = useProject();
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            VStack({ alignment: cTopLeading, spacing: 5 })(
                VStack(
                    PageHeader('Scenario 1')
                    .breadcrumbs([
                        {
                            title:'Projects',
                        },
                        {
                            title: project.name
                        },
                        {
                            title: 'Scenarios'
                        }
                    ]),

                ).height().display('block'),
                Atlaas()
            )
                .background('white')
                .padding(cHorizontal, 'var(--page-padding)')


        )
    }
}