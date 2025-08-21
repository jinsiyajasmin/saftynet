import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import { Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        pt: 15, // increased top padding
        pb: 8,  // increased bottom padding
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          columnSpacing={20} // extra horizontal space
          alignItems="flex-start"
        >
          {/* Logo + Copyright */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Box
                component="img"
                src="/logo.png"
                alt="SafetyNett Logo"
                sx={{ width: 160, mb: 1 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              © 2025 SafetyNett
            </Typography>
          </Grid>

          {/* Menu */}
          <Grid item xs={6} sm={3} md={3}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              color="text.secondary"
            >
              MENU
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="none" color="text.secondary"sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}>
                Services
              </Link>
              <Link href="#" underline="none" color="text.secondary"sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}>
                Solutions
              </Link>
              <Link href="#" underline="none" color="text.secondary"sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}>
                Company
              </Link>
            </Stack>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} sm={3} md={3}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              color="text.secondary"
            >
              LEGAL
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="none" color="text.secondary"sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}>
                Terms & Conditions
              </Link>
              <Link href="#" underline="none" color="text.secondary"sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}>
                License
              </Link>
              <Link href="#" underline="none" color="text.secondary"sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}>
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Social */}
          <Grid item xs={6} sm={3} md={3}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              gutterBottom
              color="text.secondary"
            >
              SOCIAL
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Instagram fontSize="small" sx={{ color: "#FDA410" }} />
                <Link
                  href="https://instagram.com"
                  underline="none"
                  color="text.secondary"
                  sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}
                >
                  Instagram
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LinkedIn fontSize="small" sx={{ color: "#FDA410" }} />
                <Link
                  href="https://linkedin.com"
                  underline="none"
                  color="text.secondary"
                  sx={{ transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#FDA410",// blue from theme (or use "#3b82f6")
                      },}}
                >
                  LinkedIn
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider + Bottom Text */}
        <Divider sx={{ mt: 6, mb: 2 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{ fontSize: "0.875rem" }}
        >
          All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
