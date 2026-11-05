"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  LinearProgress,
  Stack,
  Chip,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import NextLink from "next/link";
import { SCALE, CLAUSES, bandFor, computeResults } from "./iso14001AssessmentData";
import SelfAssessmentReport from "./SelfAssessmentReport";

const BRAND = "linear-gradient(90deg, #6C63FF, #3F3DFF)";
const BRAND_HOVER = "linear-gradient(90deg, #5a55e0, #2f2cda)";


const COUNTRIES = [
  "United Kingdom", "Ireland", "United States", "Canada", "Australia", "New Zealand", "India", "Pakistan",
  "Bangladesh", "Sri Lanka", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain",
  "Egypt", "South Africa", "Nigeria", "Kenya", "Ghana", "Zimbabwe", "Zambia", "Malawi", "Botswana", "Uganda",
  "Tanzania", "Germany", "France", "Netherlands", "Belgium", "Luxembourg", "Spain", "Portugal", "Italy",
  "Switzerland", "Austria", "Denmark", "Sweden", "Norway", "Finland", "Poland", "Czech Republic", "Slovakia",
  "Hungary", "Romania", "Bulgaria", "Greece", "Turkey", "China", "Hong Kong", "Japan", "South Korea",
  "Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines", "Brazil", "Mexico", "Argentina",
  "Chile", "Colombia", "Peru", "Other",
];

const EMPTY_DETAILS = {
  firstName: "",
  lastName: "",
  email: "",
  country: "United Kingdom",
  phone: "",
  company: "",
  existingClient: "",
};

function validateDetails(d) {
  const e = {};
  if (!d.firstName.trim()) e.firstName = "First name is required";
  if (!d.lastName.trim()) e.lastName = "Last name is required";
  if (!d.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter a valid email address";
  if (!d.country) e.country = "Country is required";
  const digits = d.phone.replace(/\D/g, "");
  if (!d.phone.trim()) e.phone = "Phone number is required";
  else if (!/^[+\d\s()-]+$/.test(d.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = "Enter a valid phone number";
  if (!d.company.trim()) e.company = "Company name is required";
  if (!d.existingClient) e.existingClient = "Please choose Yes or No";
  return e;
}

function ScoreRing({ value, color }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <Box sx={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`Overall readiness ${value}%`}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{value}%</Typography>
        <Typography sx={{ fontSize: 12, color: "#64748b", mt: 0.5 }}>readiness</Typography>
      </Box>
    </Box>
  );
}


export default function ISO14001SelfAssessment() {
  // step: -1 = intro, 0..6 = clause index, 7 = results
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [errors, setErrors] = useState({});
  const [completedAt, setCompletedAt] = useState(null);
  const submitted = useRef(false);

  // Send the completed assessment to SafetyNett once (emailed as an Excel file).
  // Runs in the background so the thank-you page is never held up.
  const submitAssessment = () => {
    if (submitted.current) return;
    submitted.current = true;
    fetch("/api/self-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details, answers }),
      keepalive: true,
    }).catch(() => {});
  };

  const setField = (name) => (e) => {
    const value = e.target.value;
    setDetails((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const startAssessment = (e) => {
    e.preventDefault();
    const found = validateDetails(details);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      go(0);
    } else if (typeof document !== "undefined") {
      const first = document.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
    }
  };

  const downloadReport = () => {
    const previous = document.title;
    const company = details.company.trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    document.title = `SafetyNett-ISO14001-Self-Assessment-${company || "Report"}`;
    window.print();
    document.title = previous;
  };

  const totalQuestions = CLAUSES.reduce((n, c) => n + c.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  // step: -1 = details form, 0..6 = clauses, THANKS = thank-you page, RESULTS = on-screen results
  const THANKS = CLAUSES.length;
  const RESULTS = CLAUSES.length + 1;
  const isThanks = step === THANKS;
  const isResults = step === RESULTS;
  const isComplete = step >= THANKS;
  const clause = step >= 0 && step < THANKS ? CLAUSES[step] : null;
  const clauseComplete = clause ? clause.questions.every((_, i) => answers[`${clause.id}-${i}`] !== undefined) : false;

  const results = useMemo(() => computeResults(answers), [answers]);

  const go = (next) => {
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers({});
    setCompletedAt(null);
    submitted.current = false;
    go(-1);
  };

  const primaryBtn = {
    textTransform: "none",
    borderRadius: "10px",
    px: 3,
    py: 1.2,
    background: BRAND,
    "&:hover": { background: BRAND_HOVER },
  };
  const outlineBtn = {
    textTransform: "none",
    borderRadius: "10px",
    px: 3,
    py: 1.2,
    borderColor: "#6C63FF",
    color: "#3F3DFF",
    "&:hover": { borderColor: "#3F3DFF", backgroundColor: "#f5f3ff" },
  };
  const card = {
    p: { xs: 3, md: 5 },
    borderRadius: "24px",
    border: "1px solid #e2e8f0",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    position: "relative",
    overflow: "hidden",
  };
  const accentBar = (
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: BRAND }} />
  );

  return (
    <Container maxWidth="md" className="sa-container" sx={{ py: 6, minHeight: "70vh" }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }} className="no-print">
        <IconButton component={NextLink} href="/" aria-label="Home" sx={{ color: "#6C63FF", "&:hover": { backgroundColor: "#f5f3ff" } }}>
          <HomeIcon fontSize="small" />
        </IconButton>
        <Button component={NextLink} href="/iso14001" startIcon={<ArrowBackRoundedIcon />} sx={{ textTransform: "none", color: "#6C63FF" }}>
          ISO 14001:2026
        </Button>
      </Stack>

      {/* Intro */}
      {step === -1 && (
        <Paper elevation={0} sx={card}>
          {accentBar}
          <Chip label="Free self-assessment · about 5 minutes" size="small" sx={{ backgroundColor: "#eef2ff", color: "#3F3DFF", fontWeight: 600, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
            Are you ready for ISO 14001:2026?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
            Check how your Environmental Management System (EMS) measures up against the requirements of ISO 14001:2026.
            Answer {totalQuestions} questions across the seven auditable clauses (4 to 10) and get an instant readiness score
            with clause-by-clause findings and recommended next steps.
          </Typography>

          <Typography sx={{ fontWeight: 600, mb: 1.5 }}>How scoring works</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, mb: 3 }}>
            {SCALE.map((s) => (
              <Box key={s.score} sx={{ p: 1.5, borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {s.label} <Box component="span" sx={{ color: "#64748b", fontWeight: 400 }}>· {s.score} pts</Box>
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#64748b" }}>{s.hint}</Typography>
              </Box>
            ))}
          </Box>
          <Typography color="text.secondary" sx={{ fontSize: 14, mb: 4, lineHeight: 1.7 }}>
            Each clause gets a readiness percentage. Your overall score is weighted towards Planning (25%),
            Performance evaluation (20%) and Operation (15%), where most audit findings arise. Your details and results are shared with SafetyNett so a consultant can follow up, and are used to personalise your downloadable report.
          </Typography>
          <Box component="form" noValidate onSubmit={startAssessment}>
            <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Your details</Typography>
            <Typography sx={{ fontSize: 13, color: "#64748b", mb: 2 }}>All fields are required.</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
              <TextField name="firstName" label="First name" required fullWidth autoComplete="given-name"
                value={details.firstName} onChange={setField("firstName")} error={!!errors.firstName} helperText={errors.firstName} />
              <TextField name="lastName" label="Last name" required fullWidth autoComplete="family-name"
                value={details.lastName} onChange={setField("lastName")} error={!!errors.lastName} helperText={errors.lastName} />
              <TextField name="email" label="Email" type="email" required fullWidth autoComplete="email"
                value={details.email} onChange={setField("email")} error={!!errors.email} helperText={errors.email} />
              <TextField name="country" label="Country" select required fullWidth autoComplete="country-name"
                value={details.country} onChange={setField("country")} error={!!errors.country} helperText={errors.country}>
                {COUNTRIES.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
              <TextField name="phone" label="Phone number" type="tel" required fullWidth autoComplete="tel"
                placeholder="+44 7700 900123"
                value={details.phone} onChange={setField("phone")} error={!!errors.phone} helperText={errors.phone} />
              <TextField name="company" label="Company name" required fullWidth autoComplete="organization"
                value={details.company} onChange={setField("company")} error={!!errors.company} helperText={errors.company} />
              <TextField name="existingClient" label="Already a SafetyNett client?" select required fullWidth
                value={details.existingClient} onChange={setField("existingClient")}
                error={!!errors.existingClient} helperText={errors.existingClient}
                sx={{ gridColumn: { sm: "1 / 2" } }}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Box>
            <Button type="submit" variant="contained" endIcon={<ArrowForwardRoundedIcon />} sx={primaryBtn}>
              Start the assessment
            </Button>
          </Box>
        </Paper>
      )}

      {/* Clause steps */}
      {clause && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 14, color: "#64748b" }}>
                Section {step + 1} of {CLAUSES.length}
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#64748b" }}>
                {answeredCount}/{totalQuestions} answered
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(answeredCount / totalQuestions) * 100}
              sx={{ height: 8, borderRadius: 4, backgroundColor: "#e2e8f0", "& .MuiLinearProgress-bar": { background: BRAND, borderRadius: 4 } }}
            />
          </Box>

          <Paper elevation={0} sx={card}>
            {accentBar}
            <Typography sx={{ color: "#6C63FF", fontWeight: 600, fontSize: 14, mb: 0.5 }}>Clause {clause.number}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {clause.title}
            </Typography>

            <Stack spacing={4}>
              {clause.questions.map((q, i) => {
                const key = `${clause.id}-${i}`;
                return (
                  <Box key={key} role="radiogroup" aria-labelledby={`${key}-label`}>
                    <Typography id={`${key}-label`} sx={{ fontWeight: 500, mb: 1.5, lineHeight: 1.6 }}>
                      {i + 1}. {q}
                    </Typography>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.25 }}>
                      {SCALE.map((s) => {
                        const selected = answers[key] === s.score;
                        return (
                          <Box
                            key={s.score}
                            component="button"
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setAnswers((a) => ({ ...a, [key]: s.score }))}
                            sx={{
                              textAlign: "left",
                              cursor: "pointer",
                              font: "inherit",
                              p: 1.5,
                              borderRadius: "12px",
                              border: selected ? "2px solid #6C63FF" : "1px solid #e2e8f0",
                              m: selected ? 0 : "1px",
                              backgroundColor: selected ? "#f5f3ff" : "#fff",
                              transition: "all 0.15s ease",
                              "&:hover": { borderColor: "#6C63FF" },
                              "&:focus-visible": { outline: "2px solid #3F3DFF", outlineOffset: 2 },
                            }}
                          >
                            <Typography sx={{ fontWeight: 600, fontSize: 14, color: selected ? "#3F3DFF" : "#0f172a" }}>{s.label}</Typography>
                            <Typography sx={{ fontSize: 13, color: "#64748b" }}>{s.hint}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Stack>

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
              <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={() => go(step - 1)} sx={outlineBtn}>
                Back
              </Button>
              <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} disabled={!clauseComplete} onClick={() => {
                  if (step === CLAUSES.length - 1) {
                    setCompletedAt(new Date());
                    submitAssessment();
                  }
                  go(step + 1);
                }} sx={primaryBtn}>
                {step === CLAUSES.length - 1 ? "Finish" : "Next"}
              </Button>
            </Stack>
          </Paper>
        </Box>
      )}

      {/* Printable report (hidden on screen) */}
      {isComplete && (
        <SelfAssessmentReport details={details} results={results} answers={answers} completedAt={completedAt} />
      )}

      {/* Thank-you page */}
      {isThanks && (
        <Paper elevation={0} sx={{ ...card, textAlign: "center" }} className="no-print">
          {accentBar}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              mx: "auto",
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: BRAND,
              boxShadow: "0 10px 30px rgba(108, 99, 255, 0.35)",
            }}
          >
            <CheckCircleRoundedIcon sx={{ color: "#fff", fontSize: 40 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Thank you, {details.firstName}!
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: "auto", mb: 2, lineHeight: 1.7 }}>
            You have completed the ISO 14001:2026 self-assessment. Based on your answers, your overall readiness level is
          </Typography>
          <Chip
            label={`${results.band.name} · ${results.overall}%`}
            sx={{ backgroundColor: results.band.bg, color: results.band.color, fontWeight: 700, fontSize: 16, px: 1.5, py: 2.5, mb: 3 }}
          />
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: "auto", mb: 4, lineHeight: 1.7 }}>
            Download your detailed report to see your score for each clause, what auditors will look for, and the
            recommended next steps for {details.company || "your organisation"}.
          </Typography>
          <Button variant="contained" size="large" startIcon={<DownloadRoundedIcon />} onClick={downloadReport} sx={{ ...primaryBtn, px: 5, py: 1.5, fontSize: 16 }}>
            Download now
          </Button>
          <Typography sx={{ fontSize: 13, color: "#94a3b8", mt: 1.5 }}>
            In the print window, choose &ldquo;Save as PDF&rdquo; as the destination.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="center" sx={{ mt: 3 }}>
            <Button onClick={() => go(RESULTS)} sx={{ textTransform: "none", color: "#3F3DFF" }}>
              View my results online
            </Button>
            <Button component={NextLink} href="/contact" sx={{ textTransform: "none", color: "#3F3DFF" }}>
              Talk to a consultant
            </Button>
            <Button startIcon={<RestartAltRoundedIcon />} onClick={restart} sx={{ textTransform: "none", color: "#64748b" }}>
              Start again
            </Button>
          </Stack>
        </Paper>
      )}

      {/* Results */}
      {isResults && (
        <Stack spacing={4} className="no-print">
          <Paper elevation={0} sx={card}>
            {accentBar}
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
              <Box>
                <Typography sx={{ color: "#6C63FF", fontWeight: 600, fontSize: 14 }}>Your ISO 14001:2026 readiness</Typography>
                <Typography sx={{ fontSize: 14, color: "#64748b" }}>
                  {details.firstName} {details.lastName} · {details.company}
                </Typography>
              </Box>
              <Button variant="contained" startIcon={<DownloadRoundedIcon />} onClick={downloadReport} sx={primaryBtn}>
                Download report (PDF)
              </Button>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ mt: 2 }}>
              <ScoreRing value={results.overall} color={results.band.color} />
              <Box>
                <Chip label={results.band.name} sx={{ backgroundColor: results.band.bg, color: results.band.color, fontWeight: 700, mb: 1.5 }} />
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {results.band.text}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={card}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Clause-by-clause findings
            </Typography>
            <Stack spacing={2.5}>
              {results.perClause.map((c) => {
                const b = bandFor(c.pct);
                return (
                  <Box key={c.id}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                      <Typography sx={{ fontWeight: 500, fontSize: 15 }}>
                        Clause {c.number}: {c.title}
                        <Box component="span" sx={{ color: "#94a3b8", fontSize: 13, ml: 1 }}>weight {c.weight}%</Box>
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: b.color }}>{c.pct}%</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={c.pct}
                      sx={{ height: 8, borderRadius: 4, backgroundColor: "#e2e8f0", "& .MuiLinearProgress-bar": { backgroundColor: b.color, borderRadius: 4 } }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Paper>

          <Paper elevation={0} sx={card}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recommended next steps
            </Typography>
            {results.perClause.filter((c) => c.pct < 100).length === 0 ? (
              <Typography color="text.secondary">You reported every requirement as fully in place. An independent gap analysis will confirm you have the evidence an auditor expects.</Typography>
            ) : (
              <Stack spacing={2}>
                {[...results.perClause]
                  .filter((c) => c.pct < 100)
                  .sort((a, b) => a.pct - b.pct)
                  .map((c) => (
                    <Stack key={c.id} direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleRoundedIcon sx={{ color: bandFor(c.pct).color, mt: 0.25, fontSize: 20 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                          Clause {c.number}: {c.title} ({c.pct}%)
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.6 }}>
                          {c.advice}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
              </Stack>
            )}
          </Paper>

          <Paper elevation={0} sx={{ ...card, textAlign: "center" }} className="no-print">
            {accentBar}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Need help closing the gaps?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 560, mx: "auto", lineHeight: 1.7 }}>
              SafetyNett consultants can carry out a full gap analysis, implement or transition your EMS to ISO 14001:2026,
              and support you through certification.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
              <Button variant="contained" component={NextLink} href="/contact" sx={primaryBtn}>
                Get a quote
              </Button>
              <Button variant="outlined" component={NextLink} href="/iso14001" sx={outlineBtn}>
                View ISO 14001 document kit
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
              <Button startIcon={<PrintOutlinedIcon />} onClick={downloadReport} sx={{ textTransform: "none", color: "#64748b" }}>
                Print report
              </Button>
              <Button startIcon={<RestartAltRoundedIcon />} onClick={restart} sx={{ textTransform: "none", color: "#64748b" }}>
                Start again
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )}
    </Container>
  );
}
