import {
    AppSwitcher,
    AtlassianNavigation,
    Notifications,
    PrimaryDropdownButton,
    ProductHome,
    Profile,
    Search,
    Settings
} from '@atlaskit/atlassian-navigation';
import Avatar from '@atlaskit/avatar';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';
import { NotificationIndicator } from '@atlaskit/notification-indicator';
import { SchemaBroker, useCreateRealm, useListRealms } from "@realmocean/sdk";
import { UIImage, nanoid } from "@tuval/forms";
import React, { Fragment, useState } from "react";
import { useOrganization } from "../../../../../context/organization/context";
import { AddProjectDialog } from "../../../../../dialogs/AddProjectDialog";
import { useOrganizationNavigate } from "../../../../../hooks/useOrganizationNavigate";
import { Schema } from '../../../../../schema/schema';
import { AddProjectDialogSchema } from '../projects/dialogs/AddProjectDialogSchema';
import { JSONForm } from '../../../../../JSONForms/JSONForm';

const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..." />;

const DefaultSettings = () => <Settings tooltip="Product settings" />;


const DefaultSearch = () => {
    const [value, setValue] = useState('');
    const onChange = (event: any) => {
        console.log('search clicked with value: ', event.target.value);
        setValue(event.target.value);
    };

    return (
        <Search
            onClick={onChange}
            placeholder="Search..."
            tooltip="Search"
            label="Search"
            value={value}
        />
    );
};

const NotificationsBadge = () => (
    <NotificationIndicator
        onCountUpdated={console.log}
        notificationLogProvider={Promise.resolve({}) as any}
    />
);

const DefaultProfile = () => (
    <Profile
        icon={
            <Avatar
                size="small"
                //src={avatarUrl}
                name="Atlassian account: Emil Rottmayer"
            />
        }
        //  onClick={onClick}
        tooltip="Your profile and settings"
    />
);


const AppLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentColor" fill-rule="evenodd" d="M4 5.01C4 4.451 4.443 4 5.01 4h1.98C7.549 4 8 4.443 8 5.01v1.98C8 7.549 7.557 8 6.99 8H5.01C4.451 8 4 7.557 4 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 13.549 7.557 14 6.99 14H5.01C4.451 14 4 13.557 4 12.99v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C14 7.549 13.557 8 12.99 8h-1.98C10.451 8 10 7.557 10 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C20 7.549 19.557 8 18.99 8h-1.98C16.451 8 16 7.557 16 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm-12 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 19.549 7.557 20 6.99 20H5.01C4.451 20 4 19.557 4 18.99v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98z"></path></svg>
)

const Logo = ({ appearance, label, size, iconColor, iconGradientStart, iconGradientStop, textColor, testId, }) => (
    UIImage('/images/logo.png').allHeight(30).render()
)
/* const AtlassianProductHome = () => (
    HStack({ alignment: cLeading, spacing: 5 })(
        UIImage('/images/logo.png').allWidth(70).allHeight(35),
        Text('TIM VISION').fontSize(13).fontWeight('300').foregroundColor('#51607A')
    )
        .width(200)
        .render()
); */



export const Navigation = () => {
    const { organization } = useOrganization();
    const { realms, isLoading } = useListRealms();
    const { navigate } = useOrganizationNavigate();
    const [open, setOpen] = useState(false)

    const { createRealm } = useCreateRealm();

    const AtlassianProductHome = () => (

        <ProductHome icon={Logo as any} href='/' siteTitle={organization.name} logo={Logo as any} />
        /*   HStack({spacing: 7})(
              Icon(Logo),
              Text(organization.name).fontSize(14).fontWeight('500'),
              VDivider().width(1).height('50%').background('#DCDFE4').marginLeft(2)
          )
          .padding(cHorizontal, 5)
          .width()
          .render() */
    );

    return (
        isLoading ? <Fragment /> :
            <AtlassianNavigation
                label="site"
                primaryItems={[
                    <DropdownMenu isOpen={open} onOpenChange={(e) => setOpen(e.isOpen)} autoFocus={false} trigger={({ triggerRef, ...props }) => <PrimaryDropdownButton {...props} ref={triggerRef}>Projects</PrimaryDropdownButton>}
                        shouldRenderToParent>
                        <DropdownItemGroup>
                            {

                                <DropdownItem
                                    component={({ children, ...props }, ref) => <MenuGroup>
                                        <Section title="Recent">
                                            {
                                                realms.map(realm =>
                                                    <ButtonItem
                                                        description="Next-gen software project"
                                                        onClick={() => {
                                                            navigate(`${realm.name}-${realm.$id}/[devices]`);
                                                            setOpen(false);
                                                        }}

                                                    >
                                                        {realm.name}
                                                    </ButtonItem>
                                                )
                                            }

                                        </Section>
                                    </MenuGroup>}
                                >Edit</DropdownItem>


                            }


                        </DropdownItemGroup>

                        <DropdownItemGroup hasSeparator>
                            <DropdownItem onClick={() => navigate('projects')}>View All Projects</DropdownItem>
                            <DropdownItem onClick={() => {
                                JSONForm.Show(AddProjectDialogSchema).then(({ formValues }) => {

                                    const data = formValues;


                                    createRealm({ realmId: nanoid(), name: data.name, organizationId: organization.$id }, async (realm) => {

                                        SchemaBroker.Default
                                            .setRealm(realm.$id);
                                        await SchemaBroker.Default.create(null, Schema);

                                    })


                                    // alert(JSON.stringify(formValues))
                                })
                            }}>Create Project</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>,
                    <DropdownMenu autoFocus={false} trigger={({ triggerRef, ...props }) => <PrimaryDropdownButton {...props} ref={triggerRef}>Organization</PrimaryDropdownButton>}
                        shouldRenderToParent>
                        <DropdownItemGroup>
                            <DropdownItem onClick={() => navigate('projects')}>My Organization</DropdownItem>
                            <DropdownItem /* onClick={() => DynoDialog.Show(AddProjectDialog(organization.$id))} */>Teams</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>,
                    <DropdownMenu autoFocus={false} trigger={({ triggerRef, ...props }) => <PrimaryDropdownButton {...props} ref={triggerRef}>Help</PrimaryDropdownButton>}
                        shouldRenderToParent>
                        <DropdownItemGroup>
                            <DropdownItem onClick={() => navigate('projects')}>My Organization</DropdownItem>
                            <DropdownItem /* onClick={() => DynoDialog.Show(AddProjectDialog(organization.$id))} */>Teams</DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>,
                    /*   <DropdownMenu trigger="Page actions" shouldRenderToParent>
                          <DropdownItemGroup>
                              <DropdownItem>Edit</DropdownItem>
                              <DropdownItem>Share</DropdownItem>
                              <DropdownItem>Move</DropdownItem>
                              <DropdownItem>Clone</DropdownItem>
                              <DropdownItem>Delete</DropdownItem>
                              <DropdownItem>Report</DropdownItem>
                          </DropdownItemGroup>
                      </DropdownMenu> */
                ]}
                renderProfile={DefaultProfile}
                renderNotifications={() => (
                    <Notifications badge={NotificationsBadge} tooltip="Notifications" />
                )}
                renderSearch={DefaultSearch}
                renderSettings={DefaultSettings}
                renderAppSwitcher={DefaultAppSwitcher}
                renderProductHome={AtlassianProductHome}
            />
    )
}


