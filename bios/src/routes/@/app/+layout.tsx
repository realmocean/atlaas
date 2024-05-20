import { useDeleteSessions, useGetMe } from "@realmocean/sdk";
import { UIController, UIRouteOutlet, UIScene, UIView, DialogContainer, VStack, Fragment, UINavigate, Text, Button, useNavigate, HStack, cTopLeading, cLeading } from "@tuval/forms";
import { LeftMenu } from "../view/LeftMenu";
import { Navigation } from "@realmocean/atlaskit";


export class LayoutController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { deleteSessions, isError, isSuccess } = useDeleteSessions('console');

        return (

            VStack({ alignment: cTopLeading })(
                HStack({ alignment: cLeading })(
                    Navigation("")
                ).height().display('block'),
                HStack({ alignment: cTopLeading })(
                    LeftMenu(),
                     UIRouteOutlet().width('100%').height('100%') 
                ).background('yellow')
            )

        )
    }
}