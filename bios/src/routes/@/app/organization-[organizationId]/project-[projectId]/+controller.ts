import { ProjectContext, useDeleteSessions, useGetMe } from "@realmocean/sdk";
import { UIController, UIRouteOutlet, UIScene, UIView, DialogContainer, VStack, Fragment, UINavigate, Text, Button, useNavigate, HStack, cTopLeading, cLeading } from "@tuval/forms";

import { Navigation } from "@realmocean/atlaskit";
import { LeftMenu } from "../../../view/LeftMenu";


export class ProjectController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {
        return (
            ProjectContext(() =>
                HStack({ alignment: cTopLeading })(
                    UIRouteOutlet().width('100%').height('100%')
                )
            )
        )
    }
}