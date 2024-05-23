import { useState } from 'react';

import {  jsx } from '@emotion/react';

import { Box, xcss } from '@atlaskit/primitives';
import Textfield from '@atlaskit/textfield';
import {
  fontSize as getFontSize,
  // eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
  gridSize as getGridSize,
} from '@atlaskit/theme/constants';

import InlineEdit from '@atlaskit/inline-edit';
import React from 'react';
import { css } from '@tuval/forms';




export const InlineTitle = ({title}) => {

const wrapperStyles = xcss({
   // padding: 'space.100',
    fontSize: '24px',
    fontWeight: '500',
  });
  
  const fontSize = getFontSize();
  const gridSize = getGridSize();
  
  const readViewContainerStyles = xcss({
   /*  fontSize:'24px',
    fontWeight:'500', */
    display: 'flex',
    maxWidth: '100%',
    paddingBlock: 'space.100',
    wordBreak: 'break-word',
  });
  
  const textFieldStyles = css({
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    // eslint-disable-next-line @atlaskit/design-system/no-nested-styles
    '& > [data-ds--text-field--input]': {
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
    },
  });

  const [editValue, setEditValue] = useState(title);

    return (
        <Box xcss={wrapperStyles}>
            <InlineEdit 
                defaultValue={editValue}
                editView={({ errorMessage, ...fieldProps }) => (
                    <Textfield {...fieldProps} autoFocus className={textFieldStyles} />
                )}
                readView={() => (
                    <Box xcss={readViewContainerStyles} testId="read-view">
                        {editValue || 'Click to enter text'}
                    </Box>
                )}
                onConfirm={(value) => {
                    setEditValue(value);
                }}
            />
        </Box>
    )
}

