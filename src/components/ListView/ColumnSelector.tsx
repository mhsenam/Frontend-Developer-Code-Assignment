import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

interface ColumnSelectorProps {
  availableColumns: string[];
  selectedColumns: string[];
  onSelectionChange: (columns: string[]) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  availableColumns,
  selectedColumns,
  onSelectionChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onSelectionChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id="column-selector-label">Columns</InputLabel>
      <Select
        labelId="column-selector-label"
        id="column-selector"
        multiple
        value={selectedColumns}
        onChange={handleChange}
        input={<OutlinedInput label="Columns" />}
        renderValue={(selected) => selected.join(", ")}
      >
        {availableColumns.map((column) => (
          <MenuItem key={column} value={column}>
            <Checkbox checked={selectedColumns.indexOf(column) > -1} />
            <ListItemText primary={column} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnSelector;
