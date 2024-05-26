import { useCreateDocument, useGetDocument, useListDocuments } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { Models } from "../Models";


export const useGetScenarioContent = (scenarioId: string): { scenarioContent: object[], isLoading: boolean } => {
    const { project } = useProject();
    const { document, isLoading } = useGetDocument({
        projectId: project.$id,
        databaseId: 'scenarios',
        collectionId: 'scenario_content',
        documentId: scenarioId
    });

    return { scenarioContent: document ? JSON.parse(document) : [], isLoading };
}