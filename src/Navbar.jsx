"use client";

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
import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { products } from "./seo";

const services = [
  { label: "ISO9001: 2015 Quality Management", route: "/iso9001" },
  { label: "ISO14001: 2015 Environmental Management", route: "/iso14001" },
  { label: "ISO45001: 2018 Occupational Health & Safety", route: "/iso45001" },
  { label: "ISO50001: 2018 Energy Management", route: "/iso50001" },
  { label: "ISO27001: 2022 Information Security Management", route: "/iso27001" },
  { label: "ISO14068: 2023 Climate Change Management", route: "/iso14068" },
];

const quoteButtonSx = {
  textTransform: "none",
  borderRadius: "10px",
  px: 3,
  py: 1,
  fontWeight: 500,
  background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
  "&:hover": {
    background: "linear-gradient(90deg, #5a55e0, #2f2cda)",
  },
};

export default function Navbar() {
  const router = useRouter();
  const navigate = (path) => router.push(path);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsAnchor, setProductsAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const onServices = pathname.startsWith("/iso");
  const onContact = pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
    setAnchorEl(null);
    setProductsAnchor(null);
  };

  const drawer = (
    <Box sx={{ width: 280, bgcolor: "#1a1d23", height: "100%", color: "white", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "white" }} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding sx={{ mb: 2 }}>
          <Button fullWidth component={NextLink} href="/contact" variant="contained" onClick={() => setMobileOpen(false)} sx={quoteButtonSx}>
            Get a Quote
          </Button>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => setServicesOpen((open) => !open)}
          sx={{ cursor: "pointer", flexDirection: "column", alignItems: "flex-start" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", py: 1, px: 1 }}>
            <Typography sx={{ fontWeight: 500, color: onServices ? "white" : "inherit" }}>Services</Typography>
            <Typography>{servicesOpen ? "-" : "+"}</Typography>
          </Box>
          <Collapse in={servicesOpen} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
            <List component="div" disablePadding>
              {services.map((service) => (
                <ListItemButton
                  key={service.route}
                  onClick={() => go(service.route)}
                  sx={{ pl: 3 }}
                >
                  <ListItemText
                    primary={service.label}
                    primaryTypographyProps={{ fontSize: 13, color: pathname === service.route ? "#fff" : "#ccc" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </ListItem>

        {products.map((product) => (
          <ListItem key={product.href} disablePadding>
            <ListItemButton
              component="a"
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary={product.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton onClick={() => go("/contact")} selected={onContact}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <AppBar position="sticky" sx={{ backgroundColor: "#0d1117", boxShadow: "none", px: 2 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component="img"
              src="/Logo1.png"
              alt="SafetyNett"
              onClick={() => navigate("/")}
              sx={{ height: 24, cursor: "pointer" }}
            />
            <IconButton color="inherit" aria-label="Open menu" edge="start" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { backgroundColor: "#1a1d23" } }}
          >
            {drawer}
          </Drawer>
        </AppBar>
      ) : (
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            px: { xs: 2, lg: 15 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#0d1117",
              zIndex: -1,
              overflow: "hidden",
            }}
          >
            {!isScrolled && isHomePage && (
              <Box sx={{ position: "absolute", inset: 0, opacity: 1 }}>
                <DotGrid
                  dotSize={5}
                  gap={15}
                  baseColor="#271E37"
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

          <Toolbar sx={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1, gap: 3 }}>
            <Box
              component="img"
              src="/Logo1.png"
              alt="SafetyNett"
              onClick={() => navigate("/")}
              sx={{ height: 28, cursor: "pointer" }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Typography
                variant="body2"
                aria-controls="services-menu"
                aria-haspopup="true"
                onMouseEnter={(event) => {
                  setProductsAnchor(null);
                  setAnchorEl(event.currentTarget);
                }}
                sx={{
                  color: Boolean(anchorEl) || onServices ? "white" : "gray",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": { color: "white" },
                }}
              >
                Services
              </Typography>

              <Menu
                id="services-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  onMouseLeave: () => setAnchorEl(null),
                  sx: { px: 1 },
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 280,
                    backgroundColor: "#1a1d23",
                    color: "white",
                  },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                {services.map((service) => (
                  <MenuItem
                    key={service.route}
                    onClick={() => go(service.route)}
                    selected={pathname === service.route}
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      py: 1.2,
                      borderRadius: 1,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                    }}
                  >
                    {service.label}
                  </MenuItem>
                ))}
              </Menu>

              <Typography
                variant="body2"
                aria-controls="products-menu"
                aria-haspopup="true"
                onMouseEnter={(event) => {
                  setAnchorEl(null);
                  setProductsAnchor(event.currentTarget);
                }}
                sx={{
                  color: productsAnchor ? "white" : "gray",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": { color: "white" },
                }}
              >
                Products
              </Typography>

              <Menu
                id="products-menu"
                anchorEl={productsAnchor}
                open={Boolean(productsAnchor)}
                onClose={() => setProductsAnchor(null)}
                MenuListProps={{
                  onMouseLeave: () => setProductsAnchor(null),
                  sx: { px: 1 },
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 220,
                    backgroundColor: "#1a1d23",
                    color: "white",
                  },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                {products.map((product) => (
                  <MenuItem
                    key={product.href}
                    component="a"
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProductsAnchor(null)}
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      py: 1.2,
                      borderRadius: 1,
                      color: "inherit",
                      textDecoration: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                    }}
                  >
                    {product.name}
                  </MenuItem>
                ))}
              </Menu>

              <Typography
                component={NextLink}
                href="/contact"
                variant="body2"
                sx={{
                  color: onContact ? "white" : "gray",
                  cursor: "pointer",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": { color: "white" },
                }}
              >
                Contact
              </Typography>
            </Box>

            <Button component={NextLink} href="/contact" variant="contained" sx={quoteButtonSx}>
              Get a Quote
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
