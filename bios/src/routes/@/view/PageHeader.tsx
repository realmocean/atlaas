import { Atlaas } from "@realmocean/atlaas";
import { HStack, Text, UIController, UIView, VStack, ViewProperty, cHorizontal, cTopLeading } from "@tuval/forms";
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import React from "react";
import Heading from '@atlaskit/heading';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import __noop from '@atlaskit/ds-lib/noop';
import { Box, Inline, xcss } from '@atlaskit/primitives';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search'
import APageHeader from '@atlaskit/page-header';
import { useProject } from "../../../context/project/context";
import { InlineTitle } from "./InlineTitle";


const selectContainerStyles = xcss({
    flex: '0 0 200px',
    marginInlineStart: 'space.100',
});

const flexBoxStyles = xcss({
    flex: '0 0 200px',
});


export interface BreadcrumbInfo {
    title: string;
    onClick?: Function;
}

class PageHeaderClass extends UIView {

    /** @internal */
    @ViewProperty() vp_PageTitle: string;
    public pageTitle(value: string) {
        this.vp_PageTitle = value;
        return this;
    }

    /** @internal */
    @ViewProperty() vp_breadcrumbs: BreadcrumbInfo[];
    public breadcrumbs(value: BreadcrumbInfo[]) {
        this.vp_breadcrumbs = value;
        return this;
    }

    public override render() {
        const { project } = useProject();
        //  const { realms, isLoading } = useListRealms();
        //  console.log('Error -- :' + error?.code)

        const breadcrumbs = (
            <Breadcrumbs onExpand={__noop}>
                {
                    this.vp_breadcrumbs?.map(b =>
                        <BreadcrumbsItem text={b.title} key={b.title} />
                    )
                }


            </Breadcrumbs>
        );
        const actionsContent = (
            <ButtonGroup label="Content actions">
                <Button appearance="primary">Create</Button>
                <Button>Share</Button>
                <Button>...</Button>
            </ButtonGroup>
        );
        const barContent = (
            <Inline>
                <Box xcss={flexBoxStyles}>
                    <TextField isCompact placeholder="Filter" aria-label="Filter" elemBeforeInput={<EditorSearchIcon label="Search" size="medium" ></EditorSearchIcon>} />
                </Box>
                <Box xcss={selectContainerStyles}>
                    <Select
                        spacing="compact"
                        placeholder="Choose an option"
                        aria-label="Choose an option"
                    />
                </Box>
            </Inline>
        );

        return (
            VStack({ alignment: cTopLeading, spacing: 5 })(
                VStack(
                    <APageHeader
                        breadcrumbs={breadcrumbs}
                        actions={actionsContent}
                        bottomBar={barContent}
                    >
                        <InlineTitle title={this.vp_PageTitle}></InlineTitle>
                    </APageHeader>
                ).height().display('block')
            )
                .height()
                .background('white')
                .padding(cHorizontal, 'var(--page-padding)')
                .render()
        )
    }
}

export const PageHeader = (pageTitle?: string) => (
    new PageHeaderClass().pageTitle(pageTitle)
)