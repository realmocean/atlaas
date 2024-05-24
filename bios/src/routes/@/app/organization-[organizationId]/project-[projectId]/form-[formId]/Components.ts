import { Icons } from "../../../../../../icons/Icons";

export const Components = [
    {
        title: 'Headers',
        icon: Icons.LabelIcon,
        components: [
            {
                title: 'Heading 1',
                icon: Icons.H1,
                schema: {
                    type: 'h1',
                    label: 'Form 1'
                }
            },
            {
                title: 'Heading 2',
                icon: Icons.H2,
                schema: {
                    type: 'h2',
                    label: 'Form 1'
                }
            }
        ]

    },
    {
        title: 'Inputs',
        icon: Icons.LabelIcon,
        components: [
            {
                title: 'Email',
                icon: Icons.LabelIcon,
                schema: {
                    type: 'email',
                    label: '[Label]'
                }
            },
            {
                title: 'Password',
                icon: Icons.LabelIcon,
                schema: {
                    type: 'password',
                    label: '[Label]'
                }
            },
            {
                title: 'Text Input',
                icon: Icons.LabelIcon,
                schema: {
                    type: 'input',
                    label: '[Label]'
                }
            },
            {
                title: 'Text Area',
                icon: Icons.LabelIcon,
                schema: {
                    type: 'textarea',
                    label: '[Label]'
                }
            },
            {
                title: 'Url',
                icon: Icons.LabelIcon,
                schema: {
                    type: 'url',
                    label: '[Label]'
                }
            },
        ]
    }
    
]