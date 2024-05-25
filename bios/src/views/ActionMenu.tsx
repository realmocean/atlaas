import { UIView } from "@tuval/forms";
import { ReactNode } from "react";

import { IconButton } from '@atlaskit/button/new';
import MoreIcon from '@atlaskit/icon/glyph/more';
import React from 'react';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';

export class ActionMenuClass extends UIView {
    render(): ReactNode {
        return (
            <DropdownMenu<HTMLButtonElement>
                trigger={({ triggerRef, ...props }) => (
                    <IconButton {...props} appearance="primary" icon={MoreIcon} label="more" ref={triggerRef} />
                )}
                shouldRenderToParent
            >
                <DropdownItemGroup>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Share</DropdownItem>
                    <DropdownItem>Move</DropdownItem>
                    <DropdownItem>Clone</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                    <DropdownItem>Report</DropdownItem>
                </DropdownItemGroup>
            </DropdownMenu>
        );
    }
}

export const ActionNemu = () => (
    new ActionMenuClass()
)