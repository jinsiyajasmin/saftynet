import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HomeIcon from "@mui/icons-material/Home"; // ✅ Added Home Icon
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom"; // ✅ For navigation
import { useEffect } from "react";

// Custom Icons
function CustomDoubleArrowIcon(props) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 256 256"
      sx={{ fontSize: "1em", color: "inherit", ...props.sx }}
    >
      <path d="M58.34,101.66l-32-32a8,8,0,0,1,0-11.32l32-32A8,8,0,0,1,69.66,37.66L43.31,64,69.66,90.34a8,8,0,0,1-11.32,11.32Zm40,0a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0,0-11.32l-32-32A8,8,0,0,0,98.34,37.66L124.69,64,98.34,90.34A8,8,0,0,0,98.34,101.66ZM200,40H176a8,8,0,0,0,0,16h24V200H56V136a8,8,0,0,0-16,0v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Z"></path>
    </SvgIcon>
  );
}

function CustomChatIcon(props) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 256 256"
      sx={{ fontSize: "1em", color: "inherit", ...props.sx }}
    >
      <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path>
    </SvgIcon>
  );
}

function CustomGridIcon(props) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 256 256"
      sx={{ fontSize: "1em", color: "inherit", ...props.sx }}
    >
      <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" />
    </SvgIcon>
  );
}

export default function ISO9001Page() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>

        {/* ✅ Home Button at the top */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            color: "#6C63FF",
            mb: 4,
            "&:hover": { backgroundColor: "#f5f3ff" },
          }}
        >
          <HomeIcon fontSize="small" />
        </IconButton>

        <Grid container spacing={6} alignItems="center">
          {/* Left Side Text */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                mb: 4,
                fontFamily: "Inter, sans-serif",
              }}
            >
              ISO9001: 2015 QUALITY MANAGEMENT
            </Typography>

            <Typography variant="h4" fontWeight="semibold" sx={{
              mb: 3, lineHeight: 1.3, transition: "color 0.3s ease", // smooth color transition
              "&:hover": {
                color: "#0D47A1",// blue from theme (or use "#3b82f6")
              },
            }}>
              International Standard for Quality
              <br />
              Management Systems
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="thin"
              sx={{
                mb: 3, lineHeight: 1.7, transition: "color 0.3s ease", // smooth color transition
                "&:hover": {
                  color: "#0D47A1",// blue from theme (or use "#3b82f6")
                },
              }}
            >
              The implementation of a QMS is a strategic decision that helps an
              organisation
              <br /> improve its overall performance and provide a foundation
              basis for sustainable  <br />business development.
            </Typography>

            <Typography variant="body1" fontWeight="bold" sx={{
              mb: 4, transition: "color 0.3s ease", // smooth color transition
              "&:hover": {
                color: "#0D47A1",// blue from theme (or use "#3b82f6")
              },
            }}>
              If you are looking for a consultant to support you with a new or
              existing Quality
              <br /> Management System, Safety Nett can help.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #5a55e0, #2f2cda)",
                  },
                }}
              >
                Book Training Course
              </Button>

              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  color: "#6C63FF",
                  borderColor: "#6C63FF",
                  "&:hover": {
                    backgroundColor: "#f5f3ff",
                    borderColor: "#6C63FF",
                  },
                }}
              >
                Get a quote
              </Button>
            </Box>
          </Grid>

          {/* Right Side Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/ISO9001.svg"
              alt="ISO9001"
              sx={{
                width: "250%",
                maxWidth: 1200,
                height: "auto",
                display: "block",
                mx: "auto",
                transition: "transform 0.5s ease", // smooth animation
                "&:hover": {
                  transform: "scale(1.05)", // zoom in effect
                },
              }}
            />
          </Grid>

        </Grid>

        {/* FAQ + Guides Section */}
        <Container maxWidth="lg" disableGutters sx={{ py: 10 }}>
          <Grid container spacing={4}>
            {/* Left Column (Accordions) */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={1}
                sx={{
                  borderRadius: "20px",
                  border: "0.5px solid #d1d5db",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  mb: 3,
                  maxWidth: "800px",   // ✅ reduces width
                  mx: "auto",
                  transition: "border-color 0.3s ease", // smooth transition
                  "&:hover": {
                    borderColor: "#6C63FF",
                  },
                }}
              >
                <Accordion defaultExpanded elevation={0} sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="semibold" sx={{
                      transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#0D47A1",// blue from theme (or use "#3b82f6")
                      },
                    }}>
                      What is ISO9001?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      fontWeight="thin"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      • ISO 9001 is an international standard for quality management
                      systems (QMS) that outlines the requirements organisations must adhere
                      to enhance customer satisfaction and ensure consistent quality in
                      products and services. <br /> • It helps organisations of all sizes
                      and sectors improve their performance, meet customer expectations, and
                      demonstrate their commitment to quality.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>

              <Paper
                elevation={1}
                sx={{
                  borderRadius: "20px",
                  border: "0.5px solid #d1d5db",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  maxWidth: "800px",   // ✅ reduces width
                  mx: "auto",
                  transition: "border-color 0.3s ease", // smooth transition
                  "&:hover": {
                    borderColor: "#6C63FF",
                  },
                }}
              >
                <Accordion defaultExpanded elevation={0} sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="semibold" sx={{
                      transition: "color 0.3s ease", // smooth color transition
                      "&:hover": {
                        color: "#0D47A1",// blue from theme (or use "#3b82f6")
                      },
                    }}>
                      Why is ISO9001 important?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      fontWeight="thin"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      Customer Confidence: By adhering to ISO 9001, organisations establish and maintain
                      strong quality control processes. This commitment to quality enhances customer trust
                      and satisfaction, fostering stronger relationships and repeat business.
                      Effective Complaint Resolution:  ISO 9001 offers structured guidance for efficiently addressing and
                      resolving customer complaints. This systematic approach not only promotes timely solutions but also
                      improves overall customer satisfaction by demonstrating that the organisation values feedback.
                      Process Improvement: The standard assists organisations in identifying and eliminating inefficiencies
                      in their operations. By reducing waste and streamlining processes, ISO 9001 promotes informed
                      decision-making, ultimately leading to substantial cost savings and enhanced business outcomes.
                      Ongoing Optimization: With regular audits and reviews mandated by ISO 9001, organisations are
                      encouraged to continually refine and enhance their quality management systems. This commitment
                      to ongoing improvement helps companies remain competitive in the marketplace and achieve long-term
                      success by adapting to changing customer needs and industry trends.

                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>

            {/* Right Column (Guides & Checklists Card) */}
            <Grid item xs={12} md={4} sx={{ display: "flex" }} >
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  border: "0.5px solid #d1d5db",
                  backgroundColor: "#f3f4f6",
                  width: "100%",
                  transition: "border-color 0.3s ease", // smooth transition
                  "&:hover": {
                    borderColor: "#6C63FF",
                  },
                }}
              >
                {/* Badge */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    backgroundColor: "#f0edff",
                    color: "#6C63FF",
                    fontSize: "14px",
                    fontWeight: 500,
                    mb: 4,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />
                  Guides & Checklists
                </Box>

                {/* Title */}
                <Typography variant="h6" fontWeight="semibold" sx={{ mb: 4 }}>
                  Quality Management
                  <br />
                  Guides & Checklists
                </Typography>

                {/* List of items */}
                <List sx={{ p: 0 }} >
                  <ListItem disableGutters >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomDoubleArrowIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText color="text.secondary" primary={
                      <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
                        ISO9001: 2015 FAQs
                      </Typography>
                    }
                    />

                  </ListItem>

                  <ListItem disableGutters >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomDoubleArrowIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
                          IMS Annex SL Comparison <br /> Tool
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disableGutters >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomDoubleArrowIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
                          ISO9001: 2015 Gap Analysis <br /> Tool
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disableGutters >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomChatIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
                          Quality Management Training
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disableGutters >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomDoubleArrowIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
                          ISO9001: 2015 Implementation <br /> Guide
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomChatIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
                          Safety Nett Quality <br />
                          Management Consultancy <br />
                          Services
                        </Typography>
                      }
                    />
                  </ListItem>

                </List>
              </Paper>
            </Grid>
          </Grid>
          {/* Business Benefits Card */}
          <Container maxWidth="lg" disableGutters sx={{ mt: 6 }}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                borderRadius: "20px",
                backgroundColor: "#f9fafb",
                border: "0.5px solid #e5e7eb",
                transition: "border-color 0.3s ease", // smooth transition
                "&:hover": {
                  borderColor: "#6C63FF",
                },
              }}
            >
              {/* Badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 2,
                  py: 0.5,
                  borderRadius: "12px",
                  backgroundColor: "#f0edff",
                  color: "#6C63FF",
                  fontSize: "14px",
                  fontWeight: 500,
                  mb: 3,
                }}
              >
                <CustomGridIcon sx={{ fontSize: 18, mr: 1 }} />
                Business benefits
              </Box>

              {/* Benefits List in Two Columns */}
              <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                  <List sx={{ px: 3 }}>
                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Enhanced Customer Trust and Satisfaction
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Cost Savings and Productivity Gains
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Enhanced Employee Engagement
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Streamlined Regulatory Compliance
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Facilitated International Trade
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Sustainable Growth
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                  <List sx={{ p: 0 }}>
                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Sound Quality Control Processes
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Enhanced Organisational Resilience
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Improved Risk Management
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            Enhanced Market Position
                          </Typography>
                        }
                      />
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CustomGridIcon fontSize="small" />

                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body" color="text.secondary" sx={{ m: 0, p: 0 }}>
                            A Framework for Collaboration
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Container>

        </Container>
      </Container>
    </>
  );
}
