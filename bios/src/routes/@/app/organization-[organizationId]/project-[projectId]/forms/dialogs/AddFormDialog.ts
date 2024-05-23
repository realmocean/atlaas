

export const AddFormDialogSchema = {
    "title": "Form 1",
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
      }
    },
    "required": [
      "name"
    ]
  }