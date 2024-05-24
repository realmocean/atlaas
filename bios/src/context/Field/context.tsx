
import { useGetMe, useGetOrganization, useGetRealm } from "@realmocean/sdk";
import { is } from "@tuval/core";
import { UIView, ViewProperty, useNavigate, useParams } from "@tuval/forms";
import React, { Fragment } from "react";
import { createContext } from "react";
import { Models } from "../../Models";


export const ContextField = createContext<any>({});

export const useField = (): { schema: object, index: number } => {

    const { schema, index } = React.useContext(ContextField);
   
    return { schema, index };
}


export class FieldContextClass extends UIView {

    /** @internal */
    @ViewProperty() vp_ChildFunc: () => UIView;

    public childFunc(value: () => UIView) {
        this.vp_ChildFunc = value;
        return this;
    }

    /** @internal */
    @ViewProperty() vp_Schema: object;

    public schema(value: object) {
        this.vp_Schema = value;
        return this;
    }

    /** @internal */
    @ViewProperty() vp_Index: number;

    public index(value: number) {
        this.vp_Index = value;
        return this;
    }

    public render() {
        return (
            is.function(this.vp_ChildFunc) ?
                (
                    <ContextField.Provider value={{ schema: this.vp_Schema, index: this.vp_Index }}>
                        <Proxy control={this}></Proxy>
                    </ContextField.Provider>
                ) : <Fragment />
        )
    }
}


const Proxy = ({ control }) => (
    control.vp_ChildFunc().render()
)



export function FieldContext(childFunc: () => UIView): FieldContextClass {
    return new FieldContextClass().childFunc(childFunc);
}