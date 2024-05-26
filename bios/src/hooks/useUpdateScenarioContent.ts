import { useCreateDocument, useUpdateDocument } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { nanoid } from "@tuval/forms";


export const useUpdateScenarioContent = () => {
    const { project } = useProject();
    const { updateDocument, isLoading } = useUpdateDocument(project.$id);

    const updateScenarioContent = (scenarioId: string, content: object) => {
     
        updateDocument({
          databaseId : 'scenarios',
          collectionId: 'scenario_content',
          documentId: scenarioId,
          data: {
            content : JSON.stringify(content)
          }
        })
    }
    return { updateScenarioContent, isLoading };
}