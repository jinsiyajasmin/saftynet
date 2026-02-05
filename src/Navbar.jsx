import React, { useState, useEffect } from "react";
import DotGrid from "./DotGrid";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // For mobile services dropdown
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down more than 10px, consider it scrolled/sticky
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileServicesToggle = () => {
    setServicesOpen(!servicesOpen);
  };

  const services = [
    { label: "ISO9001: 2015 Quality Management", route: "/iso9001" },
    { label: "ISO14001: 2015 Environmental Management", route: "/iso14001" },
    { label: "ISO45001: 2018 Occupational Health & Safety", route: "/iso45001" },
    { label: "ISO50001: 2018 Energy Management", route: "/iso50001" },
    { label: "ISO27001: 2022 Information Security Management", route: "/iso27001" },
    { label: "ISO14068: 2023 Climate Change Management", route: "/iso14068" },
  ];

  const navLinks = [
    "ISO Management System",
    "NettForm App",
    "Competent Person & SSIP",
    "Audits & Inspections",
    "Training",
    "Resources",
    "About Us",
  ];

  // Mobile Drawer Content
  const drawer = (
    <Box sx={{ width: 280, bgcolor: "#1a1d23", height: "100%", color: "white", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding sx={{ mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              navigate("/quote"); // Assuming route, adjust if needed
              handleDrawerToggle();
            }}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
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
        </ListItem>

        {/* Services Dropdown in Mobile */}
        <ListItem disablePadding onClick={handleMobileServicesToggle} sx={{ cursor: "pointer", flexDirection: "column", alignItems: "flex-start" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', py: 1, px: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>Services</Typography>
            <Typography>{servicesOpen ? "-" : "+"}</Typography>
          </Box>
          <Collapse in={servicesOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
            <List component="div" disablePadding>
              {services.map((service) => (
                <ListItem key={service.route} button onClick={() => { navigate(service.route); handleDrawerToggle(); }} sx={{ pl: 3 }}>
                  <ListItemText primary={service.label} primaryTypographyProps={{ fontSize: 13, color: '#ccc' }} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </ListItem>

        {navLinks.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { navigate(`/${text.toLowerCase().replace(/ /g, '-')}`); handleDrawerToggle(); }}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={() => { handleDrawerToggle(); }}>
            <ListItemText primary="iAudit Global" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { handleDrawerToggle(); }}>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Navbar */}
      {isMobile ? (
        <AppBar position="sticky" sx={{ backgroundColor: "#0d1117", boxShadow: "none", px: 2 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component="img"
              src="/Logo1.png"
              alt="Logo"
              onClick={() => navigate("/")}
              sx={{ height: 24, cursor: "pointer" }}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": { backgroundColor: "#1a1d23" }
            }}
          >
            {drawer}
          </Drawer>
        </AppBar>
      ) : (
        /* Desktop Navbar */
        <>
          {/* Top Navbar */}
          <AppBar
            position="sticky"
            sx={{
              backgroundColor: "transparent", // Managed by Box below
              boxShadow: "none",
              px: { xs: 2, lg: 15 }, // Responsive padding
            }}
          >
            {/* 🟦 Background Container (Handles Color + DotGrid) */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#0d1117",
                zIndex: -1,
                overflow: "hidden"
              }}
            >
              {/* DotGrid only when NOT scrolled AND on Home Page */}
              {!isScrolled && isHomePage && (
                <Box sx={{ position: "absolute", inset: 0, opacity: 1 }}>
                  <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor={isScrolled ? "transparent" : "#271E37"}
                    activeColor="#5227FF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </Box>
              )}
            </Box>

            <Toolbar sx={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
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
              backgroundColor: "transparent", // Managed by Box below
              boxShadow: "none",
              top: "64px", // below first navbar
            }}
          >
            {/* 🟦 Background Container (Handles Color + DotGrid) */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#0d1117",
                zIndex: -1,
                overflow: "hidden"
              }}
            >
              {/* DotGrid only when NOT scrolled AND on Home Page */}
              {!isScrolled && isHomePage && (
                <Box sx={{ position: "absolute", inset: 0, opacity: 1 }}>
                  <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor={isScrolled ? "transparent" : "#271E37"}
                    activeColor="#5227FF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                  />
                </Box>
              )}
            </Box>

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
              {navLinks.map((item) => (
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
      )}
    </>
  );
}
