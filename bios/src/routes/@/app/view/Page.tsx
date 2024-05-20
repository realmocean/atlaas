/* eslint-disable react-hooks/exhaustive-deps */

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Panel,
    useReactFlow,
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    useStoreApi,
    useStore,
    MarkerType,
} from "reactflow";


import Sidebar from "./components/sidebar";
import TextNode from "./components/TextNode";
import CustomEdge from "./components/CustomEdge";
import FloatingEdge from "./components/FloatingEdge";

// Key for local storage
const flowKey = "flow-key";

// Initial node setup
const initialNodes = [
    {
        id: "1",
        type: "textnode",
        data: { label: "input nodes" },
        position: { x: 250, y: 5 },
    },
];

let id = 0;

// Function for generating unique IDs for nodes
const getId = () => `node_${id++}`;

const App = () => {
    // Define custom node types
    const nodeTypes = useMemo(
        () => ({
            textnode: TextNode,
        }),
        []
    );

 

      const edgeTypes = {
        custom: CustomEdge,
        floating: FloatingEdge
      };

    // States and hooks setup
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedElements, setSelectedElements] = useState([]);
    const [nodeName, setNodeName] = useState("");

    // Update nodes data when nodeName or selectedElements changes
    useEffect(() => {
        if (selectedElements.length > 0) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === selectedElements[0]?.id) {
                        node.data = {
                            ...node.data,
                            label: nodeName,
                        };
                    }
                    return node;
                })
            );
        } else {
            setNodeName(""); // Clear nodeName when no node is selected
        }
    }, [nodeName, selectedElements, setNodes]);

    // Handle node click
    const onNodeClick = useCallback((event, node) => {
        setSelectedElements([node]);
        setNodeName(node.data.label);
        setNodes((nodes) =>
            nodes.map((n) => ({
                ...n,
                selected: n.id === node.id,
            }))
        );
    }, []);

    // Setup viewport
    const { setViewport } = useReactFlow();

    // Check for empty target handles
    const checkEmptyTargetHandles = () => {
        let emptyTargetHandles = 0;
        edges.forEach((edge) => {
            if (!edge.targetHandle) {
                emptyTargetHandles++;
            }
        });
        return emptyTargetHandles;
    };

    // Check if any node is unconnected
    const isNodeUnconnected = useCallback(() => {
        let unconnectedNodes = nodes.filter(
            (node) =>
                !edges.find(
                    (edge) => edge.source === node.id || edge.target === node.id
                )
        );

        return unconnectedNodes.length > 0;
    }, [nodes, edges]);

    // Save flow to local storage
    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const emptyTargetHandles = 0;//checkEmptyTargetHandles();

            if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
                alert(
                    "Error: More than one node has an empty target handle or there are unconnected nodes."
                );
            } else {
                const flow = reactFlowInstance.toObject();
                localStorage.setItem(flowKey, JSON.stringify(flow));
                alert("Save successful!"); // Provide feedback when save is successful
            }
        }
    }, [reactFlowInstance, nodes, isNodeUnconnected]);

    // Restore flow from local storage
    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);

    // Handle edge connection
    const onConnect = useCallback(
        (params) => {
            console.log("Edge created: ", params);
            setEdges((eds) => addEdge({...params,  type: 'custom'}, eds));
        },
        [setEdges]
    );

    // Enable drop effect on drag over
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // Handle drop event to add a new node
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const component = JSON.parse(type);
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left - 64,
                y: event.clientY - reactFlowBounds.top - 64,
            });
            const newNode = {
                id: getId(),
                type: 'textnode',
                position,
                data: { label: component.name,
                    ...component
                 },
            };

            console.log("Node created: ", newNode);
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const rfStyle = {
        backgroundColor: "#ffffff",
    };

    const MIN_DISTANCE = 120;
    const store = useStoreApi();

    const getClosestEdge = useCallback((node) => {
        const { nodeInternals } = store.getState();
        const storeNodes = Array.from(nodeInternals.values());


        const closestNode: any = storeNodes.reduce(
            (res: any, n: any) => {
                if (n.id !== node.id) {
                    const dx = n.positionAbsolute.x - node.positionAbsolute.x;
                    const dy = n.positionAbsolute.y - node.positionAbsolute.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < res.distance && d < MIN_DISTANCE) {
                        res.distance = d;
                        res.node = n;
                    }
                }

                return res;
            },
            {
                distance: Number.MAX_VALUE,
                node: null,
            },
        );

        if (!closestNode.node) {
            return null;
        }

        const closeNodeIsSource =
            closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

        return {
            id: closeNodeIsSource
                ? `${closestNode.node.id}-${node.id}`
                : `${node.id}-${closestNode.node.id}`,
            source: closeNodeIsSource ? closestNode.node.id : node.id,
            target: closeNodeIsSource ? node.id : closestNode.node.id,
        };
    }, []);



    const onNodeDrag = useCallback(
        (_, node) => {
            const closeEdge: any = getClosestEdge(node);

            const { nodeInternals } = store.getState();
            const nodesStore = Array.from(nodeInternals.values());
            const getNodeWithHandleBounds = () => {

                const nodeWithHB: any = []
                nodesStore.forEach((node) => {
                    const symboles = Object.getOwnPropertySymbols(node);
                    const handleBounds = (node as any)[symboles[0]].handleBounds;
                    //   handleBounds.source[0].x = 1230;
                    const newNode = {
                        ...node,
                        handleBounds: handleBounds
                    }
                    nodeWithHB.push(newNode);
                })
                return nodeWithHB;
            }

            console.log(getNodeWithHandleBounds());

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (
                    closeEdge &&
                    !nextEdges.find(
                        (ne) =>
                            ne.source === closeEdge.source && ne.target === closeEdge.target,
                    )
                ) {
                    closeEdge.className = 'temp';
                    nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        [getClosestEdge, setEdges],
    );

    const onNodeDragStop = useCallback(
        (_, node) => {
            const closeEdge: any = getClosestEdge(node);

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (
                    closeEdge &&
                    !nextEdges.find(
                        (ne) =>
                            ne.source === closeEdge.source && ne.target === closeEdge.target,
                    )
                ) {
                  closeEdge.type = 'custom';
                    nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        [getClosestEdge],
    );



    return (
        <div className="flex flex-row min-h-screen lg:flex-row" style={{width:'100%', background:'#F8F8F8'}}>
            <Sidebar
                nodeName={nodeName}
                setNodeName={setNodeName}
                selectedNode={selectedElements[0]}
                setSelectedElements={setSelectedElements}
            />
            <div className="flex-grow h-screen" ref={reactFlowWrapper}>
                <ReactFlow
                color={"yellow"}
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    edges={edges}
                    //@ts-ignore
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDrag={onNodeDrag}
                    onNodeDragStop={onNodeDragStop}

                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    style={rfStyle}
                    onNodeClick={onNodeClick}
                    onPaneClick={() => {
                        setSelectedElements([]); // Reset selected elements when clicking on pane
                        setNodes((nodes) =>
                            nodes.map((n) => ({
                                ...n,
                                selected: false, // Reset selected state of nodes when clicking on pane
                            }))
                        );
                    }}
                    
                     fitView
                    snapToGrid={true}
                    defaultEdgeOptions={{
                        type: 'simplebezier',
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        }
                    }}

                >
                    <Background color="transparent" gap={12} size={1} />
                    <Controls />
                    <MiniMap zoomable pannable />
                    <Panel position="top-right">
                        <button
                            className=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={onSave}
                        >
                            save flow
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={onRestore}
                        >
                            restore flow
                        </button>
                    </Panel>

                </ReactFlow>
            </div>


        </div>
    );
};

// Wrap App with ReactFlowProvider
function FlowWithProvider() {
    return (
        <ReactFlowProvider>
            <App />
        </ReactFlowProvider>
    );
}

export default FlowWithProvider;