import { useCreateDocument } from "@realmocean/sdk"
import { useProject } from "../context/project/context"


export const useCreateScenario = () => {
    const { project } = useProject();
    const { createDocument, isLoading } = useCreateDocument(project.$id, 'scenarios', 'scenario');
    const createScenario = (scenarioData: { name: string }) => {
        createDocument({
            data: scenarioData
        })
    }
    return { createScenario, isLoading };
}