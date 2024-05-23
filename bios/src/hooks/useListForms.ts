import { useCreateDocument, useListDocuments } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { Models } from "../Models";


export const useListForms = (): { forms: Models.Form[], isLoading: boolean } => {
    const { project } = useProject();
    const { documents, isLoading } = useListDocuments(project.$id, 'forms', 'form');

    return { forms: documents as unknown as Models.Form[], isLoading };
}