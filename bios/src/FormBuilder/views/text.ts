//import { Validator } from "jsonschema";
import { HStack, TextField, VStack, cLeading, cTopLeading, useFormController, Text, Fragment, useState, useEffect } from "@tuval/forms";
import { FormBuilder, compileFormula } from "../FormBuilder";
import { FormField, TextField as A, ValidMessage, ErrorMessage, TextArea } from "@realmocean/atlaskit";


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


export const _TextFormView = (fieldInfo: any) => {
    // v.validate(fieldInfo, schema).valid;

    const formController = useFormController();
    let { visibleWhen, required, multiline, description, formula, defaultValue, defaultDisabled,
        startAdornment, endAdornment, fieldId, name } = fieldInfo;

    let canRender = FormBuilder.canRender(fieldInfo, formController);

    defaultValue = FormBuilder.compileFormula(defaultValue);

    if (defaultValue == null) {
        defaultValue = formController.GetValue(fieldId);
    }


    if (canRender) {
        return (
            VStack({ alignment: cTopLeading })(
                //Text(FormBuilder.canRender(visibleWhen, formController).toString()),
                //label(fieldInfo),
                HStack({ alignment: cLeading, spacing: 5 })(
                    startAdornment && Text(startAdornment).foregroundColor('#677A89').fontSize(17).fontFamily('source sans pro').lineHeight(22),
                    formula != null ?
                        TextField()
                            .disabled(defaultDisabled)
                            .defaultValue(defaultValue)
                            .value(compileFormula(formController.GetFormData(), formula))
                            .multiline(multiline)
                            .height(multiline ? '' : '38px')
                            .foregroundColor({ default: 'rgb(51,61,71)', disabled: '#8696A2' })
                            .background({ disabled: '#F0F5F9' })
                            .cornerRadius(6)
                            .border({ default: '1px solid rgb(214, 217, 222)', hover: '1px solid #2776C7', focus: '1px solid #2776C7' })
                            .shadow({ focus: 'none' })
                            .fontSize(15) :
                        TextField()
                            .disabled(defaultDisabled)
                            .defaultValue(defaultValue)
                            .multiline(multiline)
                            .height(multiline ? '' : '38px')
                            .foregroundColor('rgb(51,61,71)')
                            .background({ disabled: '#F0F5F9' })
                            .cornerRadius(6)
                            .onBlur((e) => {
                                formController.SetValue(name, e.target.value);

                            })
                            //.formField(fieldInfo.name, [])
                            .border({ default: '1px solid rgb(214, 217, 222)', hover: '1px solid #2776C7', focus: '1px solid #2776C7' })
                            .shadow({ focus: 'none' })
                            .fontSize(15),
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


export const TextFormView = (fieldInfo: any) => {
    let { label, name, multiline, autofocus, isDisabled = false, defaultValue,
        helpMessage } = fieldInfo;

    const [fieldValue, setFieldValue] = useState('');
    const [fieldHasError, setFieldHasError] = useState(false);
    const [selectHasError, setSelectHasError] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState('');
    const [messageId, setMessageId] = useState('');

    const errorMessages = {
        shortUsername: 'Please enter a username longer than 4 characters',
        validUsername: 'Nice one, this username is available',
        usernameInUse: 'This username is already taken, try entering another one',
        selectError: 'Please select a color',
    };

    const { shortUsername, validUsername, usernameInUse, selectError } =
        errorMessages;


    const handleBlurEvent = () => {

        if (fieldValue.length >= 5) {
            setFieldHasError(false);
            setErrorMessageText('IS_VALID');
        } else {
            setFieldHasError(true);
            if (fieldValue.length <= 5) {
                setErrorMessageText('TOO_SHORT');
            }
        }
    }

    useEffect(() => {
        switch (errorMessageText) {
            case 'IS_VALID':
                setMessageId('-valid');
                break;
            case 'TOO_SHORT':
            case 'IN_USE':
                setMessageId('-error');
                break;
            default:
                setMessageId('-error');
        }
    }, [errorMessageText]);

    return (
        HStack({ alignment: cLeading })
            (
                FormField((props, error, valid, meta) => {
                    return (
                        Fragment
                            (
                                multiline ?
                                    TextArea().props(props).onBlur(handleBlurEvent).autoFocus(autofocus) :
                                    A()
                                        .isDisabled(isDisabled)
                                        .value(defaultValue)
                                        .helpMessage(helpMessage)
                                        .props(props)
                                        .autoFocus(autofocus)
                                        .onBlur(handleBlurEvent)
                                ,
                                error ?
                                    ErrorMessage(' This username is already in use, try another one')
                                    : Fragment()


                                /* !fieldHasError && errorMessageText === 'IS_VALID' &&
                                ValidMessage(validUsername)
                                ,
                                fieldHasError && errorMessageText === 'TOO_SHORT' &&
                                ErrorMessage(shortUsername)
                                ,
                                fieldHasError && errorMessageText === 'IN_USE' &&
                                ErrorMessage(usernameInUse) */
                            )
                    )
                })
                    .isRequired(true)
                    .label(label)
                    .defaultValue(defaultValue)
                    .name(name)
                    .validate((value) => {
                        return value && value.length < 8 ? 'TOO_SHORT' : undefined
                    })
            ).height().display('block')
    )
}
