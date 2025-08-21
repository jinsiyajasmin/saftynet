import React from "react";
import { AppBar, Toolbar, Box, Button, Typography, IconButton } from "@mui/material";

export default function Navbar() {
  return (
    <>
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0d1117", // dark background
        boxShadow: "none",
        px: 15
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        {/* Logo */}
        <Box
          component="img"
          src="/Logo1.png"
          alt="Logo"
          sx={{ height: 28, cursor: "pointer" }}
        />

        {/* Menu Items */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: "grey", cursor: "pointer", "&:hover": { color: "white" } }}
          >
            iAudit Global
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "grey", cursor: "pointer", "&:hover": { color: "white" } }}
          >
            Search
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1,
              fontWeight: 500,
              background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
              "&:hover": {
                background: "linear-gradient(90deg, #5a55e0, #2f2cda)",
              },
            }}
          >
            Get a Quote
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

     <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0d1117",
          boxShadow: "none",
          top: "64px", // pushes it below first AppBar
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {[
            "Services",
            "ISO Management System",
            "NettForm App",
            "Competent Person & SSIP",
            "Audits & Inspections",
            "Training",
            "Resources",
            "About Us",
          ].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                color: "gray",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { color: "white" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
</>
  );
}
