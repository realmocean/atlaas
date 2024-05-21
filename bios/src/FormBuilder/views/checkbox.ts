import { CheckboxField } from "@realmocean/atlaskit";
import { is } from "@tuval/core";
import { UIRadioGroup, VStack, cTopLeading, useFormController, Text, CheckBox, useEffect } from "@tuval/forms";


export const _CheckBoxFormView = (textData: any) => {
    const formController = useFormController();

    let { name, value } = textData;

    useEffect(() => {

        formController.SetValue(name, !!value);


    }, [])

    return (
        VStack({ alignment: cTopLeading, spacing: 4 })(
            Text(textData.label).kerning('0.00938em').lineHeight('24px')
                .foregroundColor('#333D47').fontSize(14),
            CheckBox()
                .checked(formController.GetValue(name))
                .onChange((e) => formController.SetValue(name, e))

            // .formField(textData.name, [])
        ).height().marginBottom('16px')
    )
}

export const CheckBoxFormView = (fieldInfo: any) => {
    let { label, name, value } = fieldInfo;

    /*  const formController = useFormController();
     let currentValue = formController.GetValue(name);
 
     if (currentValue !== value){
         formController.SetValue(name, value);
     }
  */
    return (
        CheckboxField()
            .name(name)
            .value(value)
            .label(label)
    )



}