import ExcelJS from "exceljs";
import { CLAUSES, SCALE, computeResults } from "./iso14001AssessmentData";

const PURPLE = "FF3F3DFF";
const LIGHT = "FFF1F2FB";

const scaleLabel = (score) => SCALE.find((x) => x.score === score)?.label ?? "Not answered";

function styleHeader(row) {
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: PURPLE } };
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  row.height = 22;
}

// Builds an .xlsx workbook for one completed ISO 14001:2026 self-assessment.
// Returns { buffer, results } – scores are recalculated here from the raw answers.
export async function buildSelfAssessmentWorkbook({ details, answers, completedAt }) {
  const results = computeResults(answers);
  const date = completedAt ? new Date(completedAt) : new Date();

  const wb = new ExcelJS.Workbook();
  wb.creator = "SafetyNett";
  wb.created = date;

  // ---- Sheet 1: one row per assessment (easy to copy into a master list) ----
  const summary = wb.addWorksheet("Submission", { views: [{ state: "frozen", ySplit: 1 }] });
  summary.columns = [
    { header: "Completed", key: "completed", width: 20 },
    { header: "First name", key: "firstName", width: 16 },
    { header: "Last name", key: "lastName", width: 16 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Country", key: "country", width: 18 },
    { header: "Company", key: "company", width: 26 },
    { header: "Existing SafetyNett client", key: "existingClient", width: 14 },
    { header: "Overall score (%)", key: "overall", width: 12 },
    { header: "Readiness level", key: "band", width: 18 },
    ...results.perClause.map((c) => ({ header: `Clause ${c.number} ${c.title} (%)`, key: c.id, width: 16 })),
  ];
  summary.addRow({
    completed: date,
    ...details,
    overall: results.overall,
    band: results.band.name,
    ...Object.fromEntries(results.perClause.map((c) => [c.id, c.pct])),
  });
  styleHeader(summary.getRow(1));
  summary.getRow(1).height = 48;
  summary.getCell("A2").numFmt = "dd/mm/yyyy hh:mm";

  // ---- Sheet 2: clause scores ----
  const clauses = wb.addWorksheet("Clause scores");
  clauses.columns = [
    { header: "Clause", key: "clause", width: 10 },
    { header: "Title", key: "title", width: 30 },
    { header: "Weight (%)", key: "weight", width: 12 },
    { header: "Score (%)", key: "pct", width: 12 },
    { header: "Readiness level", key: "level", width: 18 },
  ];
  results.perClause.forEach((c) => {
    const level = c.pct >= 75 ? "Well positioned" : c.pct >= 40 ? "Developing" : "At risk";
    clauses.addRow({ clause: c.number, title: c.title, weight: c.weight, pct: c.pct, level });
  });
  const totalRow = clauses.addRow({ clause: "", title: "Overall (weighted)", weight: 100, pct: results.overall, level: results.band.name });
  totalRow.font = { bold: true };
  totalRow.eachCell((cell) => (cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } }));
  styleHeader(clauses.getRow(1));

  // ---- Sheet 3: every question and answer ----
  const responses = wb.addWorksheet("Responses", { views: [{ state: "frozen", ySplit: 1 }] });
  responses.columns = [
    { header: "Clause", key: "clause", width: 10 },
    { header: "Clause title", key: "title", width: 26 },
    { header: "Question", key: "question", width: 80 },
    { header: "Answer", key: "answer", width: 16 },
    { header: "Points (0–3)", key: "points", width: 12 },
  ];
  CLAUSES.forEach((c) => {
    c.questions.forEach((q, i) => {
      const score = answers[`${c.id}-${i}`];
      const row = responses.addRow({ clause: c.number, title: c.title, question: q, answer: scaleLabel(score), points: score ?? 0 });
      row.getCell("question").alignment = { wrapText: true, vertical: "top" };
      row.alignment = { vertical: "top" };
    });
  });
  styleHeader(responses.getRow(1));

  const buffer = Buffer.from(await wb.xlsx.writeBuffer());
  return { buffer, results };
}
