import React from "react";
import { Box, Typography, Container } from "@mui/material";

const companies = [
  { name: "Google", logo: "/fujitec.png" },
  { name: "Microsoft", logo: "/Deltron.png" },
  { name: "Amazon", logo: "/Construct_Lifts.png" },
  { name: "Netflix", logo: "/Adstone.png" },
  { name: "Apple", logo: "/Ardo_Lifts.png" },
];

export default function CompaniesSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f9fafb" }}>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 2, fontFamily: "Inter, sans-serif" }}
        >
          Trusted by Leading Companies
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 6,
            maxWidth: "600px",
            mx: "auto",
            fontFamily: "Inter, sans-serif",
          }}
        >
          SafetyNet is proud to be working with global leaders across industries
          to deliver trusted and reliable safety solutions.
        </Typography>

        {/* Scrolling logos */}
        <Box
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          <Box
            className="scrolling-logos"
            sx={{
              display: "inline-flex",
              animation: "scroll 30s linear infinite",
            }}
          >
            {/* Duplicate logos for seamless loop */}
            {[...companies, ...companies].map((company, index) => (
              <Box
                key={index}
                component="img"
                src={company.logo}
                alt={company.name}
                sx={{
                  height: 60,
                  mx: 6,
                  filter: "grayscale(100%)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  );
}
