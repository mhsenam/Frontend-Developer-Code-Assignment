import React from "react";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid as MuiGrid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { formSchemas, loading, error, setSelectedFormId } = useFormContext();

  const handleApplyClick = (formId: string) => {
    setSelectedFormId(formId);
    navigate("/apply");
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{ p: 5, mb: 4, borderRadius: 2, backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Smart Insurance Portal
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Protect what matters most with our tailored insurance solutions.
          Complete your application online in minutes.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/apply")}
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Paper>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 6, mb: 3 }}
      >
        Our Insurance Products
      </Typography>

      {loading ? (
        <Typography>Loading available insurance products...</Typography>
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
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Box mt={8} mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Choose Us?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "calc(33.33% - 16px)" },
              textAlign: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Fast & Easy
            </Typography>
            <Typography>
              Complete your application online in minutes with our intuitive
              form process.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "calc(33.33% - 16px)" },
              textAlign: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Customized Coverage
            </Typography>
            <Typography>
              Tailored insurance solutions designed to meet your specific needs.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "calc(33.33% - 16px)" },
              textAlign: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              24/7 Support
            </Typography>
            <Typography>
              Our customer service team is available around the clock to assist
              you.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
