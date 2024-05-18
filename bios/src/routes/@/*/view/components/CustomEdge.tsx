import React, { Fragment } from 'react';
import { getBezierPath } from 'reactflow';


export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
}) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (

        <g>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text dy="-5">
                <textPath
                    href={`#${id}`}
                    style={{ fontSize: '12px', stroke: "#B1B1B7" }}
                    startOffset="50%"
                    textAnchor="middle"
                >
                    {/* "data?.text" */}
                </textPath>
            </text>
        </g>
    );
}
