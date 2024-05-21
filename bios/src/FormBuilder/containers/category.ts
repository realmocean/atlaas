import { HStack, cTopLeading, cLeading, VStack, ForEach, FormBuilder, Fragment, Text } from "@tuval/forms";
import { label } from "../components/label";

export const CategoryFormLayout = (columnInfo: any, fieldMap: any) => {

    const cats = {};
    const views = [];
    const { containers } = columnInfo;

    for (let key in fieldMap) {
        const field = fieldMap[key];

        if (fieldMap[key].type == 'virtual') {
            continue;
        }

        if (field.category != null) {
            const list = cats[field.category] || [];
            list.push(field);
            cats[field.category] = list;
        } else {
            const list = cats['Other'] || [];
            list.push(field);
            cats['Other'] = list;
        }
    }


    for (let cat in cats) {
        const list = cats[cat];

        views.push(
            HStack({ alignment: cTopLeading, spacing: 20 })(
                HStack({ alignment: cLeading })(
                    Text(cat).fontFamily('-apple-system,BlinkMacSystemFont,Segoe UI,roboto,Helvetica Neue,helvetica,arial,sans-serif')
                        .fontWeight('500').fontSize(14).foregroundColor('rgb(42, 46, 52)')
                ).height().width(100),
                VStack(
                    ...ForEach(list)((field: any) =>
                        VStack({ alignment: cLeading })(
                            label(field),
                            field.category === cat ? FormBuilder.getView(field) : Fragment()
                        ).height()
                    )
                )
            )
                .borderBottom('1px solid #E8EAED')
                .padding(24)
        );


    }

    return (
        VStack({ alignment: cTopLeading, spacing: 20 })(
            ...views
        )
    )
}