import { useCreateDocument, useGetDocument, useListDocuments } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { Models } from "../Models";


export const useGetScenario = (scenarioId: string): { scenario: Models.Scenario, isLoading: boolean } => {
    const { project } = useProject();
    const { document, isLoading } = useGetDocument({
        projectId: project.$id,
        databaseId: 'scenarios',
        collectionId: 'scenario',
        documentId: scenarioId
    });

    return { scenario: document as unknown as Models.Scenario, isLoading };
}