import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export default function AddClearanceRecord({ clearenceRecord, action }) {
  const [intake, setIntake] = useState(
    action == "edit" ? clearenceRecord.intake : ""
  );
  const [fullName, setFullName] = useState(
    action == "edit" ? clearenceRecord.fullName : ""
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    action == "edit" ? clearenceRecord.registrationNumber : ""
  );
  const [degree, setDegree] = useState(
    action == "edit" ? clearenceRecord.degree : ""
  );
  const [borrowedDate, setBorrowedDate] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].date : null
  );
  const [itemName, setItemName] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].name : ""
  );
  const [itemValue, setItemValue] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].value : ""
  );
  const [itemDescription, setItemDescription] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].description : ""
  );

  const handleIntakeChange = (event) => {
    setIntake(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };

  const handleRegistrationNumberChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  const handleBorrowedDateChange = (date) => {
    setBorrowedDate(date);
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemValueChange = (event) => {
    setItemValue(event.target.value);
  };
  const handleItemDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
        <Typography variant="h6" component="h6">
          Student Details
        </Typography>
      </Box>
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
              <MenuItem value="Intake 39">Intake 39</MenuItem>
              <MenuItem value="Intake 40">Intake 40</MenuItem>
              <MenuItem value="Intake 41">Intake 41</MenuItem>
              {/* Add more intake options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="registation-number"
            label="Registration Number"
            value={registrationNumber}
            onChange={handleRegistrationNumberChange}
          />
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
          <FormControl fullWidth>
            <InputLabel id="degree-name-label">Degree</InputLabel>
            <Select
              labelId="degree-name-label"
              id="degree-name"
              value={degree}
              onChange={handleDegreeChange}
            >
              <MenuItem value="Information Technology">
                Information Technology
              </MenuItem>
              <MenuItem value="Information Systems">
                Information Systems
              </MenuItem>
              <MenuItem value="Quantity Survey">Quantity Survey</MenuItem>
              <MenuItem value="Survey Science">Survey Science</MenuItem>
              <MenuItem value="Architecture">Architecture</MenuItem>

              {/* Add more intake options as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ paddingLeft: "20px" }}>
        <Typography variant="h6" component="h6">
          Clearence Details
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="item-description"
            label="Item Description"
            value={itemDescription}
            onChange={handleItemDescriptionChange}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="item-value"
            label="Item Value"
            value={itemValue}
            onChange={handleItemValueChange}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                sx={{ width: "100%" }}
                defaultValue={dayjs(new Date(borrowedDate))}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </form>
  );
}
