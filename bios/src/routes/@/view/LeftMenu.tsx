import { VStack, Text, Icon, ForEach, UIRouteLink } from "@tuval/forms"
import { useProjectNavigate } from "../../../hooks/useProjectNavigate";
import React from "react";
import {
    ButtonItem,
    CustomItemComponentProps,
    Header,
    LinkItem,
    NavigationFooter,
    NavigationHeader,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation,
} from '@atlaskit/side-navigation';

import { B400, B50, N10, N30, N500 } from '@atlaskit/theme/colors';
import { borderRadius as borderRadiusFn } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';
import { useProject } from "../../../context/project/context";

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
    const { navigate } = useProjectNavigate();
    const {project} = useProject();

    const borderRadius = borderRadiusFn();

    const styleOverrides: any = ({ isSelected, isDisabled }: any) => {

        return {
            fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: '14px',
            padding: `${token('space.100', '8px')} ${token('space.300', '24px')}`,
            borderRadius,
            backgroundColor: N10,
            color: N500,
            '&:hover': {
                backgroundColor: N30,
                textDecoration: 'none',
                color: N500,
            },
            '&:active': {
                color: B400,
                backgroundColor: B50,
                boxShadow: 'none',
            },
            '&::before': {
                ...(isSelected && {
                    width: '4px',
                    position: 'absolute',
                    top: 'var(--ds-space-150, 12px)',
                    bottom: 'var(--ds-space-150, 12px)',
                    left: '0px',
                    background: '#0C66E4',
                    'border-radius': '0 4px 4px 0',
                    content: '""'
                })
            },

            ['& [data-item-elem-before]']: {
                display: 'flex',
                height: 8 * 1.25,
                width: 8 * 1.25,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: token('space.200', '16px'),
            },
            ...(isSelected && {
                backgroundColor: '#E9F2FF',
                color: B400,
            }),
            ...(isDisabled && {
                backgroundColor: `${N10} !important`,
            }),
        };
    };

    const Container = ({ children, ...props }: CustomItemComponentProps) => {
        return (
          <div
            // eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
            {...props}
          >
            {children}
          </div>
        );
      };

    return (
        VStack(
            <SideNavigation label="My Team">
                <NavigationHeader>
                    {
                       <Header
                       component={Container}
                       description=""
                       
                     >
                       {
                        project.name
                       }
                     </Header>
                    }
                </NavigationHeader>

                <Section>
                    {
                        Menu.map(menuItem=> 
                            <ButtonItem cssFn={styleOverrides} isSelected={getSelectedId() === menuItem.id} 
                            iconBefore={menuItem.icon.fontSize(20).render()}
                            onClick={()=> {
                                navigate(`[${menuItem.id}]`);
                            }}
                            >
                               { menuItem.title}
                            </ButtonItem>

                        )
                        /* ...ForEach(Menu)(menuItem => (
                            ButtonItem(
                                Text(menuItem.title)
                            )
                                .iconBefore(menuItem.icon.fontSize(20))
                                .isSelected(getSelectedId() === menuItem.id)
                                .onClick(() => {
                                    navigate(`[${menuItem.id}]`)
                                })
                        )) */
                    }
                </Section>
            </SideNavigation>
          
        )
        .background('#FAFBFC')
            //.background('linear-gradient(rgb(181, 93, 205) 0px, rgb(114, 78, 191) 100%)')
            .padding()
            .allWidth(275)
    )
}