import { urlFriendly, useNavigate } from "@tuval/forms";
import { useAccount } from "../context/account";
import { useOrganization } from "../context/organization/context";
import { useProject } from "../context/project/context";

export const useOrganizationNavigate = (): { navigate: Function } => {
    const { account } = useAccount();
    const { organization } = useOrganization();

    const navigate = useNavigate();

    return {
        navigate: (url: string, selectApplet: boolean = true) => {
            if (url?.length > 0 && url?.[0] !== '/') {
                url = '/' + url;
            }

            navigate(`/app/${urlFriendly(organization.name)}-${organization.$id}${url}`)

        }
    }

}