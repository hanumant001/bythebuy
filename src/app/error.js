"use client";

import { Alert, Box, Button, Card, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="pt-24 px-5 pb-10 max-w-3xl mx-auto">
      <Card className="p-6">
        <Typography variant="h5" gutterBottom>
          Something went wrong
        </Typography>
        <Alert severity="error" className="mb-5">
          {error?.message || "The page could not be loaded."}
        </Alert>
        <Box className="flex gap-3">
          <Button variant="contained" onClick={reset}>
            Try Again
          </Button>
          <Button variant="outlined" href="/">
            Go Home
          </Button>
        </Box>
      </Card>
    </main>
  );
}
