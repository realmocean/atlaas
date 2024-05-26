import { useListAccountMemberships } from "@realmocean/sdk";
import { UIController, UINavigate, UIView, urlFriendly } from "@tuval/forms";
import { AccountContext } from '../../../context/account/AccountContext';



export class HomeController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            AccountContext(() => {
                const { memberships, isLoading } = useListAccountMemberships('console');
                return ( 
                    !isLoading && memberships.length > 0 ? 
                    UINavigate(`/app/${urlFriendly(memberships[0].teamName)}-${memberships[0].teamId}`)
                    :
                    UINavigate('/organizatiion-not-found')

                )
            })

        )
    }
}