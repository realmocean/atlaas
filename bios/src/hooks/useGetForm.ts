import { useCreateDocument, useGetDocument, useListDocuments } from "@realmocean/sdk"
import { useProject } from "../context/project/context"
import { Models } from "../Models";


export const useGetForm = (formId: string): { form: Models.Form, isLoading: boolean } => {
    const { project } = useProject();
    const { document, isLoading } = useGetDocument({
        projectId: project.$id,
        databaseId: 'forms',
        collectionId: 'form',
        documentId: formId
    });

    return { form: document as unknown as Models.Form, isLoading };
}