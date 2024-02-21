import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddClearanceRecord() {
  const [intake, setIntake] = useState("");
  const [fullName, setFullName] = useState("");
  const [borrowedDate, setBorrowedDate] = useState(null);
  const [itemName, setItemName] = useState("");

  const handleIntakeChange = (event) => {
    setIntake(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleBorrowedDateChange = (date) => {
    setBorrowedDate(date);
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="intake-name-label">Intake</InputLabel>
            <Select
              labelId="intake-name-label"
              id="intake-name"
              value={intake}
              onChange={handleIntakeChange}
            >
              <MenuItem value="Intake 38">Intake 38</MenuItem>
              <MenuItem value="Intake 38">Intake 39</MenuItem>
              <MenuItem value="Intake 38">Intake 40</MenuItem>
              <MenuItem value="Intake 38">Intake 41</MenuItem>
              {/* Add more intake options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="full-name"
            label="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Date" sx={{ width: "100%" }} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="item-name"
            label="Item Name"
            value={itemName}
            onChange={handleItemNameChange}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
