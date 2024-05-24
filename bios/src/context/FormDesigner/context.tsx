
import { useGetMe, useGetOrganization, useGetRealm } from "@realmocean/sdk";
import { is } from "@tuval/core";
import { UIView, ViewProperty, useNavigate, useParams } from "@tuval/forms";
import React, { Fragment } from "react";
import { createContext } from "react";
import { Models } from "../../Models";


export const ContextFormDesigner = createContext<any>({});

export const useFormDesigner = (): {} => {

    const { handleDrop  } = React.useContext(ContextFormDesigner);


    return { handleDrop };
}


export class FormDesignerContextClass extends UIView {

    /** @internal */
    @ViewProperty() vp_ChildFunc: () => UIView;

    public childFunc(value: () => UIView) {
        this.vp_ChildFunc = value;
        return this;
    }

     /** @internal */
     @ViewProperty() vp_HandleDrop: Function;

     public handleDrop(value: Function) {
         this.vp_HandleDrop = value;
         return this;
     }

    public render() {



        return (
            is.function(this.vp_ChildFunc) ?
                (
                    <ContextFormDesigner.Provider value={{handleDrop : this.vp_HandleDrop}}>
                        <Proxy control={this}></Proxy>
                    </ContextFormDesigner.Provider>
                ) : <Fragment />
        )
    }
}


const Proxy = ({ control }) => (
    control.vp_ChildFunc().render()
)



export function FormDesignerContext(childFunc: () => UIView): FormDesignerContextClass {
    return new FormDesignerContextClass().childFunc(childFunc);
}