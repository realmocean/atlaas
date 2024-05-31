
import { RafDesigner } from "@realmocean/atlaas";
import { HStack, Spinner, UIController, UIView, VStack, cHorizontal, cTopLeading, useParams } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";
import { useProject } from "../../../../../../context/project/context";
import { useUpdateScenarioContent } from "../../../../../../hooks/useUpdateScenarioContent";
import { useGetScenario } from "../../../../../../hooks/useGetScenario";
import { useGetScenarioContent } from "../../../../../../hooks/useGetScenarioContent";

let filterTimeout;

export class ScenarioController extends UIController {
    public override LoadView(): UIView {
        const { project } = useProject();
        const { scenarioId } = useParams();
        const { scenario } = useGetScenario(scenarioId);
        const {scenarioContent, isLoading } = useGetScenarioContent(scenarioId);
        const { updateScenarioContent } = useUpdateScenarioContent();

        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            isLoading ? Spinner() :
            VStack({ alignment: cTopLeading, spacing: 5 })(
                VStack(
                    PageHeader(scenario.name)
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
                RafDesigner()
                .onSave((data) => {

                
                         updateScenarioContent(scenarioId, data)
                   

                })
                .initialValue(scenarioContent)
                
            )
                .background('#F8F8F8')
                .padding(cHorizontal, 'var(--page-padding)')


        )
    }
}