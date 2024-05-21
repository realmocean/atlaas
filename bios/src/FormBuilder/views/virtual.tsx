//import { Validator } from "jsonschema";


import { Fragment, ReactView, useFormController } from "@tuval/forms";
import { FormBuilder } from "../FormBuilder";
import React from "react";
import { FormField } from "@realmocean/atlaskit";

//const v = new Validator();

var schema = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "value": "text"
        },
    }
}

export interface TextFieldInfo {
    type: 'text';
    label: string;
}


export const VirtualView = (fieldInfo: any) => {
    let { name, value } = fieldInfo;
    value = FormBuilder.compileFormula(value);



    /*  const formController = useFormController();
     let currentValue = formController.GetValue(name);
 
     if (currentValue !== value){
         formController.SetValue(name, value);
     }
  */
    return (
        FormField(() =>
            Fragment()
        )
            .name(name)
            .defaultValue(value)

    )



}