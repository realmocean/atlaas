import { useGetRealm, useListAccountMemberships, useListRealms } from "@realmocean/sdk";
import { Fragment, ReactView, Text, UIController, UINavigate, UIView, VStack, urlFriendly } from "@tuval/forms";
import App from './view/Page';
import { AccountContext } from '../../../context/account/AccountContext';
import React from "react";


import { Atlaas } from "@realmocean/atlaas";

export class HomeController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            AccountContext(() => {
                const { memberships, isLoading } = useListAccountMemberships('console');
                return ( 
                    !isLoading && memberships.length > 0 ? 
                    UINavigate(`/app/${urlFriendly(memberships[0].teamName)}-${memberships[0].teamId}`)
                    :
                    UINavigate('/organizatiion-not-found')

                )
            })

        )
    }
}