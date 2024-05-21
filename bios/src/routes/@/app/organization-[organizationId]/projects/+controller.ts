import { useDeleteSessions } from "@realmocean/sdk";
import { HStack, Text, UIController, UIRouteOutlet, UIView, VStack, cTopLeading, useNavigate } from "@tuval/forms";

import React from "react";



export class ProjectsController extends UIController {
    public BindRouterParams() {

    }

    public LoadView(): UIView {


        return (
           
            Text('Projects')
        )
    }
}