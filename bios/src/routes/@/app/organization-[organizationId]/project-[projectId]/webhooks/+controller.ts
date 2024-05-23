
import { HStack, Text, UIController, UIView } from "@tuval/forms";

export class WebhooksController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            HStack(
                Text('Webhooks')
            )
        )
    }
}