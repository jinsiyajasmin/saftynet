"use client";

import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function DocumentPackageSection({
  standardCode = "ISO 9001:2026",
  standardName = "Quality Management",
  code = "D101",
  price = "£499",
  deliverables = [
    "Complete Management System Manual (editable MS Word)",
    "Mandatory Standard Operating Procedures (SOPs) & Exhibits",
    "Ready-to-use Forms, Templates & Registers (MS Word & Excel)",
    "Comprehensive Internal Audit Checklists with detailed questions",
    "Process Flowcharts, Job Descriptions & Policy templates",
    "100% customizable for your organization with immediate delivery",
  ],
}) {
  const router = useRouter();
  const packageName = `${standardCode} Documentation Kit`;

  return (
    <Box sx={{ mt: 8, mb: 10 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent top bar */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
          }}
        />

        <Grid container spacing={4} alignItems="center">
          {/* Left Column: Details & Deliverables */}
          <Grid item xs={12} md={7}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Chip
                icon={<DescriptionOutlinedIcon sx={{ fontSize: "16px !important" }} />}
                label={`Product Code: ${code}`}
                size="small"
                sx={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                icon={<VerifiedOutlinedIcon sx={{ fontSize: "16px !important" }} />}
                label="Ready to Use & Editable"
                size="small"
                sx={{
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
            </Stack>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 1.5,
                fontSize: { xs: "1.6rem", md: "2.1rem" },
                color: "#0f172a",
              }}
            >
              {standardCode} Complete Document Package
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6, maxWidth: 600 }}
            >
              Accelerate your {standardName} certification with our professionally built, ready-to-use
              documentation toolkit. Built by experienced ISO auditors to save you months of preparation time.
            </Typography>

            {/* Deliverables List */}
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#334155", mb: 1 }}>
              What&apos;s Included in this Kit:
            </Typography>
            <Grid container spacing={1}>
              {deliverables.map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ py: 0.5 }}>
                    <CheckCircleRoundedIcon
                      sx={{ fontSize: 18, color: "#10b981", mt: "2px", flexShrink: 0 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.4 }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Column: Pricing Box & CTA */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "20px",
                border: "1.5px solid #e0e7ff",
                backgroundColor: "#ffffff",
                boxShadow: "0 8px 24px rgba(108, 99, 255, 0.08)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#6C63FF",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  display: "block",
                  mb: 1,
                }}
              >
                Document Package Price
              </Typography>

              <Typography
                variant="h3"
                fontWeight="800"
                sx={{
                  color: "#0f172a",
                  mb: 0.5,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                }}
              >
                {price}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                One-time purchase • Full editable toolkit
              </Typography>

              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  component={NextLink}
                  href={`/contact?package=${encodeURIComponent(`${packageName} (${price})`)}`}
                  startIcon={<ShoppingCartOutlinedIcon />}
                  sx={{
                    py: 1.4,
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
                    boxShadow: "0 4px 14px rgba(108, 99, 255, 0.35)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #5a55e0, #2f2cda)",
                    },
                  }}
                >
                  Order / Enquire Package
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  component={NextLink}
                  href="/contact"
                  sx={{
                    py: 1.2,
                    borderRadius: "12px",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    color: "#475569",
                    borderColor: "#cbd5e1",
                    "&:hover": {
                      borderColor: "#6C63FF",
                      color: "#6C63FF",
                      backgroundColor: "#f5f3ff",
                    },
                  }}
                >
                  Need Consultancy Support Instead?
                </Button>
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ mt: 2.5, color: "#64748b" }}
              >
                <LockResetOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                  Instant digital handover upon confirmation
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
