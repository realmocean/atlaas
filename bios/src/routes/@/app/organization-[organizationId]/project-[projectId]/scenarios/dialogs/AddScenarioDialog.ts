

export const AddScenarioDialog = {
    "title": "Create scenario",
    "properties": {
      "name": {
        "title": "Name",
        "description": "TName of your form",
        "maxLength": 255,
        "x-jsf-presentation": {
          "inputType": "text",
          "maskSecret": 2
        },
        "type": "string"
      },
      "description": {
        "title": "Description",
        "description": "",
        "maxLength": 1255,
        "x-jsf-presentation": {
          "inputType": "multiline"
        },
        "type": "string"
      }
    },
    "required": [
      "name"
    ]
  }