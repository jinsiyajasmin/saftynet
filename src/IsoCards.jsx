"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const isoData = [
  {
    title: "ISO9001: 2026 Quality Management",
    subtitle: "International Standard for Quality Management Systems",
    image: "/ISO9001.svg",
    route: "/iso9001",
    points: [
      "Quality Assurance",
      "Process Improvement",
      "Customer Satisfaction",
      "Continuous Improvement",
    ],
    docPackage: {
      name: "ISO 9001:2026 Documentation Kit",
      price: "£499",
      summary: "Manual, Procedures, Audit Checklists & Templates",
    },
  },
  {
    title: "ISO14001: 2026 Environmental Management",
    subtitle: "International Standard for Environmental Management System",
    image: "/ISO14001.svg",
    route: "/iso14001",
    points: ["Environmental Policy", "Sustainability", "Pollution Prevention", "Compliance"],
    docPackage: {
      name: "ISO 14001:2026 Documentation Kit",
      price: "£499",
      summary: "Manual, Procedures, EMS Audit Checklists & SOPs",
    },
  },
  {
    title: "ISO45001: 2018 Occupational Health & Safety",
    subtitle: "International Standard for OH&S Management System",
    image: "/ISO45001.svg",
    route: "/iso45001",
    points: ["Hazard Control", "Risk Management", "Worker Safety", "Compliance"],
    docPackage: {
      name: "ISO 45001:2018 Documentation Kit",
      price: "£399",
      summary: "OH&S Manual, Procedures, Forms & Audit Checklists",
    },
  },
  {
    title: "ISO50001: 2018 Energy Management",
    subtitle: "International Standard for Energy Management System",
    image: "/ISO5001.svg",
    route: "/iso50001",
    points: ["Energy Efficiency", "Cost Reduction", "Sustainability", "Performance Monitoring"],
    docPackage: {
      name: "ISO 50001:2018 Documentation Kit",
      price: "£449",
      summary: "Energy Manual, Procedures, Forms & Audit Checklists",
    },
  },
  {
    title: "ISO27001: 2022 Information Security Management",
    subtitle: "International Standard for Information Security Management System",
    image: "/ISO27001.svg",
    route: "/iso27001",
    points: ["Risk Assessment", "Data Protection", "Access Control", "Cybersecurity"],
    docPackage: {
      name: "ISO 27001:2022 Documentation Kit",
      price: "£499",
      summary: "ISMS Manual, 20+ Procedures, Risk Templates & Checklist",
    },
  },
  {
    title: "ISO14068: 2023 Climate Change Management",
    subtitle: "International Standard for Climate Change Management – Transition to net zero.",
    image: "/ISO14068.svg",
    route: "/iso14068",
    points: ["Carbon Neutrality", "Sustainability Goals", "Climate Action", "Compliance"],
    docPackage: {
      name: "ISO 14068:2023 Documentation Kit",
      price: "£499",
      summary: "Net Zero Manual, Transition Plans, Metrics & Templates",
    },
  },
];

export default function IsoCards() {
  const router = useRouter();
  const navigate = (path) => router.push(path);

  return (
    <Box id="iso-standards" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 }, scrollMarginTop: "96px" }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          ISO Management System
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            fontWeight: 400,
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.6,
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 750,
            mx: "auto",
            mb: { xs: 4, md: 6 },
          }}
        >
          We provide full ISO consultancy and ready-to-use editable document packages to help
          businesses achieve certification and operational excellence in quality, environment, safety,
          energy, security, and climate management.
        </Typography>
      </motion.div>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        {isoData.map((item, index) => (
          <Grid item xs={12} sm={10} md={6} lg={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  width: "100%",
                  maxWidth: 560,
                  mx: "auto",
                  p: { xs: 2.5, md: 3.5 },
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "#6C63FF",
                    boxShadow: "0 12px 28px rgba(108, 99, 255, 0.12)",
                  },
                  "&:hover .titleText": {
                    color: "#0D47A1",
                  },
                }}
              >
                <Box>
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        className="titleText"
                        gutterBottom
                        sx={{
                          fontFamily:
                            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                          fontWeight: 600,
                          fontSize: { xs: "1.15rem", md: "1.3rem" },
                          lineHeight: 1.3,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                          color: "text.secondary",
                          mb: 2,
                        }}
                      >
                        {item.subtitle}
                      </Typography>
                    </Box>

                    {/* Image */}
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: { xs: 65, sm: 75 },
                        height: { xs: 65, sm: 75 },
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />
                  </Stack>

                  {/* Key Highlights */}
                  <List sx={{ pl: 0, py: 0, mb: 2.5 }}>
                    {item.points.slice(0, 3).map((point, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.2 }}>
                        <CheckCircleOutlineIcon
                          sx={{ fontSize: 16, color: "#10b981", mr: 1, flexShrink: 0 }}
                        />
                        <ListItemText
                          primary={point}
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: { fontSize: "0.82rem", color: "#475569" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* Document Package Cardlet */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      mb: 2.5,
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 0.8 }}
                    >
                      <Stack direction="row" spacing={0.8} alignItems="center">
                        <DescriptionOutlinedIcon sx={{ fontSize: 18, color: "#6C63FF" }} />
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: "#6C63FF",
                            letterSpacing: 0.5,
                            textTransform: "uppercase",
                          }}
                        >
                          Document Package
                        </Typography>
                      </Stack>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#0f172a",
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.docPackage.price}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.8rem",
                        color: "#64748b",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.docPackage.summary}
                    </Typography>
                  </Box>
                </Box>

                {/* Buttons */}
                <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(item.route)}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      py: 1,
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#6C63FF",
                      borderColor: "#cbd5e1",
                      "&:hover": {
                        borderColor: "#6C63FF",
                        backgroundColor: "#f5f3ff",
                      },
                    }}
                  >
                    Consultancy Details
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      navigate(
                        `/contact?package=${encodeURIComponent(
                          `${item.docPackage.name} (${item.docPackage.price})`
                        )}`
                      )
                    }
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      py: 1,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
                      boxShadow: "0 4px 12px rgba(108, 99, 255, 0.25)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #5a55e0, #2f2cda)",
                      },
                    }}
                  >
                    Get Package
                  </Button>
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
