
import { useCreateOrganization, useDeleteSessions, useListAccountMemberships } from "@realmocean/sdk";
import { Fragment, UIController, UIRouteOutlet, UIView, VStack, cTopLeading, nanoid, useNavigate, useState, TextField, Text } from "@tuval/forms";
import { AccountContext } from "../../../context/account";
import { Label } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import React from "react";
import Button from '@atlaskit/button/new';

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
                        <Label htmlFor="basic-textfield">Organization Name</Label>,
                        <div>
                            <Textfield name="basic" id="basic-textfield" onChange={(e: any) => setName(e.target.value)} />
                        </div>,
                        <Button appearance="primary" onClick={() => {
                            createTeam({
                                id: nanoid(),
                                name: name
                            },()=> void 0)
                        }}>Create Organization</Button>

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