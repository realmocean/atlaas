import { LoadingButton, TextField } from "@realmocean/atlaskit";
import { useCreateOrganization, useDeleteSessions, useListAccountMemberships } from "@realmocean/sdk";
import { Fragment, UIController, UIRouteOutlet, UIView, VStack, cTopLeading, nanoid, useNavigate, useState } from "@tuval/forms";
import { AccountContext } from "../../../context/account";


export class LayoutController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { deleteSessions, isError, isSuccess } = useDeleteSessions('console');

        return (
            AccountContext(() => {
                const { memberships, isLoading } = useListAccountMemberships('console');
                const { createTeam, isError, isSuccess } = useCreateOrganization();
                const [name, setName] = useState();


                return (isLoading ? Fragment() : memberships.length === 0 ?

                    VStack(
                        TextField().onBlur((e: any) => setName(e.target.value))
                            .value(name),
                        LoadingButton().label('Create Organization')
                            .onClick(() => {
                                createTeam({
                                    id: nanoid(),
                                    name: name
                                })
                            })
                    )

                    :
                    VStack({ alignment: cTopLeading })(

                        UIRouteOutlet().width('100%').height('100%')
                        /*  HStack({ alignment: cTopLeading })(
                             LeftMenu(),
                              UIRouteOutlet().width('100%').height('100%') 
                         ) */
                    )
                )

            })


        )
    }
}