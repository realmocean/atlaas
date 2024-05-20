import { SideNavigation } from "@realmocean/atlaskit"
import { VStack } from "@tuval/forms"


export const LeftMenu = () => {

    return (
        VStack(
            SideNavigation()
        )
        //.background('linear-gradient(rgb(181, 93, 205) 0px, rgb(114, 78, 191) 100%)')
        .allWidth(275)
    )
}