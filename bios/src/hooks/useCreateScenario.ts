import { useCreateDocument } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { nanoid } from "@tuval/forms";


export const useCreateScenario = () => {
    const { project } = useProject();
    const { createDocument, isLoading } = useCreateDocument(project.$id, 'scenarios', 'scenario');
    const { createDocument: createContent, isLoading:isContentCreating } = useCreateDocument(project.$id, 'scenarios', 'scenario_content');
    const createScenario = (scenarioData: { name: string }) => {
        createDocument({
            documentId:nanoid(),
            data: scenarioData
        }, (scenario) => {
            createContent({
                documentId: scenario.$id,
                data : {
                    content:JSON.stringify([])
                }
            })
        })
    }
    return { createScenario, isLoading };
}