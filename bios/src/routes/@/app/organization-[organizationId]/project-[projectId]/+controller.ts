
import { HStack, UIController, UIRouteOutlet, UIView, cTopLeading } from "@tuval/forms";
import { LeftMenu } from "../../../view/LeftMenu";
import { ProjectContext } from "../../../../../context/project/context";



export class ProjectController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {
        return (
            ProjectContext(() =>
                HStack({ alignment: cTopLeading })(
                    LeftMenu(),
                    UIRouteOutlet().width('100%').height('100%')
                )
            )
        )
    }
}