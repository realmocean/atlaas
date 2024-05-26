
import { Atlaas } from "@realmocean/atlaas";
import { HStack, UIController, UIView, VStack, cHorizontal, cTopLeading, useParams } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";
import { useProject } from "../../../../../../context/project/context";
import { useUpdateScenarioContent } from "../../../../../../hooks/useUpdateScenarioContent";
import { useGetScenario } from "../../../../../../hooks/useGetScenario";

let filterTimeout;

export class ScenarioController extends UIController {
    public override LoadView(): UIView {
        const { project } = useProject();
        const { scenarioId } = useParams();
        const { scenario } = useGetScenario(scenarioId);
        const { updateScenarioContent } = useUpdateScenarioContent();

        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            VStack({ alignment: cTopLeading, spacing: 5 })(
                VStack(
                    PageHeader('Scenario 1')
                        .breadcrumbs([
                            {
                                title: 'Projects',
                            },
                            {
                                title: project.name
                            },
                            {
                                title: 'Scenarios'
                            }
                        ]),

                ).height().display('block'),
                Atlaas((data) => {
   
                   
                        alert(JSON.stringify(data))
                         updateScenarioContent(scenarioId, data)
                   

                })
            )
                .background('white')
                .padding(cHorizontal, 'var(--page-padding)')


        )
    }
}