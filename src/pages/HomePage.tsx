import React from "react";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid as MuiGrid,
  Paper,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { useTranslation } from "react-i18next";
import SpeedIcon from "@mui/icons-material/Speed";
import TuneIcon from "@mui/icons-material/Tune";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { formSchemas, loading, error, setSelectedFormId } = useFormContext();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleApplyClick = (formId: string) => {
    setSelectedFormId(formId);
    navigate("/apply");
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {t("home.welcome")}
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          {t("home.tagline")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/apply")}
          sx={{ mt: 2 }}
        >
          {t("home.getStarted")}
        </Button>
      </Paper>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 6, mb: 3 }}
      >
        {t("home.ourProducts")}
      </Typography>

      {loading ? (
        <Typography>{t("home.loadingProducts")}</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {formSchemas.map((form) => (
            <Box
              key={form.id}
              sx={{
                width: { xs: "100%", md: "calc(33.33% - 16px)" },
              }}
            >
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {form.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {form.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleApplyClick(form.id)}
                  >
                    {t("home.applyNow")}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Box mt={8} mb={4}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          {t("home.whyChooseUs")}
        </Typography>
        <MuiGrid container spacing={4} mt={2} justifyContent="center">
          {[
            {
              icon: (
                <SpeedIcon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                />
              ),
              titleKey: "home.fastEasy",
              descKey: "home.fastEasyDesc",
            },
            {
              icon: (
                <TuneIcon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                />
              ),
              titleKey: "home.customizedCoverage",
              descKey: "home.customizedCoverageDesc",
            },
            {
              icon: (
                <SupportAgentIcon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                />
              ),
              titleKey: "home.support247",
              descKey: "home.support247Desc",
            },
          ].map((item, index) => (
            <MuiGrid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {item.icon}
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ mt: 1 }}
                >
                  {t(item.titleKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(item.descKey)}
                </Typography>
              </Paper>
            </MuiGrid>
          ))}
        </MuiGrid>
      </Box>
    </Box>
  );
};

export default HomePage;
