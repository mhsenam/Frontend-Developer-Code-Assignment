import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FormSchema } from "../../services/api";
import FormSection from "./FormSection";
import api from "../../services/api";

interface FormRendererProps {
  formSchema: FormSchema;
  onSubmitSuccess?: (data: any) => void;
  initialData?: any;
  autoSave?: boolean;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  formSchema,
  onSubmitSuccess,
  initialData = {},
  autoSave = false,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Dynamically create validation schema based on form fields
  const buildValidationSchema = () => {
    const schemaFields: { [key: string]: any } = {};

    formSchema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        let fieldValidator: any;

        switch (field.type) {
          case "email":
            fieldValidator = yup.string().email("Invalid email address");
            break;
          case "number":
            fieldValidator = yup.number().typeError("Must be a number");
            if (field.validation?.min !== undefined) {
              fieldValidator = fieldValidator.min(
                field.validation.min,
                `Minimum value is ${field.validation.min}`
              );
            }
            if (field.validation?.max !== undefined) {
              fieldValidator = fieldValidator.max(
                field.validation.max,
                `Maximum value is ${field.validation.max}`
              );
            }
            break;
          case "tel":
            fieldValidator = yup.string();
            if (field.validation?.pattern) {
              fieldValidator = fieldValidator.matches(
                new RegExp(field.validation.pattern),
                "Invalid phone number format"
              );
            }
            break;
          case "checkbox":
            fieldValidator = yup.boolean();
            break;
          default:
            fieldValidator = yup.string();
            if (field.validation?.minLength !== undefined) {
              fieldValidator = fieldValidator.min(
                field.validation.minLength,
                `Minimum length is ${field.validation.minLength} characters`
              );
            }
            if (field.validation?.maxLength !== undefined) {
              fieldValidator = fieldValidator.max(
                field.validation.maxLength,
                `Maximum length is ${field.validation.maxLength} characters`
              );
            }
            if (field.validation?.pattern) {
              fieldValidator = fieldValidator.matches(
                new RegExp(field.validation.pattern),
                `Invalid ${field.label.toLowerCase()} format`
              );
            }
        }

        // Add required validation if field is required
        if (field.required) {
          fieldValidator = fieldValidator.required(
            `${field.label} is required`
          );
        }

        // Only add validation if field doesn't have dependencies or if the dependent value matches
        if (!field.dependsOn) {
          schemaFields[field.id] = fieldValidator;
        }
      });
    });

    return yup.object(schemaFields);
  };

  const validationSchema = buildValidationSchema();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await api.submitForm({
        formId: formSchema.id,
        data,
      });

      setSubmitSuccess(true);

      if (onSubmitSuccess) {
        onSubmitSuccess(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle form field changes for auto-save
  const handleAutoSave = async (formData: any) => {
    if (!autoSave || !isDirty) return;

    try {
      setAutoSaveStatus("saving");

      // Call API to save draft
      await api.submitForm({
        formId: formSchema.id,
        data: formData,
        isDraft: true,
      });

      setAutoSaveStatus("saved");

      // Reset status after 3 seconds
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error auto-saving form:", error);
      setAutoSaveStatus("error");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => handleAutoSave(methods.getValues())}
      >
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {formSchema.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {formSchema.description}
          </Typography>
        </Box>

        {submitError && (
          <Alert severity="error" className="mb-4">
            {submitError}
          </Alert>
        )}

        {submitSuccess && (
          <Alert severity="success" className="mb-4">
            Form submitted successfully!
          </Alert>
        )}

        {autoSave && (
          <Box mb={2} display="flex" justifyContent="flex-end">
            {autoSaveStatus === "saving" && (
              <Typography
                variant="body2"
                color="textSecondary"
                display="flex"
                alignItems="center"
              >
                <CircularProgress size={16} className="mr-2" /> Saving...
              </Typography>
            )}
            {autoSaveStatus === "saved" && (
              <Typography variant="body2" color="primary">
                Draft saved
              </Typography>
            )}
            {autoSaveStatus === "error" && (
              <Typography variant="body2" color="error">
                Error saving draft
              </Typography>
            )}
          </Box>
        )}

        {formSchema.sections.map((section) => (
          <FormSection
            key={section.id}
            section={section}
            disabled={submitting}
          />
        ))}

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default FormRenderer;
