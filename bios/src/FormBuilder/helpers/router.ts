import { useParams } from "@tuval/forms";


export const RouterHelpers = {
    router: (paramName: string) => {
       
        const params = useParams();
        alert(params)
        return params[paramName];
    }
}