
import { useGetOrganization } from "@realmocean/sdk";
import { UIView, ViewProperty } from "@tuval/forms";
import React from "react";
import AccountContextRenderer from "./AccountContextRenderer";




export class AccountContextClass extends UIView {

    /** @internal */
    @ViewProperty() vp_ChildFunc: () => UIView;

    public childFunc(value: () => UIView) {
        this.vp_ChildFunc = value;
        return this;
    }

    public render() {
        return (<AccountContextRenderer control={this} ></AccountContextRenderer>)
    }
}