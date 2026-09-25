"use client";

import React from "react";
import NextLink from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import { contactEmails, postalAddress, products } from "./seo";

const linkSx = {
  transition: "color 0.3s ease",
  "&:hover": { color: "#FDA410" },
};

const standards = [
  { label: "ISO 9001 Quality", href: "/iso9001" },
  { label: "ISO 14001 Environmental", href: "/iso14001" },
  { label: "ISO 45001 Health & Safety", href: "/iso45001" },
  { label: "ISO 50001 Energy", href: "/iso50001" },
  { label: "ISO 27001 Information Security", href: "/iso27001" },
  { label: "ISO 14068 Climate Change", href: "/iso14068" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        pt: 15,
        pb: 8,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} columnSpacing={8} alignItems="flex-start">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Box
                component="img"
                src="/logo.png"
                alt="SafetyNett Logo"
                sx={{ width: 160, mb: 1 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              © 2026 SafetyNett
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.secondary">
              PRODUCTS
            </Typography>
            <Stack spacing={1}>
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  color="text.secondary"
                  sx={linkSx}
                >
                  {product.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.secondary">
              ISO STANDARDS
            </Typography>
            <Stack spacing={1}>
              {standards.map((item) => (
                <Link
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  underline="none"
                  color="text.secondary"
                  sx={linkSx}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.secondary">
              CONTACT
            </Typography>
            <Stack spacing={1}>
              <Link component={NextLink} href="/contact" underline="none" color="text.secondary" sx={linkSx}>
                Contact page
              </Link>
              <Link href={`mailto:${contactEmails.direct}`} underline="none" color="text.secondary" sx={linkSx}>
                {contactEmails.direct}
              </Link>
              <Link href={`mailto:${contactEmails.enquiries}`} underline="none" color="text.secondary" sx={linkSx}>
                {contactEmails.enquiries}
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", pt: 0.5 }}>
            All Rights Reserved.
          </Typography>
          <Box sx={{ maxWidth: { xs: "100%", sm: 680 }, textAlign: { xs: "left", sm: "right" } }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.825rem", lineHeight: 1.5 }}>
              {postalAddress.streetAddress},<br /> {postalAddress.addressLocality}, {postalAddress.addressRegion}, {postalAddress.postalCode}.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
