import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import NetworkNode from './NetworkNode';


export default {
    title: 'Network/NetworkNode',
    component: NetworkNode,
    argTypes: {
        display_name: {control: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']},
    }
} as ComponentMeta<typeof NetworkNode>;

const Template: ComponentStory<typeof NetworkNode> = (args) => {
    return (
        <svg height={500} width={500}>
            <NetworkNode {...args}/>
        </svg>
    )
};

export const ActiveNode = Template.bind({});

ActiveNode.args = {
    node_num: 0,
    display_name: 'A',
    node_size: 100,
    x: 200,
    y: 200,
    status: 'active'
};

export const DisabledNode = Template.bind({});

DisabledNode.args = {
    node_num: 0,
    display_name: 'A',
    node_size: 100,
    x: 200,
    y: 200,
    status: 'disabled'
};
