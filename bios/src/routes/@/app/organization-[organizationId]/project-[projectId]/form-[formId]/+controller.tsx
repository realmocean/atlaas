
import { Atlaas } from "@realmocean/atlaas";
import { ForEach, HStack, ReactView, Fragment as TFragment, Spinner, Text, UIController, UIView, VStack, cHorizontal, cLeading, cTopLeading, useParams, useState, css, ScrollView, cVertical, cTop, Icon, UIViewBuilder } from "@tuval/forms";
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
import { Icons } from "../../../../../../icons/Icons";

import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from "@radix-ui/react-icons";
import { Components } from "./Components";
import { SchemaProvider } from "./SchemaProviders";



export function useClickAway(cb) {
    const ref = React.useRef(null);
    const refCb = React.useRef(cb);
  
    React.useLayoutEffect(() => {
      refCb.current = cb;
    });
  
    React.useEffect(() => {
      const handler = (e) => {
        const element = ref.current;
        if (element && !element.contains(e.target)) {
          refCb.current(e);
        }
      };
  
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
  
      return () => {
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
      };
    }, []);
  
    return ref;
  }
  
const _className = css`
& {
    width:100% !important;
    min-height: 55px !important;
    height:55px !important;
    transition: all .1s ease;
    text-align: center;
    border:dashed 2px gray;
}

`


const className = css`
 & {
  width:100%;
 }



.IconButton {
  font-family: inherit;
  height: 35px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet-11);
  box-shadow: 0 2px 10px var(--black-a7);
}
.IconButton:hover {
  background-color: var(--violet-3);
}


.Fieldset {
  display: flex;
  gap: 20px;
  align-items: center;
}

.Label {
  font-size: 13px;
  color: var(--violet-11);
  width: 75px;
}

.Input {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  box-shadow: 0 0 0 1px var(--violet-7);
  height: 25px;
}
.Input:focus {
  box-shadow: 0 0 0 2px var(--violet-8);
}

.Text {
  margin: 0;
  color: var(--mauve-12);
  font-size: 15px;
  line-height: 19px;
  font-weight: 500;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
`

const contentClass = css`

  border-radius: 4px;
  padding: 20px;
  width: 260px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 60px 0px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

&[data-state='open'][data-side='top'] {
  animation-name: slideDownAndFade;
}
&[data-state='open'][data-side='right'] {
  animation-name: slideLeftAndFade;
}
&[data-state='open'][data-side='bottom'] {
  animation-name: slideUpAndFade;
}
&[data-state='open'][data-side='left'] {
  animation-name: slideRight
`

const PopoverArrowClass = css`
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: transparent;
  border-width: 10px;
  top: 100%;
  border-top-color: white;
  margin-left: -10px;

`

const popoverCloseClass = css`

  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet-11);
  position: absolute;
  top: 5px;
  right: 5px;

&:hover {
  background-color: var(--violet-4);
}
&:focus {
  box-shadow: 0 0 0 2px var(--violet-7);
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

        const ref = useClickAway(()=> setSelectorInfo(null));

        const handleDrop = useCallback((yon, schema, index) => {
            
            if (yon === 'up') {
                if (index === 0) {

                    setFormDesignData([schema, ...formDesignData]);
                }
                if (index === 1) {

                    formDesignData.splice(index, 0, schema);
                    setFormDesignData([...formDesignData]);
                }
                else {
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
                                VStack({ alignment: cTopLeading, spacing: 15 })(
                                    ...ForEach(Components)((item) =>
                                        ReactView(
                                            <Popover.Root>
                                                <Popover.Trigger asChild>
                                                    <button style={{ width: '100%' }} aria-label="Update dimensions">
                                                        {
                                                            VStack({ alignment: cLeading })(
                                                                HStack({ alignment: cLeading, spacing: 10 })(
                                                                    Icon(item.icon),
                                                                    Text(item.title).fontWeight('500')
                                                                        .fontFamily('Inter, Helvetica Neue, Helvetica, Arial, sans-serif')
                                                                        .fontSmoothing('antialiased')
                                                                )
                                                                    .padding(6)
                                                                    .background('white')
                                                                    .cornerRadius(6)
                                                                    .height(50)
                                                                    .shadow('rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px')
                                                            )
                                                                .height(28)
                                                                .cursor('move')
                                                                .background('white')
                                                                .cornerRadius(6)
                                                                .height(50)
                                                                .shadow('rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(0, 0, 0, 0.05) 0px 1px 2px 0px')

                                                                .render()
                                                        }
                                                    </button>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                    <Popover.Content className={contentClass} sideOffset={5} side="right" align="start">
                                                        <Popover.Close className={popoverCloseClass} aria-label="Close">
                                                            <Cross2Icon />
                                                        </Popover.Close>
                                                        {
                                                            UIViewBuilder(() => {

                                                                return (
                                                                    VStack({ alignment: cTopLeading, spacing: 10 })(
                                                                        HStack({ alignment: cLeading })(
                                                                            Text(item.title).textTransform('uppercase').fontSize(12).foregroundColor('#525252').fontWeight('700')
                                                                        ).height().marginTop(10),
                                                                        ...ForEach(item.components)(component =>
                                                                            HStack(
                                                                                HStack(
                                                                                    Icon(component.icon)
                                                                                ).allWidth(30)
                                                                                    .cornerRadius('50%'),
                                                                                // .background(component.service.theme ?? ''),


                                                                                VStack({ alignment: cLeading })(
                                                                                    Text(component.title).fontSize(16).lineHeight(24)
                                                                                        .fontSmoothing('antialiased')
                                                                                        .fontFamily("Inter, Helvetica Neue, Helvetica, Arial, sans-serif")
                                                                                        .foregroundColor('rgb(51, 51, 51)'),
                                                                                    //  Text(component.description)
                                                                                    //    .multilineTextAlignment(TextAlignment.leading)
                                                                                    //    .foregroundColor('rgb(134, 134, 134)').fontSize('11.8px').lineHeight(19)
                                                                                )

                                                                                    .cornerRadius(6)
                                                                                    .background('white')
                                                                                    .draggable(true)
                                                                                    .onDragStart((ev) => {

                                                                                        const canvas: HTMLCanvasElement = document.getElementById('dragging_canvas') as any ?? document.createElement('canvas');
                                                                                        canvas.id = 'dragging_canvas';
                                                                                        canvas.width = 100;

                                                                                        canvas.height = 35;
                                                                                        canvas.style.position = 'absolute';
                                                                                        canvas.style.top = '-1000px'
                                                                                        document.body.append(canvas);

                                                                                        // Draw on the canvas
                                                                                        const ctx = canvas.getContext('2d');
                                                                                        ctx.fillStyle = 'black';
                                                                                        ctx.font = '14px Arial';
                                                                                        ctx.textAlign = 'center';
                                                                                        ctx.textBaseline = 'middle';
                                                                                        var width = Math.max(ctx.measureText(component.title).width, 50);
                                                                                        canvas.width = width * 1.8;

                                                                                        //ctx.fillStyle = 'yellow';
                                                                                        //ctx.fillRect(0, 0, canvas.width, canvas.height);
                                                                                        // Manipulate it again
                                                                                        ctx.strokeStyle = "#3A4D39";
                                                                                        ctx.fillStyle = "#4F6F52";
                                                                                        // Different radii for each corner, top-left clockwise to bottom-left
                                                                                        ctx.beginPath();
                                                                                        ctx.roundRect(0, 0, canvas.width, canvas.height, 10);
                                                                                        ctx.fill();
                                                                                        ctx.stroke();

                                                                                        ctx.fillStyle = 'white';
                                                                                        ctx.font = '16px Arial';
                                                                                        ctx.textAlign = 'center';
                                                                                        ctx.textBaseline = 'middle';

                                                                                        ctx.fillText(component.title, canvas.width / 2, canvas.height / 2);

                                                                                        // Use the canvas as the drag image
                                                                                        ev.dataTransfer.setDragImage(canvas, canvas.width / 2, canvas.height / 2);

                                                                                        ev.dataTransfer.setData("text/plain", JSON.stringify(component.schema));
                                                                                        ev.dataTransfer.dropEffect = "copy";

                                                                                    })
                                                                                    /* .onDragEnd(() => {
                                                                                      setDragging(false);
                                                                                    })
                                                                                    .onDragOver((event) => {
                                                                                      event.preventDefault();
                                                                                    }) */
                                                                                    //.shadow('rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px')
                                                                                    .cursor('grab')
                                                                                    .margin(6)
                                                                                    .padding(5)
                                                                            )
                                                                                .allHeight(30)
                                                                        )




                                                                    )
                                                                        .allWidth(220)
                                                                        .height()

                                                                )

                                                            }).render()
                                                        }

                                                        <Popover.Arrow className={PopoverArrowClass} />
                                                    </Popover.Content>
                                                </Popover.Portal>
                                            </Popover.Root>
                                        )

                                        /*  .onDragStart((ev) => {
                                             ev.dataTransfer.setData("text/plain", JSON.stringify(item.schema));
                                             ev.dataTransfer.dropEffect = "copy";
 
                                         })
                                         .draggable(true) */
                                    )
                                ).allWidth(250)
                                    .padding()
                                    .background('#F3F4F6')
                                ,
                                FormDesignerContext(() =>
                                    VStack(
                                        VStack(
                                            VStack(
                                                ScrollView({ alignment: cTop, axes: cVertical })(
                                                    VStack({ alignment: cTopLeading })(
                                                        VStack({ alignment: cTopLeading })(
                                                            HStack()
                                                                .position('absolute')
                                                                .top('-28px')
                                                                .height(26)
                                                                .width(100)
                                                                .background('#246EFF')
                                                                .cornerRadius(2)
                                                            //Text(JSON.stringify(selectorInfo))
                                                        )
                                                            .zIndex(1000)
                                                            .background('#0000FF22')
                                                            .position('absolute').border('dashed 2px blue')
                                                            .cornerRadius(6)
                                                            .top(selectorInfo?.top?.toString() ?? ' -10000')
                                                            .left(selectorInfo?.left?.toString() ?? "-10000")
                                                            .width(selectorInfo?.width?.toString() ?? 0)
                                                            .height(selectorInfo?.height?.toString() ?? 0)
                                                            .ref(ref),


                                                        VStack({ alignment: cTopLeading, spacing: 0 })(
                                                            ...ForEach(formDesignData)((schema, index) =>
                                                                TFragment(

                                                                    SchemaProvider[schema.type](schema, index)



                                                                )
                                                            )
                                                        ).minHeight(20).height(),
                                                    )
                                                        .padding(40)
                                                        .background('white')
                                                        .allWidth(600)
                                                        .height()
                                                        .onDragOver((ev) => {
                                                            ev.preventDefault();
                                                            ev.dataTransfer.dropEffect = "copy";
                                                        })
                                                        .onDrop((ev) => {
                                                            ev.preventDefault();
                                                            const data = ev.dataTransfer.getData("text/plain");
                                                            const schema = JSON.parse(data);
                                                            setFormDesignData([...formDesignData, schema]);
                                                        }),
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