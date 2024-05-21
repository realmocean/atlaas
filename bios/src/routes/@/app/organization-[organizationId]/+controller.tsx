import { useDeleteSessions } from "@realmocean/sdk";
import { HStack, UIController, UIRouteOutlet, UIView, VStack, cTopLeading, useNavigate } from "@tuval/forms";

import React from "react";
import { OrganizationContext, useOrganization } from "../../../../context/organization/context";
import { Navigation } from "./view/TopBar";


export class OrganizationController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { deleteSessions, isError, isSuccess } = useDeleteSessions('console');

        return (
            OrganizationContext(() => {
                const { organization } = useOrganization();
                return (
                    VStack({alignment:cTopLeading})(
                        VStack(
                            <Navigation></Navigation>
                        ).height().display('block'),
                        HStack(
                           
                            // LeftMenu(),
                             UIRouteOutlet().width('100%').height('100%')
                        )
                    )
                )
            }
            )
        )
    }
}