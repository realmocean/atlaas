import { useDeleteSessions, useGetMe } from "@realmocean/sdk";
import { UIController, UIRouteOutlet, UIScene, UIView, DialogContainer, VStack, Fragment, UINavigate, Text, Button, useNavigate, HStack, cTopLeading, cLeading } from "@tuval/forms";

import { Navigation } from "@realmocean/atlaskit";
import { LeftMenu } from "../../view/LeftMenu";
import { OrganizationContext } from "../../../../context/organization/context";


export class OrganizationController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { deleteSessions, isError, isSuccess } = useDeleteSessions('console');

        return (
            OrganizationContext(() =>
                HStack(
                   // LeftMenu(),
                    UIRouteOutlet().width('100%').height('100%')
                )
            )
        )
    }
}