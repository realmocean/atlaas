

export const AddProjectDialogSchema = {
    "title": "Create project",
    "properties": {
      "name": {
        "title": "Name",
        "description": "Name of your project.",
        "maxLength": 255,
        "x-jsf-presentation": {
          "inputType": "text",
          "maskSecret": 2
        },
        "type": "string"
      }
    },
    "required": [
      "name"
    ]
  }