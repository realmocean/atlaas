
import { HStack, Text, UIController, UIView, VStack, cTopLeading } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";

export class ConnectionsController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            VStack({ alignment: cTopLeading, spacing: 5 })(
                PageHeader()
                  .pageTitle('Connections')
              )
                .background('white')

            
        )
    }
}