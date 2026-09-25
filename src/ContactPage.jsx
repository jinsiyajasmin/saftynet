"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { contactEmails, postalAddress } from "./seo";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setError(result.error || "We could not send your message. Please try again.");
        return;
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("We could not send your message. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Grid container spacing={4} alignItems="stretch">
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="overline" sx={{ color: "#6C63FF", fontWeight: 600, letterSpacing: 1.2 }}>
            Contact
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ mt: 1, mb: 2, fontSize: { xs: "2rem", md: "2.6rem" } }}>
            Talk to SafetyNett
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, maxWidth: 460 }}>
            Ask about ISO consultancy, a quotation, or support for an existing management system. Email us and we will reply.
          </Typography>

          <Stack spacing={2}>
            <EmailCard label="Email" email={contactEmails.direct} />
            <Box
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "0.5px solid #e5e7eb",
                backgroundColor: "#f9fafb",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                Office
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {postalAddress.streetAddress}
                <br />
                {postalAddress.addressLocality}, {postalAddress.addressRegion}, {postalAddress.postalCode}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            component="form"
            onSubmit={sendEmail}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "20px",
              border: "0.5px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight="semibold" sx={{ mb: 3 }}>
              Send a message
            </Typography>
            <Stack spacing={2.5}>
              <TextField
                required
                name="name"
                label="Name"
                value={form.name}
                onChange={update}
                fullWidth
                sx={fieldSx}
              />
              <TextField
                required
                type="email"
                name="email"
                label="Your email"
                value={form.email}
                onChange={update}
                fullWidth
                sx={fieldSx}
              />
              <TextField
                required
                name="message"
                label="How can we help?"
                value={form.message}
                onChange={update}
                fullWidth
                multiline
                minRows={5}
                sx={fieldSx}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={status === "sending"}
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  background: "linear-gradient(90deg, #6C63FF, #3F3DFF)",
                  "&:hover": { background: "linear-gradient(90deg, #5a55e0, #2f2cda)" },
                }}
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
              {status === "sent" && (
                <Typography variant="body2" sx={{ color: "#166534" }}>
                  Thank you. Your message has been sent and we will reply to your email.
                </Typography>
              )}
              {status === "error" && (
                <Typography variant="body2" sx={{ color: "#b91c1c" }}>
                  {error}
                </Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

function EmailCard({ label, email }) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "0.5px solid #e5e7eb",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Typography
        component="a"
        href={`mailto:${email}`}
        sx={{ color: "#6C63FF", textDecoration: "none", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}
      >
        {email}
      </Typography>
    </Box>
  );
}
