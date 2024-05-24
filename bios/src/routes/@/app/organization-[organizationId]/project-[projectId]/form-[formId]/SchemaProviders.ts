import { VStack, cLeading, HStack, Text, Heading } from "@tuval/forms";
import { FieldContext } from "../../../../../../context/Field/context";
import { DropContainer } from "./view/DropContainer";

export const SchemaProvider = {
    "email": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                
                VStack({ alignment: cLeading, spacing: 10 })(
                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                    HStack().height(36).border('solid 1px #E7EAEC').cornerRadius(6)
                )
                .paddingTop('15px')
                .paddingBottom('15px')
                
            )
        )
            .index(index)
            .schema(schema)
    ),
    "password": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                    HStack().height(36).border('solid 1px #E7EAEC').cornerRadius(6)
                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    ),
    "url": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                    HStack().height(36).border('solid 1px #E7EAEC').cornerRadius(6)
                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    ),
    "input": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                    HStack().height(36).border('solid 1px #E7EAEC').cornerRadius(6)
                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    ),
    "textarea": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),
                    HStack().height(136).border('solid 1px #E7EAEC').cornerRadius(6)
                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    ),

    "header": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Text(schema.label).fontSize(22).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    ),
    "h1": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Heading(schema.label).fontSize(28).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    ),
    "h2": (schema, index) => (
        FieldContext(() =>
            DropContainer(
                VStack({ alignment: cLeading, spacing: 10 })(
                    Heading(schema.label).fontSize(22).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                )
                .paddingTop('15px')
                .paddingBottom('15px')
            )
        )
            .index(index)
            .schema(schema)
    )
}