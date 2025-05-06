import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import ColumnSelector from "./ColumnSelector";
import DataTable from "./DataTable";
import api from "../../services/api";

const ListView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.getSubmissions();

        setSubmissions(response.data);
        setColumns(response.columns);
        setVisibleColumns(response.columns);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to load submissions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleColumnSelectionChange = (selectedColumns: string[]) => {
    setVisibleColumns(selectedColumns);
  };

  return (
    <Paper elevation={2} className="p-6">
      <Box mb={4}>
        <Typography variant="h5" component="h1" gutterBottom>
          Insurance Application Submissions
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" className="my-4">
            {error}
          </Alert>
        ) : (
          <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <ColumnSelector
                availableColumns={columns}
                selectedColumns={visibleColumns}
                onSelectionChange={handleColumnSelectionChange}
              />
            </Box>

            <DataTable
              data={submissions}
              columns={columns}
              visibleColumns={visibleColumns}
            />
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ListView;
