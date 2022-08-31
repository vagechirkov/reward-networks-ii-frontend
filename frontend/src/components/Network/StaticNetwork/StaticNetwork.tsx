import React from "react";

import NetworkNode from "../NetworkNode";
import {NetworkNodeInterface} from "../NetworkNode/NetworkNode";

import NetworkEdge from "../NetworkEdge";


export interface StaticNetworkEdgesInterface {
    reward: number;
    source_num: number;
    target_num: number;
    edgeStyle: "normal" | "highlighted" | "animated" | "dashed";
}

export interface StaticNetworkInterface {
    /** Array of edges of the network */
    edges: StaticNetworkEdgesInterface[];
    /** Array of nodes of the network */
    nodes: NetworkNodeInterface[];
    onNodeClick?: (nodeIdx: number) => void;
    /** size of the SVG component */
    size?: { width: number; height: number };
    nodeSize?: number;
    edgeCurvation?: number;
    edgeWidth?: number;
}

const StaticNetwork: React.FC<StaticNetworkInterface> = ({
                           edges,
                           nodes,
                           onNodeClick = (nodeIdx) => null,
                           size = {width: 550, height: 550},
                           edgeCurvation = 1,
                           nodeSize = 20,
                           edgeWidth = 1,
                       }: StaticNetworkInterface) => {
    /* TODO: make it more generic */
    // const nodeSize = ((size.height / 550) * 600) / 15;

    /* Scale node coordinates */
    const scaleXY = (
        node: { x: number; y: number },
        size: { width: number; height: number }
    ) => ({
        x: node.x * size.width,
        y: node.y * size.height,
    });

    const scaledNodes = nodes.map((node) => ({
        ...node,
        ...scaleXY(node, size),  // scaled coordinates
    } as NetworkNodeInterface));

    return (
        <svg width={size.width} height={size.height}>
            <g>
                {edges.map((edge, idx) => {
                    return (
                        <NetworkEdge
                            reward={edge.reward}
                            source={scaledNodes[edge.source_num]}
                            target={scaledNodes[edge.target_num]}
                            edgeWidth={edgeWidth}
                            edgeCurvation={edgeCurvation}
                            edgeStyle={edge.edgeStyle}
                            key={"link-" + idx}
                            idx={idx}
                            nodeSize={nodeSize}
                        />
                    );
                })}
            </g>
            <g>
                {scaledNodes.map((node, idx) => {
                    return (
                        <NetworkNode
                            {...node}
                            node_size={nodeSize}
                            onNodeClick={onNodeClick}
                            key={"point-" + idx}
                        />
                    );
                })}
            </g>
        </svg>
    );
};

export default StaticNetwork;