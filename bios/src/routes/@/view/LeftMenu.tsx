import { ButtonItem, Icons, NavigationContext, NavigationHeader, Section, SideNavigation } from "@realmocean/atlaskit"
import { VStack, Text, Icon, ForEach, UIRouteLink } from "@tuval/forms"

function getSelectedId() {
    const regex = /\[(.*?)\]/;
    const match = window.location.href.match(regex);

    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

const Menu = [
    {
        id: 'devices',
        title: 'Devices',
        icon: Icon('\\d454'),

    },
    {
        id: 'forms',
        title: 'Forms',
        icon: Icon('\\d28f'),

    },
    {
        id: 'scenarios',
        title: 'Scenarios',
        icon: Icon('\\d373'),

    },
    {
        id: 'datastores',
        title: 'Data Stores',
        icon: Icon('\\d278'),
    },
    {
        id: 'dataschemas',
        title: 'Data Schemas',
        icon: Icon('\\d277'),
    },
    {
        id: 'templates',
        title: 'Templates',
        icon: Icon('\\d280'),
    },
    {
        id: 'connections',
        title: 'Connections',
        icon: Icon('\\d21f'),
    },
    {
        id: 'webhooks',
        title: 'Webhooks',
        icon: Icon('\\d300'),
    },
    {
        id: 'keys',
        title: 'Keys',
        icon: Icon('\\d2A4'),
    }
]
export const LeftMenu = () => {

    return (
        VStack(
            SideNavigation(
                NavigationHeader(
                    VStack(
                        Text('Celmino')
                            .foregroundColor('rgb(23, 43, 77)')
                            .fontWeight('600')
                            .fontFamily('-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif')
                    ).height()
                ),
                NavigationContext(
                    Section(
                        ...ForEach(Menu)(menuItem => (
                            ButtonItem(
                                Text(menuItem.title)
                            )
                            .iconBefore(menuItem.icon.fontSize(20))
                            .isSelected(getSelectedId() === menuItem.id)
                            .onClick(()=> {
                                
                            })
                        ))
                       
                      /*   ButtonItem(
                                Text('Forms')
                            ).iconBefore(Icon('\\d28f').fontSize(20)),
                        ButtonItem(
                            Text('Scenarios')
                        ).iconBefore(Icon('\\d373').fontSize(20)),
                        ButtonItem(
                            Text('Data Stores')
                        ).iconBefore(Icon('\\d278').fontSize(20)),
                        ButtonItem(
                            Text('Data Schemas')
                        ).iconBefore(Icon('\\d277').fontSize(20)),
                        ButtonItem(
                            Text('Templates')
                        ).iconBefore(Icon('\\d280').fontSize(20)),
                        ButtonItem(
                            Text('Connections')
                        ).iconBefore(Icon('\\d21f').fontSize(20)),
                        ButtonItem(
                            Text('Webhooks')
                        ).iconBefore(Icon('\\d300').fontSize(20)),
                        ButtonItem(
                            Text('Keys')
                        ).iconBefore(Icon('\\d2A4').fontSize(20)), */

                    )
                        .title('my team')
                )

            )
        )
            //.background('linear-gradient(rgb(181, 93, 205) 0px, rgb(114, 78, 191) 100%)')
            .allWidth(275)
    )
}