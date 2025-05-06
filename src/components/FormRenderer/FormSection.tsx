import React from "react";
import { Typography, Paper, Divider } from "@mui/material";
import { FormSection as FormSectionType } from "../../services/api";
import FormField from "./FormField";
import { useFormContext, useWatch } from "react-hook-form";

interface FormSectionProps {
  section: FormSectionType;
  disabled?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const formValues = useWatch({ control });

  // Check if a field should be shown based on its dependencies
  const shouldShowField = (field: any) => {
    if (!field.dependsOn) return true;

    const { field: dependencyField, value: dependencyValue } = field.dependsOn;
    const currentValue = formValues[dependencyField];

    return currentValue === dependencyValue;
  };

  return (
    <Paper elevation={2} className="p-4 mb-6">
      <Typography variant="h6" component="h2" className="mb-4">
        {section.title}
      </Typography>
      <Divider className="mb-4" />

      {section.fields.map(
        (field) =>
          shouldShowField(field) && (
            <FormField key={field.id} field={field} disabled={disabled} />
          )
      )}
    </Paper>
  );
};

export default FormSection;
