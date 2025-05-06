import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormRenderer } from "../components/FormRenderer";
import { useFormContext } from "../context/FormContext";
import { useTranslation } from "react-i18next";

const ApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { formSchemas, selectedFormId, setSelectedFormId, loading, error } =
    useFormContext();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { t } = useTranslation();

  const handleFormChange = (event: SelectChangeEvent<string>) => {
    setSelectedFormId(event.target.value);
  };

  const handleSubmitSuccess = () => {
    setSubmitSuccess(true);
    // Navigate to submissions page after a delay
    setTimeout(() => {
      navigate("/submissions");
    }, 2000);
  };

  const selectedForm = formSchemas.find((form) => form.id === selectedFormId);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("application.title")}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          {submitSuccess ? (
            <Alert severity="success" sx={{ my: 2 }}>
              {t("application.formSubmittedSuccess")}
            </Alert>
          ) : (
            <>
              <Paper sx={{ p: 3, mb: 4 }}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id="form-select-label">
                    {t("application.selectInsuranceType")}
                  </InputLabel>
                  <Select
                    labelId="form-select-label"
                    id="form-select"
                    value={selectedFormId || ""}
                    label={t("application.selectInsuranceType")}
                    onChange={handleFormChange}
                  >
                    {formSchemas.map((form) => (
                      <MenuItem key={form.id} value={form.id}>
                        {form.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedForm && (
                  <FormRenderer
                    formSchema={selectedForm}
                    onSubmitSuccess={handleSubmitSuccess}
                    autoSave={true}
                  />
                )}
              </Paper>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ApplicationPage;
