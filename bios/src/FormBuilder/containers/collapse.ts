import { is } from "@tuval/core";
import { renderContainers } from "../renderContainers";
import { VStack, cTopLeading, HStack, cLeading, Text } from "@tuval/forms";

export const CollapseFormView = (columnInfo: any, fieldMap) => {

    const views = [];
    const { containers } = columnInfo;
    for (let i = 0; i < containers.length; i++) {
        const { label, fields } = containers[i];
        const subContainers = renderContainers(containers[i], fieldMap);
        const subViews = [];
        if (is.array(subContainers)) {
            subViews.push(...subContainers);
        }
        views.push(
            VStack({ alignment: cTopLeading})(
                HStack({ alignment: cLeading })(
                    Text(label).fontFamily('source sans pro').fontSize(17).lineHeight(40).foregroundColor('#333D47')
                )
                    .height()
                    .padding()
                    .allHeight(40)
                    .borderBottom('solid 1px #D6E4ED'),
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    ...subViews
                    /* ...ForEach(fields)((field) =>
                        FormBuilder.getView(fieldMap[field as any])
                    ) */
                ).padding()
                //.display('block')
            ).height().background('white')
                .border('solid 1px #D6E4ED').cornerRadius(5)
        )
    }
    return (
        VStack({ alignment: cTopLeading, spacing: 20 })(
            ...views
        )
    )
}
