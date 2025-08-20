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
        <Box sx={{ py: 8, px: 4 }}>
            {/* Section Heading */}
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                ISO Management System
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    color: "text.secondary",
                    textAlign: "center",
                    maxWidth: 700,
                    mx: "auto",
                    mb: 6,
                }}
            >
                We provide ISO management system solutions to help businesses achieve
                compliance, efficiency, and excellence in quality, environment, safety,
                energy, security, and climate management.
            </Typography>

            {/* Cards */}
            <Grid container spacing={4} justifyContent="center">
                {isoData.map((item, index) => (
                    <Grid item xs={12} sm={10} md={8} key={index}>
                        <Card
                            sx={{
                                borderRadius: "20px",
                                border: "1px solid #d1d5db", // thin gray border
                                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                                width: 560,
                                mx: "auto",
                                p: 4,
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                transition: "all 0.4s ease",
                                overflow: "hidden", // hides extra points until hover
                                maxHeight: 250, // collapsed height
                                "&:hover": {
                                    maxHeight: 600, // expanded height
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

                            <Stack direction="row" alignItems="flex-start" spacing={3}>
                                {/* Text Content */}
                                <CardContent sx={{ flex: 1, p: 0 }}>
                                    <Typography
                                        className="titleText"
                                        gutterBottom
                                        sx={{
                                            fontFamily:
                                                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                                            fontWeight: 500,
                                            fontSize: "1.5rem",
                                            lineHeight: 1.2,
                                            transition: "color 0.3s ease",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        mb={2}
                                        sx={{
                                            fontFamily:
                                                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                                            fontWeight: 400,
                                            fontSize: "0.875rem",
                                            lineHeight: 1.57,
                                            color: "text.secondary",
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>

                                    {/* Hidden points that show on hover */}
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
                                            transition: "all 0.4s ease",
                                            "&:hover": {
                                                backgroundColor: "#6C63FF",
                                                color: "#fff",
                                                // Removed scale here so card zooms instead
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
                                        width: 120,
                                        height: 120,
                                        objectFit: "contain",
                                        mt: 1,
                                    }}
                                />
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
