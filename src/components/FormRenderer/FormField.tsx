import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  Checkbox,
  MenuItem,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { FormField as FormFieldType } from "../../services/api";

interface FormFieldProps {
  field: FormFieldType;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ field, disabled = false }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[field.id];

  // Render different field types
  const renderFieldByType = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "tel":
      case "url":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{
              required: field.required ? `${field.label} is required` : false,
              pattern: field.validation?.pattern
                ? {
                    value: new RegExp(field.validation.pattern),
                    message: `Invalid ${field.label.toLowerCase()} format`,
                  }
                : undefined,
              min: field.validation?.min
                ? {
                    value: field.validation.min,
                    message: `Minimum value is ${field.validation.min}`,
                  }
                : undefined,
              max: field.validation?.max
                ? {
                    value: field.validation.max,
                    message: `Maximum value is ${field.validation.max}`,
                  }
                : undefined,
              minLength: field.validation?.minLength
                ? {
                    value: field.validation.minLength,
                    message: `Minimum length is ${field.validation.minLength} characters`,
                  }
                : undefined,
              maxLength: field.validation?.maxLength
                ? {
                    value: field.validation.maxLength,
                    message: `Maximum length is ${field.validation.maxLength} characters`,
                  }
                : undefined,
            }}
            render={({ field: { onChange, value, name } }) => (
              <TextField
                fullWidth
                id={name}
                name={name}
                label={field.label}
                type={field.type}
                value={value}
                onChange={onChange}
                required={field.required}
                error={!!error}
                helperText={error ? error.message?.toString() : ""}
                disabled={disabled}
                margin="normal"
              />
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{
              required: field.required ? `${field.label} is required` : false,
            }}
            render={({ field: { onChange, value, name } }) => (
              <TextField
                select
                fullWidth
                id={name}
                name={name}
                label={field.label}
                value={value}
                onChange={onChange}
                required={field.required}
                error={!!error}
                helperText={error ? error.message?.toString() : ""}
                disabled={disabled}
                margin="normal"
              >
                <MenuItem value="">
                  <em>Select...</em>
                </MenuItem>
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue={false}
            rules={{
              required: field.required ? `${field.label} is required` : false,
            }}
            render={({ field: { onChange, value, name } }) => (
              <FormControl
                error={!!error}
                required={field.required}
                margin="normal"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id={name}
                      name={name}
                      checked={!!value}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  }
                  label={field.label}
                />
                {error && (
                  <FormHelperText>{error.message?.toString()}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      // Add more field types as needed

      default:
        return <p>Unsupported field type: {field.type}</p>;
    }
  };

  return <div className="mb-4">{renderFieldByType()}</div>;
};

export default FormField;
