import { VStack, cTopLeading, ForEach, FormBuilder, HStack, Text } from "@tuval/forms";

export const ColumnFormView = (columnInfo: any, fieldMap) => {

    const views = [];
    const { containers } = columnInfo;
    for (let i = 0; i < containers.length; i++) {
        const { label, fields } = containers[i];
        views.push(
            VStack({ alignment: cTopLeading, spacing: 10 })(
                Text(label).fontSize(17).lineHeight(22).foregroundColor('#333D47'),
                ...ForEach(fields)((field) =>
                    FormBuilder.getView(fieldMap[field as any])
                )
            )
        )
    }
    return (
        HStack({ alignment: cTopLeading, spacing: 20 })(
            ...views
        )
    )
}
