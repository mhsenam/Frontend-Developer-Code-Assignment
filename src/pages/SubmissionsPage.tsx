import React from "react";
import { Typography, Box } from "@mui/material";
import { ListView } from "../components/ListView";

const SubmissionsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Insurance Applications
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        View and manage all submitted insurance applications.
      </Typography>

      <ListView />
    </Box>
  );
};

export default SubmissionsPage;
