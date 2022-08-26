import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateTime = () => {
  const [dateTimeVal, setDateTimeVal] = React.useState<Date | null>(new Date());
  // date time picker interface
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Choose End Date"
        value={dateTimeVal}
        onChange={(newValue) => {
          setDateTimeVal(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTime;
