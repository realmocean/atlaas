
import { Atlaas } from "@realmocean/atlaas";
import { ForEach, HStack, ReactView, Fragment as TFragment, Spinner, Text, UIController, UIView, VStack, cHorizontal, cLeading, cTopLeading, useParams, useState, css, ScrollView, cVertical, cTop } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";
import { useProject } from "../../../../../../context/project/context";
import { useGetForm } from "../../../../../../hooks/useGetForm";
import { WithReact } from "../../../../../../JSONForms/WithReact";
import React, { Fragment, useCallback } from "react";
import { AddFormDialogSchema } from "../forms/dialogs/AddFormDialog";
import { JsonEditor } from 'json-edit-react'
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";
import { DropContainer } from "./view/DropContainer";
import { FieldContext } from "../../../../../../context/Field/context";
import { FormDesignerContext } from "../../../../../../context/FormDesigner/context";

const topBorder = css`
& {
   border-top: solid 2px blue;
}

`
const bottomBorder = css`
& {
   border-bottom: solid 2px blue;
}
`

const className = css`
& {
    width:100% !important;
    min-height: 55px !important;
    height:55px !important;
    transition: all .1s ease;
    text-align: center;
    border:dashed 2px gray;
}

`

const dragClassName = css`
& {
    background: yellow;
}

`
export class FormController extends UIController {
    public override LoadView(): UIView {
        const { project } = useProject();
        const { formId } = useParams();

        const { navigate } = useProjectNavigate();

        const { form, isLoading } = useGetForm(formId);
        const [formData, setFormData] = useState(AddFormDialogSchema);
        const [formDesignData, setFormDesignData] = useState([]);

        const handleDrop = useCallback((yon, schema, index) => {

            if (yon === 'up') {
                if (index === 0) {

                    setFormDesignData([schema, ...formDesignData]);
                } else {
                    formDesignData.splice(index - 1, 0, schema);
                    setFormDesignData([...formDesignData]);
                }

            } else {
                if (index === formDesignData.length) {
                    setFormDesignData([...formDesignData, schema]);
                } else {
                    formDesignData.splice(index + 1, 0, schema);
                    setFormDesignData([...formDesignData]);
                }
            }
        }, [formDesignData])

        const [selectorInfo, setSelectorInfo] = useState<any>();

        const select = useCallback((selectorInfo) => {
            // alert(JSON.stringify(selectorInfo));
            setSelectorInfo({ ...selectorInfo });
        }, [])

        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)
        return (
            isLoading ? Spinner() :

                VStack({ alignment: cTopLeading, spacing: 5 })(

                    VStack(

                        PageHeader(form.name)
                            .breadcrumbs([
                                {
                                    title: 'Projects',
                                },
                                {
                                    title: project.name
                                },
                                {
                                    title: 'Forms',
                                    onClick: () => navigate('[forms]')
                                }
                            ]),

                    ).height().display('block'),
                    HStack({ alignment: cTopLeading })(


                        VStack({ alignment: cTopLeading })(
                            HStack({ alignment: cTopLeading })(
                                VStack({ alignment: cTopLeading })(
                                    ...ForEach([
                                        {
                                            title: 'Header',
                                            schema: {
                                                type: 'header',
                                                label: 'Form 1'
                                            }
                                        },
                                        {
                                            title: 'Input',
                                            type: 'input',
                                            schema: {
                                                type: 'input',
                                                label: 'Text'
                                            }
                                        },
                                        {
                                            title: 'Text Area',
                                            schema: {
                                                type: 'textarea',
                                                label: 'Description'
                                            }
                                        }
                                    ])((item) =>
                                        HStack(
                                            Text(item.title)
                                        ).height(28)
                                            .onDragStart((ev) => {

                                                // Add different types of drag data
                                                ev.dataTransfer.setData("text/plain", JSON.stringify(item.schema));
                                                /*   ev.dataTransfer.setData("text/html", ev.target.outerHTML);
                                                  ev.dataTransfer.setData(
                                                      "text/uri-list",
                                                      ev.target.ownerDocument.location.href,
                                                  ); */
                                                ev.dataTransfer.dropEffect = "copy";

                                            })
                                            .draggable(true)
                                    )
                                ).allWidth(200),
                                FormDesignerContext(() =>
                                    VStack(
                                        VStack(
                                            VStack(
                                                ScrollView({ alignment: cTop, axes: cVertical })(
                                                    VStack({ alignment: cTopLeading })(
                                                        VStack(
                                                            //Text(JSON.stringify(selectorInfo))
                                                        )
                                                            .zIndex(1000)
                                                            .background('#0000FF22')
                                                            .position('absolute').border('dashed 2px blue')
                                                            .cornerRadius(6)
                                                            .top(selectorInfo?.top?.toString() ?? ' -10000')
                                                            .left(selectorInfo?.left?.toString() ?? "-10000")
                                                            .width(selectorInfo?.width?.toString() ?? 0)
                                                            .height(selectorInfo?.height?.toString() ?? 0),
                                                        
                                                    
                                                        VStack({ alignment: cTopLeading, spacing: 10 })(
                                                            ...ForEach(formDesignData)((schema, index) =>
                                                                TFragment(
                                                                    TFragment(
                                                                        schema.type === 'input' &&
                                                                        FieldContext(() =>
                                                                            DropContainer(
                                                                                VStack({ alignment: cLeading, spacing: 10 })(
                                                                                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                                                                                    HStack().height(36).border('solid 1px #E7EAEC').cornerRadius(6)
                                                                                )
                                                                            )
                                                                        )
                                                                            .index(index)
                                                                            .schema(schema),
                                                                        schema.type === 'textarea' &&
                                                                        FieldContext(() =>
                                                                            DropContainer(
                                                                                VStack({ alignment: cLeading, spacing: 10 })(
                                                                                    Text(schema.label).fontSize(18).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),
                                                                                    HStack().height(136).border('solid 1px #E7EAEC').cornerRadius(6)
                                                                                )
                                                                            )
                                                                        )
                                                                            .index(index)
                                                                            .schema(schema)
                                                                        ,


                                                                        schema.type === 'header' &&
                                                                        FieldContext(() =>
                                                                            DropContainer(
                                                                                VStack({ alignment: cLeading, spacing: 10 })(
                                                                                    Text(schema.label).fontSize(22).fontWeight('500').foregroundColor('rgb(33, 37, 38)'),

                                                                                ).allHeight(40)
                                                                            )
                                                                        )
                                                                            .index(index)
                                                                            .schema(schema)

                                                                    )


                                                                )
                                                            )
                                                        ).minHeight(20).height(),
                                                        HStack(
                                                            Text('DROP ZONE')
                                                                .foregroundColor('rgba(46, 46, 46, 0.4)')
                                                                .fontSize(10).fontWeight('600')
                                                        )
                                                            .className(className)
                                                            .margin(10)

                                                            .onDragOver((ev) => {
                                                                ev.preventDefault();
                                                                ev.dataTransfer.dropEffect = "copy";
                                                            })
                                                            .onDrop((ev) => {
                                                                ev.preventDefault();
                                                                const data = ev.dataTransfer.getData("text/plain");
                                                                const schema = JSON.parse(data);
                                                                setFormDesignData([ ...formDesignData,schema]);
                                                            }),


                                                    )
                                                        .padding()
                                                        .background('white')
                                                        .allWidth(500)
                                                        .height()
                                                )
                                            )
                                                .background('#F5F9FF')
                                                .shadow('0 0 12px 0 rgba(0, 0, 0, 0.12)')
                                                .cornerRadius(10)
                                                .padding('100px 0px 0px')
                                        )
                                            .cornerRadius(10)
                                            .shadow('rgb(0 0 0 / 20%) 0 5px 15px 0')

                                    )
                                        .cornerRadius(10)
                                        .background('#EFF1F4')
                                        .padding(30)


                                )
                                    .handleDrop(handleDrop)
                                    .select(select)
                            )
                            /*  <JsonEditor
                                 data={AddFormDialogSchema}
                                 onUpdate={({ newData }) => {
                                     setFormData(newData as any)
                                     // Do something with the new data, e.g. update jsonData
                                 }}
                             /> */
                        ),
                        /*    VStack({ alignment: cTopLeading })(
                               <WithReact schema={formData ?? {}} initialValues={{}} handleSubmit={() => void 0}></WithReact>
   
                           ) */

                    )

                )
                    .background('white')
                    .padding(cHorizontal, 'var(--page-padding)')
        )





    }
}