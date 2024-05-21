
import { Atlaas } from "@realmocean/atlaas";
import { HStack, UIController, UIView } from "@tuval/forms";

export class ScenarioController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            HStack(
                Atlaas()
            )

        )
    }
}