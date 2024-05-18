import { HStack, Icon, ReactView, Text, UIImage, VStack, css } from "@tuval/forms";
import React, { Fragment } from "react";
import { Handle, Position } from "reactflow";



const handleLClassName = css`
& {
  width:20px;
  height:20px;
  background:yellow;
  border:none;
  left:-25px;
  z-index:-1;
}
`


const handleRClassName = css`
& {
  width:20px;
  height:20px;
  background:yellow;
  border:none;
  right:-25px;
  z-index:-1;
}
`
//custome node
function TextNode({ data, selected }) {
  return (
    VStack(
      HStack(
        UIImage(data.service?.icon).allWidth(30).allHeight(30)
      ).width().height()
        .zIndex(1)
      ,
      <Fragment>
        <Handle
          id="a"
          type="target"
          position={Position.Left}
          className={handleLClassName}
          style={{ background: data.service?.theme }}
        />
        <Handle
          id="b"
          type="source"
          position={Position.Right}
          className={handleRClassName}
          style={{ background: data.service?.theme }}
        />
      </Fragment>,
      HStack()
        .position('absolute')
        .background(data.service?.theme ?? '')
        .allWidth(64)
        .allHeight(64)
        .cornerRadius('50%'),
        //.border(`solid 3px #F8F8F8}`),
    
      HStack(
        Text(data.label).fontSize(12).fontWeight('500')
          .whiteSpace('nowrap')
          .foregroundColor('#33333377')
          .fontFamily('Inter, Helvetica Neue, Helvetica, Arial, sans-serif')
          .fontSmoothing('antialiased')
      )

        .top('60px')
        .width().height()
        .position('absolute')

    )

      .filter('drop-shadow(4px 10px 10px rgba(0, 0, 0, 0.3))')

      .render()



  );
}

export default TextNode;