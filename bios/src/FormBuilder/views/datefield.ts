import { DatePicker, FormBuilder, HStack, VStack, cLeading, cTopLeading, useEffect, useFormController, Text } from "@tuval/forms";


interface DatePickerProperties {
    title?: string;
    renderer?: any/* FunctionComponent<any> */;
    name?: string;
    description?: string;
    required?: boolean;
    fieldId?: string;
    visibleWhen?: any;
    defaultValue?: Date;
    startAdornment?: string;
    endAdornment?: string;
    defaultDisabled?: boolean;
    formula?: string;
}

export const DatePickerView = (fieldInfo: DatePickerProperties) => {
    // v.validate(fieldInfo, schema).valid;

    const formController = useFormController();
    let { visibleWhen, required, description, name, defaultValue,
        startAdornment, endAdornment, defaultDisabled, formula, renderer } = fieldInfo;

    let canRender = FormBuilder.canRender(fieldInfo, formController);


    useEffect(() => {
        if (defaultValue != null) {
            formController.SetValue(name, defaultValue);
        }
    }, [])


    if (canRender) {
        return (
            VStack({ alignment: cTopLeading })(
                //Text(FormBuilder.canRender(visibleWhen, formController).toString()),
                //label(fieldInfo),
                HStack({ alignment: cLeading, spacing: 5 })(
                    startAdornment && Text(startAdornment).foregroundColor('#677A89').fontSize(17).fontFamily('source sans pro').lineHeight(22),
                        DatePicker()
                            .disabled(defaultDisabled)
                            .value(formController.GetValue(name))
                            .foregroundColor('rgb(51,61,71)')
                            .background({ disabled: '#F0F5F9' })
                            .cornerRadius(2)
                            .border({ default: '1px solid #D6E4ED', hover: '1px solid #2776C7', focus: '1px solid #2776C7' })
                            .shadow({ focus: 'none' })
                            .fontSize(15)
                            .renderer(renderer)
                            .onChange((e) => {
                                formController.SetValue(name, e);
                            }),
                    endAdornment && endAdornment && Text(endAdornment).foregroundColor('#677A89').fontSize(17).fontFamily('source sans pro').lineHeight(22),

                ).height(),
                /* description &&
                Text(description).multilineTextAlignment(TextAlignment.leading)

                    .foregroundColor('#95ABBC')
                    .fontSize('12px')
                    .fontFamily('"Roboto", "Helvetica", "Arial", sans-serif')
                    .kerning('0.03333em')
                    .lineHeight('20px')
                    .marginTop('4px') */
            ).height().marginBottom('16px')
        )
    }
}