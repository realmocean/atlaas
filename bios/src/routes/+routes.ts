import { BiosController, Text, UIController, UIRoute, UIRouteOutlet, UIRoutes, UIView } from "@tuval/forms"
import { LoginController } from "./@/login/+controller"
import { SignupController } from "./@/signup/+controller"
//@ts-ignore
import { HomeController } from "./@/app/+controller"
import { LandingController } from "./@/+controller"
import { LayoutController } from "./@/app/+layout"
import { OrganizationController } from "./@/app/organization-[organizationId]/+controller"
import { ProjectController } from "./@/app/organization-[organizationId]/project-[projectId]/+controller"
import { ScenarioController } from "./@/app/organization-[organizationId]/project-[projectId]/scenario-[scenarioId]/+controller"
import { ScenariosController } from "./@/app/organization-[organizationId]/project-[projectId]/scenarios/+controller"
import { LogoutController } from "./@/logout/+controller"
import { ProjectsController } from "./@/app/organization-[organizationId]/projects/+controller"
import { FormsController } from "./@/app/organization-[organizationId]/project-[projectId]/forms/+controller"
import { DevicesController } from "./@/app/organization-[organizationId]/project-[projectId]/devices/+controller"
import { DataStoresController } from "./@/app/organization-[organizationId]/project-[projectId]/datastores/+controller"
import { DataSchemasController } from "./@/app/organization-[organizationId]/project-[projectId]/dataschemas/+controller"
import { TemplatesController } from "./@/app/organization-[organizationId]/project-[projectId]/templates/+controller"
import { ConnectionsController } from "./@/app/organization-[organizationId]/project-[projectId]/connections/+controller"
import { WebhooksController } from "./@/app/organization-[organizationId]/project-[projectId]/webhooks/+controller"
import { KeysController } from "./@/app/organization-[organizationId]/project-[projectId]/keys/+controller"
import { FormController } from "./@/app/organization-[organizationId]/project-[projectId]/form-[formId]/+controller"


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
                    UIRoute(':organizationId', OrganizationController).children(
                        UIRoute('projects', ProjectsController),
                        UIRoute(':projectId', ProjectController).children(
                            UIRoute('[devices]',DevicesController),
                            UIRoute('[forms]',FormsController),
                            UIRoute('[forms]/:formId',FormController ),
                            UIRoute('[scenarios]',ScenariosController ),
                            UIRoute('[scenarios]/:scenarioId',ScenarioController ),
                            UIRoute('[datastores]',DataStoresController ),
                            UIRoute('[dataschemas]',DataSchemasController ),
                            UIRoute('[templates]',TemplatesController ),
                            UIRoute('[connections]',ConnectionsController ),
                            UIRoute('[webhooks]',WebhooksController ),
                            UIRoute('[keys]',KeysController )
                           
                        )
                    ),
                    UIRoute('', HomeController),
                    UIRoute('*', HomeController),
                ),
                UIRoute('/login', LoginController),
                UIRoute('/signup', SignupController),
                UIRoute('/logout', LogoutController)
            )
        )
    }
   

}