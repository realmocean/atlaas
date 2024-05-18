import { useGetRealm, useListRealms } from "@realmocean/sdk";
import { Fragment, ReactView, Text, UIController, UINavigate, UIView, VStack } from "@tuval/forms";
import App from './view/Page';
import { AccountContext } from '../../../context/account/AccountContext';
import React from "react";

export class HomeController extends UIController {
    public override LoadView(): UIView {
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            AccountContext(() =>
                ReactView(
                    <App></App>
                )
            )

        )
    }
}