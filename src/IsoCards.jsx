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
} from "@mui/material";
import { motion } from "framer-motion";

const isoData = [
    {
        title: "ISO9001: 2015 Quality Management",
        subtitle: "International Standard for Quality Management Systems",
        image: "/ISO9001.svg",
        points: [
            "Quality Assurance",
            "Process Improvement",
            "Customer Satisfaction",
            "Continuous Improvement",
        ],
    },
    {
        title: "ISO14001: 2015 Environmental Management",
        subtitle: "International Standard for Environmental Management System",
        image: "/ISO14001.svg",
        points: [
            "Environmental Policy",
            "Sustainability",
            "Pollution Prevention",
            "Compliance",
        ],
    },
    {
        title: "ISO45001: 2018 Occupational Health & Safety",
        subtitle: "International Standard for OH&S Management System",
        image: "/ISO45001.svg",
        points: ["Hazard Control", "Risk Management", "Worker Safety", "Compliance"],
    },
    {
        title: "ISO50001: 2018 Energy Management",
        subtitle: "International Standard for Energy Management System",
        image: "/ISO5001.svg",
        points: [
            "Energy Efficiency",
            "Cost Reduction",
            "Sustainability",
            "Performance Monitoring",
        ],
    },
    {
        title: "ISO27001: 2022 Information Security Management",
        subtitle: "International Standard for Information Security Management System",
        image: "/ISO27001.svg",
        points: ["Risk Assessment", "Data Protection", "Access Control", "Cybersecurity"],
    },
    {
        title: "ISO14068: 2023 Climate Change Management",
        subtitle:
            "International Standard for Climate Change Management – Transition to net zero.",
        image: "/ISO14068.svg",
        points: ["Carbon Neutrality", "Sustainability Goals", "Climate Action", "Compliance"],
    },
];

export default function IsoCards() {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
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
                    We provide ISO management system solutions to help businesses achieve
                    compliance, efficiency, and excellence in quality, environment, safety,
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
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: "20px",
                                    border: "1px solid #d1d5db",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                    width: "100%",
                                    maxWidth: 560,
                                    mx: "auto",
                                    p: { xs: 2, md: 4 },
                                    textAlign: "left",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    transition: "all 0.4s ease",
                                    overflow: "hidden",
                                    maxHeight: 250,
                                    "&:hover": {
                                        maxHeight: 600,
                                        transform: "scale(1.03)",
                                        borderColor: "#6C63FF",
                                    },
                                    "&:hover .titleText": {
                                        color: "#0D47A1",
                                    },
                                    "&:hover .extraPoints": {
                                        display: "block",
                                    },
                                }}
                            >
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    alignItems="flex-start"
                                    spacing={3}
                                >
                                    {/* Text Content */}
                                    <CardContent sx={{ flex: 1, p: 0 }}>
                                        <Typography
                                            className="titleText"
                                            gutterBottom
                                            sx={{
                                                fontFamily:
                                                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                                fontWeight: 500,
                                                fontSize: { xs: "1.2rem", md: "1.5rem" },
                                                lineHeight: 1.3,
                                                transition: "color 0.3s ease",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography
                                            mb={2}
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: { xs: "0.8rem", md: "0.9rem" },
                                                lineHeight: 1.57,
                                                color: "text.secondary",
                                            }}
                                        >
                                            {item.subtitle}
                                        </Typography>

                                        {/* Hidden points */}
                                        <List
                                            className="extraPoints"
                                            sx={{
                                                pl: 2,
                                                mb: 2,
                                                display: "none",
                                                listStyleType: "disc",
                                                "& .MuiListItem-root": {
                                                    display: "list-item",
                                                    listStyleType: "disc",
                                                    pl: 1,
                                                },
                                            }}
                                        >
                                            {item.points.map((point, i) => (
                                                <ListItem key={i} sx={{ py: 0.3 }}>
                                                    <ListItemText
                                                        primary={point}
                                                        primaryTypographyProps={{
                                                            variant: "body2",
                                                            sx: { fontFamily: "Inter, sans-serif" },
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>

                                        <Button
                                            variant="outlined"
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: "10px",
                                                px: 3,
                                                py: 1,
                                                color: "#6C63FF",
                                                borderColor: "#6C63FF",
                                                "&:hover": {
                                                    backgroundColor: "#6C63FF",
                                                    color: "#fff",
                                                },
                                            }}
                                        >
                                            Learn More
                                        </Button>
                                    </CardContent>

                                    {/* Image */}
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.title}
                                        sx={{
                                            width: { xs: 80, sm: 100, md: 120 },
                                            height: { xs: 80, sm: 100, md: 120 },
                                            objectFit: "contain",
                                            mt: { xs: 2, sm: 1 },
                                            mx: { xs: "auto", sm: 0 },
                                        }}
                                    />
                                </Stack>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
