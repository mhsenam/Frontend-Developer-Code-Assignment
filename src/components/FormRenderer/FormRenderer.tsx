import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const getDraftKey = () => `draft_form_${formSchema.id}`;

  // Dynamically create validation schema based on form fields
  const buildValidationSchema = () => {
    const schemaFields: { [key: string]: any } = {};

    formSchema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        let fieldValidator: any;

        switch (field.type) {
          case "email":
            fieldValidator = yup.string().email(t("invalidEmail"));
            break;
          case "number":
            fieldValidator = yup.number().typeError(t("mustBeNumber"));
            if (field.validation?.min !== undefined) {
              fieldValidator = fieldValidator.min(
                field.validation.min,
                t("minValue", { min: field.validation.min })
              );
            }
            if (field.validation?.max !== undefined) {
              fieldValidator = fieldValidator.max(
                field.validation.max,
                t("maxValue", { max: field.validation.max })
              );
            }
            break;
          case "tel":
            fieldValidator = yup.string();
            if (field.validation?.pattern) {
              fieldValidator = fieldValidator.matches(
                new RegExp(field.validation.pattern),
                t("invalidFormat", { fieldName: field.label })
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
                t("minLength", { minLength: field.validation.minLength })
              );
            }
            if (field.validation?.maxLength !== undefined) {
              fieldValidator = fieldValidator.max(
                field.validation.maxLength,
                t("maxLength", { maxLength: field.validation.maxLength })
              );
            }
            if (field.validation?.pattern) {
              fieldValidator = fieldValidator.matches(
                new RegExp(field.validation.pattern),
                t("invalidFormat", { fieldName: field.label.toLowerCase() })
              );
            }
        }

        // Add required validation if field is required
        if (field.required) {
          fieldValidator = fieldValidator.required(
            t("fieldRequired", { fieldName: field.label })
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
    watch,
    reset,
  } = methods;

  // Effect to load draft from localStorage on mount or when formSchema changes
  useEffect(() => {
    if (!autoSave) return;

    const draftKey = getDraftKey();
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        reset(draftData);
        setAutoSaveStatus("saved");
        setTimeout(() => setAutoSaveStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error loading draft from localStorage:", error);
    }
  }, [formSchema.id, autoSave, reset]);

  // Effect to save to localStorage when form values change
  useEffect(() => {
    if (!autoSave || !isDirty) return;

    const subscription = watch((formData) => {
      setAutoSaveStatus("saving");
      try {
        const draftKey = getDraftKey();
        localStorage.setItem(draftKey, JSON.stringify(formData));
        setAutoSaveStatus("saved");

        // Reset status after 3 seconds
        setTimeout(() => {
          setAutoSaveStatus("idle");
        }, 3000);
      } catch (error) {
        console.error("Error auto-saving form to localStorage:", error);
        setAutoSaveStatus("error");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, autoSave, isDirty, formSchema.id]);

  // Handle form submission
  const onSubmitHandler = async (data: any) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await api.submitForm({
        formId: formSchema.id,
        data,
      });

      setSubmitSuccess(true);
      // Clear draft from localStorage on successful submission
      if (autoSave) {
        try {
          localStorage.removeItem(getDraftKey());
        } catch (error) {
          console.error("Error clearing draft from localStorage:", error);
        }
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(t("form.errorSubmitting"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    console.log("Drag ended:", result);

    // If dropped outside a valid droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "FIELD") {
      alert(
        `Field ${draggableId} moved from section ${source.droppableId} index ${source.index} to section ${destination.droppableId} index ${destination.index}`
      );
      // Actual reordering logic would go here, updating the formSchema state.
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
              {t("form.submittedSuccess")}
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
                  <CircularProgress size={16} className="mr-2" />{" "}
                  {t("form.saving")}
                </Typography>
              )}
              {autoSaveStatus === "saved" && (
                <Typography variant="body2" color="primary">
                  {t("form.saved")}
                </Typography>
              )}
              {autoSaveStatus === "error" && (
                <Typography variant="body2" color="error">
                  {t("form.errorSaving")}
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
              {submitting ? <CircularProgress size={24} /> : t("form.submit")}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </DragDropContext>
  );
};

export default FormRenderer;
