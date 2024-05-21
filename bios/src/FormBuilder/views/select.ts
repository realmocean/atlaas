
import { useFormController, UIViewBuilder, useProtocol, DirectoryProtocol, VStack, cTopLeading, Dropdown, HStack, cLeading, Text, useState } from "@tuval/forms";
import { label } from "../components/label";
import { is } from "@tuval/core";
import { FormField, Select } from "@realmocean/atlaskit";

export const _SelectFormView = (textData: any) => {
    const formController = useFormController();
    let { name, query, options, defaultValue, fieldId, protocol, resource, filter, sort, text, key } = textData;

    if (defaultValue == null) {
        defaultValue = formController.GetValue(fieldId);
    }

    const formState = formController.GetFieldState(name);

    if (!formState.isTouched && defaultValue != null) {
        formController.SetValue(name, defaultValue, true);
    }

    if (query != null) {
        const { body, resource, text, key } = query;

        return (
            UIViewBuilder(() => {
                const { query } = useProtocol(DirectoryProtocol);

                const { data } = query(body);

                return (
                    VStack({ alignment: cTopLeading })(
                        Dropdown((option) =>
                            HStack({ alignment: cLeading })(
                                Text(option[text])
                            )

                        )((option) =>
                            HStack({ alignment: cLeading })(
                                Text(option[text])
                            )
                                .paddingLeft('10px')
                        )
                            .floatlabel(false)
                            .dataSource(data[resource]/* textData?.options[0]?.items.map(item => ({ text: item, value: item })) */)
                            .fields({ text: text, value: key })
                            //.placeHolder(params.placeholder)
                            .width('100%')
                            .height(38)
                            .formField(textData.name, [])
                            .border('1px solid #D6E4ED')
                            .shadow({ focus: 'none' })
                        // .formField(textData.name, [])
                    ).height().marginBottom('16px')
                )
            })
        )
    } else if (protocol != null && resource != null) {
        return (
            UIViewBuilder(() => {
                const { getList } = useProtocol(protocol);

                const { data } = getList(resource, { filter, sort });

                return (
                    VStack({ alignment: cTopLeading })(
                        Dropdown((option) =>
                            HStack({ alignment: cLeading })(
                                Text(option[text])
                            )

                        )((option) =>
                            HStack({ alignment: cLeading })(
                                Text(option[text])
                            )
                                .paddingLeft('10px')
                        )
                            .floatlabel(false)
                            .dataSource(data/* textData?.options[0]?.items.map(item => ({ text: item, value: item })) */)
                            .fields({ text: text, value: key })
                            //.placeHolder(params.placeholder)
                            .width('100%')
                            .height(38)
                            .formField(textData.name, [])
                            .border('1px solid #D6E4ED')
                            .shadow({ focus: 'none' })
                        // .formField(textData.name, [])
                    ).height().marginBottom('16px')
                )
            })
        )
    } else {
        return (
            VStack({ alignment: cTopLeading })(

                Dropdown((option) =>
                    HStack({ alignment: cLeading })(
                        Text(option.text)
                    )

                )((option) =>
                    HStack({ alignment: cLeading })(
                        Text(option.text)
                    )
                        .paddingLeft('10px')
                )
                    .floatlabel(false)
                    .dataSource(options?.[0]?.items.map(item => (is.string(item) ? { text: item, value: item } : { text: item.label, value: item.value })))
                    .fields({ text: 'text', value: 'value' })
                    //.placeHolder(params.placeholder)
                    .width('100%')
                    .height(38)
                    .formField(textData.name, [])
                    .border('1px solid #D6E4ED')
                    .shadow({ focus: 'none' })
                // .formField(textData.name, [])
            ).height().marginBottom('16px')
        )
    }


}







export const SelectFormView = (fieldInfo: any) => {
    let { label, name, options } = fieldInfo;

    const [fieldValue, setFieldValue] = useState('');
    const [fieldHasError, setFieldHasError] = useState(false);
    const [selectHasError, setSelectHasError] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState('');
    const [messageId, setMessageId] = useState('');


    return (
        FormField((props, error, valid, meta) => {
            return (
                Select('sdfds')
                    .props(props)
            )
        })
            //  .isRequired(true)
            .label(label)
            .name(name)
        /* .validate((value) => {
            return value && value.length < 8 ? 'TOO_SHORT' : undefined
        }) */
    )
}
