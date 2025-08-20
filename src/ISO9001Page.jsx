import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";

export default function ISO9001Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={6} alignItems="center">
        {/* Left Side Text */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", fontWeight: 400, mb: 4, fontFamily: "Inter, sans-serif" }}
          >
            ISO9001: 2015 QUALITY MANAGEMENT
          </Typography>

          <Typography
            variant="h4"
            fontWeight="semibold"
            sx={{ mb: 3, lineHeight: 1.3 }}
          >
            International Standard for Quality
            <br />
            Management Systems
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            fontWeight="thin"

            sx={{ mb: 3, lineHeight: 1.7 }}
          >
            The implementation of a QMS is a strategic decision that helps an
            organisation
              <br /> improve 
          
            its overall performance and provide a foundation
            basis for sustainable business development.
          </Typography>

          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            If you are looking for a consultant to support you with a new or
            existing Quality 
              <br />Management System, Safety Nett can help.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
                "&:hover": {
                  background: "linear-gradient(90deg, #5a55e0, #2f2cda)",
                },
              }}
            >
              Book Training Course
            </Button>

            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                color: "#6C63FF",
                borderColor: "#6C63FF",
                "&:hover": {
                  backgroundColor: "#f5f3ff",
                  borderColor: "#6C63FF",
                },
              }}
            >
              Get a quote
            </Button>
          </Box>
        </Grid>

        {/* Right Side Image */}
      <Grid item xs={12} md={6}>
  <Box
    component="img"
    src="/ISO9001.svg"
    alt="ISO9001"
    sx={{
      width: "250%",
      maxWidth: 1200,   // increase max size
      height: "auto",
      display: "block",
      mx: "auto",
    }}
  />
</Grid>

      </Grid>
    </Container>
  );
}
