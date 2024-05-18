import { useDeleteSessions, useGetMe } from "@realmocean/sdk";
import { UIController, UIRouteOutlet, UIScene, UIView, DialogContainer, VStack, Fragment, UINavigate, Text, Button, useNavigate, HStack } from "@tuval/forms";
import { LeftMenu } from "./view/LeftMenu";

export class LayoutController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {

        const navigate = useNavigate();
        const { deleteSessions, isError, isSuccess } = useDeleteSessions('console');

        return (
            UIScene(
                HStack(
                    LeftMenu(),
                    UIRouteOutlet().width('100%').height('100%')
                )
            )

        )
    }
}