import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const services = [
    { label: "ISO9001: 2015 Quality Management", route: "/iso9001" },
    { label: "ISO14001: 2015 Environmental Management", route: "/iso14001" },
    { label: "ISO45001: 2018 Occupational Health & Safety", route: "/iso45001" },
    { label: "ISO50001: 2018 Energy Management", route: "/iso50001" },
    { label: "ISO27001: 2022 Information Security Management", route: "/iso27001" },
    { label: "ISO14068: 2023 Climate Change Management", route: "/iso14068" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0d1117", // dark background
          boxShadow: "none",
          px: 15,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component="img"
            src="/Logo1.png"
            alt="Logo"
            onClick={() => navigate("/")} // 👈 navigate to home
            sx={{ height: 28, cursor: "pointer" }}
          />

          {/* Right Menu */}
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

      {/* Secondary Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0d1117",
          boxShadow: "none",
          top: "64px", // below first navbar
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* Services with dropdown */}
          <Typography
            variant="body2"
            aria-controls="services-menu"
            aria-haspopup="true"
            onMouseEnter={handleOpen}
            sx={{
              color: Boolean(anchorEl) ? "white" : "gray",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              "&:hover": { color: "white" },
            }}
          >
            Services
           
          </Typography>


          <Menu
            id="services-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
              sx: {
                px: 1,
              },
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 260,
                backgroundColor: "#1a1d23", // dark theme
                color: "white",
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {services.map((service) => (
              <MenuItem
                key={service.route}
                onClick={() => {
                  navigate(service.route);
                  handleClose();
                }}
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  py: 1.2,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                {service.label}
              </MenuItem>
            ))}
          </Menu>


          {/* Other Nav Links */}
          {[
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
