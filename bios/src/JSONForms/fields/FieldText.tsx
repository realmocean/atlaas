import { HelperMessage, Label } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { Fragment } from "react";

export function FieldText({
    type,
    name,
    label,
    description,
    value,
    isVisible,
    error,
    submited,
    onChange,
    required,
    ...props
}) {
    const [touched, setTouched] = useState(false);

    if (!isVisible) return null;

    function handleChange(e) {
        if (!touched) setTouched(true);
        onChange(name, e.target.value);
    }
    console.log(props)

    return (
        <Fragment>
            <div style={{ display: 'block', width:'100%' }}>
                <Label htmlFor={name}>{label}</Label>
                <Textfield {...props} isReadOnly={props.readOnly} name={name} id={name}  defaultValue={value}  onChange={handleChange}  aria-required={required}/>
                <HelperMessage>
                  {description}
                </HelperMessage>
            </div>
        </Fragment>
        /*  <Box>
             <Label htmlFor={name}>{label}</Label>
             {description && <Hint id={`${name}-description`}>{description}</Hint>}
             <InputText
                 id={name}
                 type="text"
                 defaultValue={value}
                 onChange={handleChange}
                 aria-invalid={!!error}
                 aria-describedby={`${name}-error ${name}-description`}
                 aria-required={required}
                 {...props}
             />
             {(touched || submited) && error && (
                 <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>
             )}
         </Box> */
    );
}