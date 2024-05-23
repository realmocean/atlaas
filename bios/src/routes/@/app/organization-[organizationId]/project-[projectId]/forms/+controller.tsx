
import { Atlaas } from "@realmocean/atlaas";
import { HStack, ReactView, Text, UIController, UIView, VStack, cTopLeading } from "@tuval/forms";
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import React from "react";
import Heading from '@atlaskit/heading';
import { useProject } from "../../../../../../context/project/context";
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";
import { useOrganization } from "../../../../../../context/organization/context";
import { useOrganizationNavigate } from "../../../../../../hooks/useOrganizationNavigate";
import { PageHeader } from "../../../../view/PageHeader";
import { WithReact } from "./WithReact";

declare var realmocean$form;

const { createHeadlessForm } = realmocean$form;
const schema = {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "has_pet": {
      "title": "Has Pet",
      "description": "Do you have a pet?",
      "oneOf": [
        {
          "title": "Yes",
          "const": "yes"
        },
        {
          "title": "No",
          "const": "no"
        }
      ],
      "x-jsf-presentation": {
        "inputType": "radio"
      },
      "type": "string"
    },
    "pet_name": {
      "title": "Pet's name",
      "description": "What's your pet's name?",
      "x-jsf-presentation": {
        "inputType": "text"
      },
      "type": "string"
    }
  },
  "required": [
    "has_pet"
  ],
  "x-jsf-order": [
    "has_pet",
    "pet_name"
  ],
  "allOf": [
    {
      "if": {
        "properties": {
          "has_pet": {
            "const": "yes"
          }
        },
        "required": [
          "has_pet"
        ]
      },
      "then": {
        "required": [
          "pet_name"
        ]
      },
      "else": {
        "properties": {
          "pet_name": false
        }
      }
    }
  ]
}

export class FormsController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();

    const { fields, handleValidation } = createHeadlessForm(schema, { strictInputType: false });
    //  const { realms, isLoading } = useListRealms();
    //  console.log('Error -- :' + error?.code)

    console.log(fields)
    return (
      VStack({ alignment: cTopLeading, spacing: 5 })(
        PageHeader()
          .pageTitle('Forms')
          .breadcrumbs([
            {
              title: 'Projects'
            },
            {
              title: project.name
            }
          ]),
     
          ReactView(
            <WithReact></WithReact>
          )
       
      )
        .background('white')
    )
  }
}