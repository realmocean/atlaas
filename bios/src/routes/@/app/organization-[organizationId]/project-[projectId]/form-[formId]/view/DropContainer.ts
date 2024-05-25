import { VStack, Text, HStack, cLeading, UIView, css } from "@tuval/forms";
import { useField } from "../../../../../../../context/Field/context";
import { useFormDesigner } from "../../../../../../../context/FormDesigner/context";
import { Convert } from "@tuval/core";



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
    min-height: 15px !important;
    height:15px !important;
    transition: all .1s ease;
    text-align: center;
}

`

const dragClassName = css`
& {
   
}

`

export const DropContainer = (view: UIView) => {
    const { handleDrop, select } = useFormDesigner();
    const { schema, index } = useField();
    return (
        VStack(
            VStack({ alignment: cLeading, spacing: 10 })(
                view
            ).style(` & {pointer-events: none;}`)

        )
            .height()
            .onDragEnter((ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                ev.target.classList.add(dragClassName);
            })
            .onDragLeave((ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                ev.target.classList.remove(dragClassName);
                ev.target.classList.remove(topBorder);
                ev.target.classList.remove(bottomBorder);
            })
            .onDragOver((ev) => {

                ev.preventDefault();
                ev.stopPropagation();

                ev.dataTransfer.dropEffect = "copy";
                // Dragging position relative to the viewport
                const pageX = ev.pageX;
                const pageY = ev.pageY;

                // Get the bounding rectangle of the element
                const rect = ev.target.getBoundingClientRect();

                // Calculate the local coordinates within the element
                const localX = pageX - rect.left - window.scrollX;
                const localY = pageY - rect.top - window.scrollY;

                if (localY < rect.height / 2) {
                    ev.target.classList.remove(bottomBorder);
                    ev.target.classList.add(topBorder);
                    console.log('yukari')
                } else {
                    ev.target.classList.remove(topBorder);
                    ev.target.classList.add(bottomBorder);
                    console.log('asagi')
                }

                console.log('Local Coordinates: ', { localX, localY });


            })
            .onDrop((ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                ev.target.classList.remove(dragClassName);
                ev.target.classList.remove(topBorder);
                ev.target.classList.remove(bottomBorder);

                const data = ev.dataTransfer.getData("text/plain");
                const schema = JSON.parse(data);

                const pageX = ev.pageX;
                const pageY = ev.pageY;

                // Get the bounding rectangle of the element
                const rect = ev.target.getBoundingClientRect();

                // Calculate the local coordinates within the element
                const localX = pageX - rect.left - window.scrollX;
                const localY = pageY - rect.top - window.scrollY;

             

                if (localY < rect.height / 2) {
                    handleDrop('up', schema, index);
                    /*  formDesignData.splice(index - 1, 0, schema);
                     setFormDesignData([...formDesignData]); */
                } else {
                    handleDrop('down', schema, index);
                    /*   formDesignData.splice(index + 1, 0, schema);
                      setFormDesignData([...formDesignData]); */
                }


            })
            .onClick((ev) => {
                const rect = ev.target.getBoundingClientRect();
                const prect = ev.target.offsetParent.getBoundingClientRect();

                const pageX = ev.pageX;
                const pageY = ev.pageY;

                const localX = pageX - rect.left - window.scrollX;
                const localY = pageY - rect.top - window.scrollY;

                    
                
                select({
                    pageX:Convert.ToInt32(pageX),
                    pageY :Convert.ToInt32(pageY),
                    left: Convert.ToInt32(prect.left - rect.left + 35),
                    top: Convert.ToInt32( rect.top - prect.top + 53),
                    width: Convert.ToInt32(rect.width + 10),
                    height: Convert.ToInt32(rect.height - 20),
                    schema
                })
            })
    )
}