import { useCreateOrganization, useCreateTeam, useDeleteSessions, useGetMe, useListAccountMemberships } from "@realmocean/sdk";
import { UIController, UIRouteOutlet, UIScene, UIView, DialogContainer, VStack, Fragment, UINavigate, Text, Button, useNavigate, HStack, cTopLeading, cLeading, useState, nanoid } from "@tuval/forms";
import { LeftMenu } from "../view/LeftMenu";
import { LoadingButton,  TextField } from "@realmocean/atlaskit";
import { AccountContext } from "../../../context/account";
import { Navigation } from "./view/TopBar";
import React from "react";


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
                        TextField().onBlur((e:any) => setName(e.target.value))
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
                        VStack(
                           <Navigation></Navigation>
                        ).height().display('block'),
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