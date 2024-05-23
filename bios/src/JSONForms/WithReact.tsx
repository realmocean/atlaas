import { Fragment, useState } from "react";
import { LoadingButton } from '@atlaskit/button';

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
import { FieldText } from "./fields/FieldText";
import { VStack } from "@tuval/forms";




const fieldsMap = {
    text: FieldText,
    number: FieldNumber,
    radio: FieldRadio,
    error: FieldUnknown
};

const initialValuesFromAPI = {
    name: 'Mega team'
}

export function WithReact({ schema, handleSubmit }) {
    const { fields, handleValidation } = createHeadlessForm(schema, {
        strictInputType: false, // so you don't need to pass presentation.inputType,
        initialValues: initialValuesFromAPI,
    });
    async function handleOnSubmit(jsonValues, { formValues }) {
        handleSubmit({ formValues, jsonValues });
        /*  alert(
             `Submitted with succes! ${JSON.stringify(
                 { formValues, jsonValues },
                 null,
                 3
             )}`
         );
         console.log("Submitted!", { formValues, jsonValues }); */
    }

    return (
        <article>
            <h1>{schema['title']}</h1>
            {/* <p>This demo uses React without any other Form library.</p> */}
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
        <form name={name} onSubmit={handleSubmit} style={{ height: '100%' }} noValidate>
            {
                VStack(
                    VStack(
                        fields?.map((field) => {
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
                        })
                    ),
                    <LoadingButton type="submit" appearance="primary" isLoading={false}>
                        Save
                    </LoadingButton>
                ).render()
            }
        </form>
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
