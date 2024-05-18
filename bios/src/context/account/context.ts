import { useGetOrganization } from "@realmocean/sdk";
import React from "react";
import { createContext } from "react";


export const AccountContextProvider = createContext<any>({});

export const useAccount = (): { account: any } => {


    const { account = null } = React.useContext(AccountContextProvider);

    return { account: account  };
}

