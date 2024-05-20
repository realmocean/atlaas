import { BiosController, Text, UIController, UIRoute, UIRouteOutlet, UIRoutes, UIView } from "@tuval/forms"
import { LoginController } from "./@/login/+controller"
import { SignupController } from "./@/signup/+controller"
//@ts-ignore
import { HomeController } from "./@/app/+controller"
import { LandingController } from "./@/+controller"
import { LayoutController } from "./@/app/+layout"


class KontDrakula extends UIController {
    LoadView(): UIView {
        return (
            UIRouteOutlet().width('100%').height('100%')
        )
    }
}
class AddController extends UIController {
    LoadView(): UIView {
        return (
            Text('asdfdf')
        )
    }
}
export class RoutesController extends BiosController {
    LoadBiosView(): UIView {
        return (
            UIRoutes(
                UIRoute('/', LandingController),
                UIRoute('/app', LayoutController).children(
                    UIRoute('', HomeController),
                    UIRoute('*', HomeController),
                ),
                UIRoute('/login', LoginController),
                UIRoute('/signup', SignupController),
                UIRoute('/logout', LoginController)
            )
        )
    }
   

}