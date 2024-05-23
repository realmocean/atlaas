import { useCreateDocument } from "@realmocean/sdk"
import { useProject } from "../context/project/context"


export const useCreateForm = () => {
    const { project } = useProject();
    const { createDocument, isLoading } = useCreateDocument(project.$id, 'forms', 'form');
    const createForm= (formData: {name: string}) => {
        createDocument({
            data: formData
        })
    }
    return { createForm, isLoading };
}