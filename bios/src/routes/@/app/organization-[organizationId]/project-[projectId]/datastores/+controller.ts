
import { UIController, UIView, VStack, cTopLeading } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";

export class DataStoresController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            VStack({ alignment: cTopLeading, spacing: 5 })(
                PageHeader()
                    .pageTitle('Data Stores')
            )
                .background('white')
        )
    }
}