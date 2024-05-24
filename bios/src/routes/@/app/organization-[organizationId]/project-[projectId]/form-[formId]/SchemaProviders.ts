import { VStack, cLeading, HStack, Text, Heading } from "@tuval/forms";
import { FieldContext } from "../../../../../../context/Field/context";
import { DropContainer } from "./view/DropContainer";

export const SchemaProvider = {
    "email": (schema, index) => (
        FieldContext(() =>
            DropContainer(
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

                ).allHeight(40)
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

                ).allHeight(40)
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

                ).allHeight(40)
            )
        )
            .index(index)
            .schema(schema)
    )
}