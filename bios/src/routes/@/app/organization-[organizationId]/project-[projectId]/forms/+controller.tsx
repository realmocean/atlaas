
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
import { WithReact } from "../../../../../../JSONForms/WithReact";
import { AddFormDialogSchema } from "./dialogs/AddFormDialog";
import { JSONForm } from "../../../../../../JSONForms/JSONForm";


const jsonSchemaDemo = {
  "additionalProperties": false,
  "properties": {
      "city": {
          "title": "City",
          "description": "Has a default value.",
          "x-jsf-presentation": {
              "inputType": "text"
          },
          "default": "Porto"
      },
      "terms": {
          "title": "Terms",
          "description": "This is checked by default.",
          "x-jsf-presentation": {
              "inputType": "checkbox"
          },
          "const": "acknowledged",
          "default": "acknowledged"
      },
      "game_level": {
          "title": "Game level",
          "description": "Based on the level, the \"power\" and \"premium\" fields change.",
          "oneOf": [
              {
                  "const": "zero",
                  "title": "Zero",
                  "description": "The power is still invisible."
              },
              {
                  "const": "1st",
                  "title": "1st Level",
                  "description": "The power is \"low\" and readonly."
              },
              {
                  "const": "2nd",
                  "title": "2nd Level",
                  "description": "The power is editable."
              },
              {
                  "const": "3rd",
                  "title": "3rd Level",
                  "description": "The premium access is forced to be unchecked by default. This is done with jsf \"customProperties\"."
              }
          ],
          "x-jsf-presentation": {
              "inputType": "radio"
          }
      },
      "power": {
          "title": "Power",
          "description": "This is power level.",
          "x-jsf-presentation": {
              "inputType": "text"
          },
          "type": "string"
      },
      "premium": {
          "title": "Premium access",
          "description": "This gets unchecked when \"3rd Level\" is selected.",
          "x-jsf-presentation": {
              "inputType": "checkbox"
          },
          "const": "premium"
      }
  },
  "required": [
      "game_level",
      "terms"
  ],
  "allOf": [
      {
          "if": {
              "properties": {
                  "game_level": {
                      "enum": [
                          "1st",
                          "2nd",
                          "3rd"
                      ]
                  }
              },
              "required": [
                  "game_level"
              ]
          },
          "then": {
              "required": [
                  "power"
              ]
          },
          "else": {
              "properties": {
                  "power": false
              }
          }
      },
      {
          "if": {
              "properties": {
                  "game_level": {
                      "const": "1st"
                  }
              },
              "required": [
                  "game_level"
              ]
          },
          "then": {
              "properties": {
                  "power": {
                      "const": "Low",
                      "readOnly": true
                  }
              }
          },
          "else": {
              "properties": {
                  "power": {
                      "readOnly": false
                  }
              }
          }
      },
      {
          "if": {
              "properties": {
                  "game_level": {
                      "const": "3rd"
                  }
              },
              "required": [
                  "game_level"
              ]
          },
          "then": {
              "required": [
                  "premium"
              ]
          }
      }
  ],
  "type": "object"
}

export class FormsController extends UIController {
  public override LoadView(): UIView {
    const { project } = useProject();

   // const { fields, handleValidation } = createHeadlessForm(schema, { strictInputType: false });
    //  const { realms, isLoading } = useListRealms();
    //  console.log('Error -- :' + error?.code)

    //console.log(fields)
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
          ])
          .onActionButtonClick(() => {
            JSONForm.Show(AddFormDialogSchema).then(({formValues})=> {
              alert(JSON.stringify(formValues))
            })
          }),
     
     /*      ReactView(
            <WithReact schema={AddFormDialogSchema} handleSubmit={({ formValues, jsonValues }) => alert(formValues)}></WithReact>
          ) */
       
      )
        .background('white')
    )
  }
}