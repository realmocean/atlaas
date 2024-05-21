import { useGetMe, useGetOrganization, useGetRealm } from "@realmocean/sdk";
import { is } from "@tuval/core";
import { UIView, ViewProperty, useNavigate, useParams } from "@tuval/forms";
import React, { Fragment } from "react";
import { createContext } from "react";
import { Models } from "../../Models";


export const ProjectContextProvider = createContext<any>({});

export const useProject = (): { project: Models.Project } => {

    const { project = null } = React.useContext(ProjectContextProvider);

    return { project: project };
}


export class ProjectContextClass extends UIView {

    /** @internal */
    @ViewProperty() vp_ChildFunc: () => UIView;

    public childFunc(value: () => UIView) {
        this.vp_ChildFunc = value;
        return this;
    }

    public render() {
        return (<ProjectContextRenderer control={this} ></ProjectContextRenderer>)
    }
}


const Proxy = ({ control }) => (
    control.vp_ChildFunc().render()
)



function ProjectContextRenderer({ control }: { control: ProjectContextClass }) {


    const { projectId } = useParams();
    const { realm, isLoading } = useGetRealm({
        realmId: projectId,
        enabled: true
    })



    return (
        is.function(control.vp_ChildFunc) && !isLoading ?
            (
                <ProjectContextProvider.Provider value={{ project: realm }}>
                    <Proxy control={control}></Proxy>
                </ProjectContextProvider.Provider>
            ) : <Fragment />
    )

}

export function ProjectContext(childFunc:()=> UIView): ProjectContextClass {
    return new ProjectContextClass().childFunc(childFunc);
}