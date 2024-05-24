import { VStack, Text, HStack, cLeading, UIView, css } from "@tuval/forms";
import { useField } from "../../../../../../../context/Field/context";



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
    const {schema, index} = useField();
    return (
        VStack(
            VStack({ alignment: cLeading, spacing: 10 })(
               view
            ) .style(` & {pointer-events: none;}`)

        )
            .height()
            .onDragEnter((ev) => {
                ev.target.classList.add(dragClassName);
            })
            .onDragLeave((ev) => {
                ev.target.classList.remove(dragClassName);
                ev.target.classList.remove(topBorder);
                ev.target.classList.remove(bottomBorder);
            })
            .onDragOver((ev) => {

                ev.preventDefault();
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
                    onDrop('up', schema, index);
                   /*  formDesignData.splice(index - 1, 0, schema);
                    setFormDesignData([...formDesignData]); */
                } else {
                    onDrop('down', schema, index);
                  /*   formDesignData.splice(index + 1, 0, schema);
                    setFormDesignData([...formDesignData]); */
                }


            })
            .onClick((ev)=> {
                const rect = ev.target.getBoundingClientRect();
                alert(rect.top)
            })
    )
}