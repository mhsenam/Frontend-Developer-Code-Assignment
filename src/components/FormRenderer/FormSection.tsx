import React from "react";
import { Typography, Paper, Divider } from "@mui/material";
import {
  FormSection as FormSectionType,
  FormField as FormFieldType,
} from "../../services/api";
import FormField from "./FormField";
import { useFormContext, useWatch } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";

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

      <Droppable droppableId={section.id} type="FIELD">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {section.fields.map(
              (field: FormFieldType, index: number) =>
                shouldShowField(field) && (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(providedDraggable, snapshotDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={{
                          ...providedDraggable.draggableProps.style,
                          marginBottom: snapshotDraggable.isDragging
                            ? "8px"
                            : "0px",
                          userSelect: "none",
                        }}
                      >
                        <FormField field={field} disabled={disabled} />
                      </div>
                    )}
                  </Draggable>
                )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default FormSection;
