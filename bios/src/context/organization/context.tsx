import { useGetMe, useGetOrganization, useGetRealm, useGetTeam } from "@realmocean/sdk";
import { is } from "@tuval/core";
import { Text, UIView, ViewProperty, useNavigate, useParams } from "@tuval/forms";
import React, { Fragment } from "react";
import { createContext } from "react";
import { Models } from "../../Models";


export const OrganizationContextProvider = createContext<any>({});

export const useOrganization = (): { organization: Models.Organization } => {


    const { organization = null } = React.useContext(OrganizationContextProvider);
    
    return { organization: organization };
}


export class OrganizationContextClass extends UIView {

    /** @internal */
    @ViewProperty() vp_ChildFunc: () => UIView;

    public childFunc(value: () => UIView) {
        this.vp_ChildFunc = value;
        return this;
    }

    public render() {
        return (<OrganizationContextRenderer control={this} ></OrganizationContextRenderer>)
    }
}


const Proxy = ({ control }) => (
    control.vp_ChildFunc().render()
)



function OrganizationContextRenderer({ control }: { control: OrganizationContextClass }) {


    const { organizationId } = useParams();
    const { organization, isLoading } = useGetOrganization({organizationId})



    return (
        is.function(control.vp_ChildFunc) && !isLoading ?
            (
                 <OrganizationContextProvider.Provider value={{ organization: organization }}>
                    <Proxy control={control}></Proxy>
                </OrganizationContextProvider.Provider> 
            ) : <Fragment />
    )

}


export function OrganizationContext(childFunc:()=> UIView): OrganizationContextClass {
    return new OrganizationContextClass().childFunc(childFunc);
}