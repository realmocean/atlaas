import { useCreateDocument, useListDocuments } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { Models } from "../Models";


export const useListScenarios = (): { scenarios: Models.Scenario[], isLoading: boolean } => {
    const { project } = useProject();
    const { documents, isLoading } = useListDocuments(project.$id, 'scenarios', 'scenario');

    return { scenarios: documents as unknown as Models.Scenario[], isLoading };
}