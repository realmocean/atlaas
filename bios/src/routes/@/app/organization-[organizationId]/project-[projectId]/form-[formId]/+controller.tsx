
import { Atlaas } from "@realmocean/atlaas";
import { ForEach, HStack, ReactView, Fragment as TFragment, Spinner, Text, UIController, UIView, VStack, cHorizontal, cLeading, cTopLeading, useParams, useState, css } from "@tuval/forms";
import { PageHeader } from "../../../../view/PageHeader";
import { useProject } from "../../../../../../context/project/context";
import { useGetForm } from "../../../../../../hooks/useGetForm";
import { WithReact } from "../../../../../../JSONForms/WithReact";
import React, { Fragment } from "react";
import { AddFormDialogSchema } from "../forms/dialogs/AddFormDialog";
import { JsonEditor } from 'json-edit-react'
import { useProjectNavigate } from "../../../../../../hooks/useProjectNavigate";

const className = css`
& {
    width:100%;
    min-height: 15px;
    height:15px;
    transition: all .1s ease;
    text-align: center;
}

`

const dragClassName = css`
& {
    height:25px !important;
    background: yellow;
    border: 3px dashed #E1E9F6;
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
                                VStack({ alignment: cTopLeading })(
                                    HStack(
                                        Text('DROP ZONE')
                                            .foregroundColor('rgba(46, 46, 46, 0.4)')
                                            .fontSize(10).fontWeight('600')
                                    )
                                        .className(className)


                                        .onDragOver((ev) => {
                                            ev.preventDefault();
                                            ev.dataTransfer.dropEffect = "copy";
                                        })
                                        .onDrop((ev) => {
                                            ev.preventDefault();
                                            const data = ev.dataTransfer.getData("text/plain");
                                            const schema = JSON.parse(data);
                                            setFormDesignData([schema, ...formDesignData]);
                                        }),
                                    VStack({ alignment: cTopLeading })(
                                        ...ForEach(formDesignData)((schema, index) =>
                                            TFragment(
                                                TFragment(
                                                    schema.type === 'input' &&
                                                    VStack({ alignment: cLeading, spacing: 10 })(
                                                        Text(schema.label),
                                                        HStack().height(36).border('solid 1px #7A869A').cornerRadius(6)
                                                    ).height(),
                                                    schema.type === 'textarea' &&
                                                    VStack({ alignment: cLeading, spacing: 10 })(
                                                        Text(schema.label),
                                                        HStack().height(136).border('solid 1px #7A869A').cornerRadius(6)
                                                    ).height(),
                                                    schema.type === 'header' &&
                                                    VStack({ alignment: cLeading, spacing: 10 })(
                                                        Text(schema.label).fontSize(16).fontWeight('600'),
                                                    ).height()
                                                ),
                                                (formDesignData.length > 1 && index < formDesignData.length - 1) &&
                                                HStack(
                                                  /*   Text('DROP ZONE')
                                                        .foregroundColor('rgba(46, 46, 46, 0.4)')
                                                        .fontSize(10).fontWeight('600') */
                                                )
                                                    .className(className)


                                                    .border('1px dashed #E1E9F6')
                                                    //.background('rgba(0, 0, 0, 0.02)')
                                                    .onDragEnter((ev) => {

                                                        ev.target.classList.add(dragClassName);
                                                    })
                                                    .onDragLeave((ev) => {
                                                       ev.target.classList.remove(dragClassName);
                                                    })
                                                    .onDragOver((ev) => {
                                                        ev.preventDefault();
                                                        ev.dataTransfer.dropEffect = "copy";
                                                    })
                                                    .onDrop((ev) => {
                                                        ev.preventDefault();
                                                        ev.target.classList.remove(dragClassName);
                                                        const data = ev.dataTransfer.getData("text/plain");
                                                        const schema = JSON.parse(data);
                                                        formDesignData.splice(index + 1, 0, schema);
                                                        setFormDesignData([...formDesignData]);
                                                    })

                                            )
                                        )
                                    ).minHeight(20).height(),
                                    HStack(
                                        Text('DROP ZONE')
                                            .foregroundColor('rgba(46, 46, 46, 0.4)')
                                            .fontSize(10).fontWeight('600')
                                    )
                                        .className(className)

                                        .border('1px dashed #E1E9F6')
                                        .background('rgba(0, 0, 0, 0.02)')
                                        .onDragOver((ev) => {
                                            ev.preventDefault();
                                            ev.dataTransfer.dropEffect = "copy";
                                        })
                                        .onDrop((ev) => {
                                            ev.preventDefault();
                                            const data = ev.dataTransfer.getData("text/plain");
                                            const schema = JSON.parse(data);
                                            setFormDesignData([...formDesignData, schema]);
                                        })

                                )
                                    .padding()
                            )
                            /*  <JsonEditor
                                 data={AddFormDialogSchema}
                                 onUpdate={({ newData }) => {
                                     setFormData(newData as any)
                                     // Do something with the new data, e.g. update jsonData
                                 }}
                             /> */
                        ),
                        VStack({ alignment: cTopLeading })(
                            <WithReact schema={formData ?? {}} initialValues={{}} handleSubmit={() => void 0}></WithReact>

                        )

                    )
                )
                    .background('white')
                    .padding(cHorizontal, 'var(--page-padding)')


        )

    }
}