import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function DescriptionAlerts() {
  return (
    <Stack sx={{ width: "100%", marginTop: "50px" }} spacing={2}>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        No books were found for the book title you chose —{" "}
        <strong>enter a new search!</strong>
      </Alert>
    </Stack>
  );
}
