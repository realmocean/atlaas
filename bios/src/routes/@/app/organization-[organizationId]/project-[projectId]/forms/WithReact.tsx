import { Fragment, useState } from "react";


declare var realmocean$form;

const { createHeadlessForm } = realmocean$form;

import { formValuesToJsonValues, getDefaultValuesFromFields } from "./utils";
import {
    Box,
    Stack,
    LabelRadio,
    RadioOptions,
    Fieldset,
    InputText,
    Hint,
    ErrorMessage,
    Label
} from "./App.styled";
import React from "react";
import Textfield from "@atlaskit/textfield";

const jsonSchemaDemo = {
    "additionalProperties": false,
    "properties": {
        "city": {
            "title": "City",
            "description": "Has a default value.",
            "x-jsf-presentation": {
                "inputType": "text"
            },
            "default": "Porto"
        },
        "terms": {
            "title": "Terms",
            "description": "This is checked by default.",
            "x-jsf-presentation": {
                "inputType": "checkbox"
            },
            "const": "acknowledged",
            "default": "acknowledged"
        },
        "game_level": {
            "title": "Game level",
            "description": "Based on the level, the \"power\" and \"premium\" fields change.",
            "oneOf": [
                {
                    "const": "zero",
                    "title": "Zero",
                    "description": "The power is still invisible."
                },
                {
                    "const": "1st",
                    "title": "1st Level",
                    "description": "The power is \"low\" and readonly."
                },
                {
                    "const": "2nd",
                    "title": "2nd Level",
                    "description": "The power is editable."
                },
                {
                    "const": "3rd",
                    "title": "3rd Level",
                    "description": "The premium access is forced to be unchecked by default. This is done with jsf \"customProperties\"."
                }
            ],
            "x-jsf-presentation": {
                "inputType": "radio"
            }
        },
        "power": {
            "title": "Power",
            "description": "This is power level.",
            "x-jsf-presentation": {
                "inputType": "text"
            },
            "type": "string"
        },
        "premium": {
            "title": "Premium access",
            "description": "This gets unchecked when \"3rd Level\" is selected.",
            "x-jsf-presentation": {
                "inputType": "checkbox"
            },
            "const": "premium"
        }
    },
    "required": [
        "game_level",
        "terms"
    ],
    "allOf": [
        {
            "if": {
                "properties": {
                    "game_level": {
                        "enum": [
                            "1st",
                            "2nd",
                            "3rd"
                        ]
                    }
                },
                "required": [
                    "game_level"
                ]
            },
            "then": {
                "required": [
                    "power"
                ]
            },
            "else": {
                "properties": {
                    "power": false
                }
            }
        },
        {
            "if": {
                "properties": {
                    "game_level": {
                        "const": "1st"
                    }
                },
                "required": [
                    "game_level"
                ]
            },
            "then": {
                "properties": {
                    "power": {
                        "const": "Low",
                        "readOnly": true
                    }
                }
            },
            "else": {
                "properties": {
                    "power": {
                        "readOnly": false
                    }
                }
            }
        },
        {
            "if": {
                "properties": {
                    "game_level": {
                        "const": "3rd"
                    }
                },
                "required": [
                    "game_level"
                ]
            },
            "then": {
                "required": [
                    "premium"
                ]
            }
        }
    ],
    "type": "object"
}


const fieldsMap = {
    text: FieldText,
    number: FieldNumber,
    radio: FieldRadio,
    error: FieldUnknown
};

const initialValuesFromAPI = {
    name: 'Mega team'
}

export function WithReact() {
    const { fields, handleValidation } = createHeadlessForm(jsonSchemaDemo, {
        strictInputType: false, // so you don't need to pass presentation.inputType,
        initialValues: initialValuesFromAPI,
    });
    async function handleOnSubmit(jsonValues, { formValues }) {
        alert(
            `Submitted with succes! ${JSON.stringify(
                { formValues, jsonValues },
                null,
                3
            )}`
        );
        console.log("Submitted!", { formValues, jsonValues });
    }

    return (
        <article>
            <h1>json-schema-form + React</h1>
            <p>This demo uses React without any other Form library.</p>
            <br />

            <SmartForm
                name={'dsf'}
                onSubmit={handleOnSubmit}
                // From JSF
                fields={fields}
                initialValues={initialValuesFromAPI}
                handleValidation={handleValidation}
            />
        </article>
    );
}

// ===============================
// ====== UI COMPONENTS ==========
// ===============================

function SmartForm({ name, fields, initialValues, handleValidation, onSubmit }) {
    const [values, setValues] = useState(() =>
        getDefaultValuesFromFields(fields, initialValues)
    );
    const [errors, setErrors] = useState({});
    const [submited, setSubmited] = useState(false);

    function handleInternalValidation(valuesToValidate) {
        const valuesForJson = formValuesToJsonValues(fields, valuesToValidate);
        const { formErrors } = handleValidation(valuesForJson);

        setErrors(formErrors || {});

        return {
            errors: formErrors,
            jsonValues: valuesForJson
        };
    }

    function handleFieldChange(fieldName, value) {
        const newValues = {
            ...values,
            [fieldName]: value
        };
        setValues(newValues);

        handleInternalValidation(newValues);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmited(true);

        const validation = handleInternalValidation(values);

        if (validation.errors) {
            return null;
        }

        return onSubmit(validation.jsonValues, { formValues: values });
    }

    return (
        <form name={name} onSubmit={handleSubmit} noValidate>
            <Stack gap="24px">
                {fields?.map((field) => {
                    const { name: fieldName, inputType } = field;
                    const FieldComponent = fieldsMap[inputType] || fieldsMap.error;

                    return (
                        <FieldComponent
                            key={fieldName}
                            value={values?.[fieldName]}
                            error={errors[fieldName]}
                            submited={submited}
                            onChange={handleFieldChange}
                            {...field}
                        />
                    );
                })}

                <button type="submit">Submit</button>
            </Stack>
        </form>
    );
}

function FieldText({
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

    return (
        <Fragment>
            <div style={{ display: 'block' }}>
                <Label htmlFor={name}>{label}</Label>
                <Textfield {...props} isReadOnly={props.readOnly} name={name} id={name}  defaultValue={value}  onChange={handleChange}  aria-required={required}/>
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

function FieldNumber(props) {
    return (
        <FieldText
            inputMode="decimal"
            // accepts numbers and dots (eg 10, 15.50)
            pattern="^[0-9.]*$"
            {...props}
        />
    );
}

function FieldRadio({
    name,
    label,
    description,
    value,
    options,
    isVisible,
    error,
    submited,
    onChange
}) {
    const [touched, setTouched] = useState(false);

    if (!isVisible) return null;

    function handleChange(e) {
        if (!touched) setTouched(true);
        onChange(name, e.target.value);
    }

    const displayError = submited || touched ? error : null;

    return (
        <Fieldset key={name}>
            {/* A11Y errors: https://blog.tenon.io/accessible-validation-of-checkbox-and-radiobutton-groups/ */}
            <Label as="legend" aria-label={`${label} ${displayError}`}>
                {label}
            </Label>
            {description && <Hint>{description}</Hint>}
            <RadioOptions onChange={handleChange}>
                {options.map((opt) => (
                    <LabelRadio key={opt.value}>
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            defaultChecked={value === opt.value}
                        />
                        {opt.label}
                    </LabelRadio>
                ))}
            </RadioOptions>
            {displayError && <ErrorMessage>{displayError}</ErrorMessage>}
        </Fieldset>
    );
}

function FieldUnknown({ type, name, error }) {
    return (
        <p style={{ border: "1px dashed gray", padding: "8px" }}>
            Field "{name}" unsupported: The type "{type}" has no UI component built
            yet.
            {error && <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>}
        </p>
    );
}
