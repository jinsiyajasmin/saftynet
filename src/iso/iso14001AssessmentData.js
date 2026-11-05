// Shared data for the ISO 14001:2026 self-assessment (screens and report).

// Four-point maturity scale used for every question.
export const SCALE = [
  { score: 3, label: "Fully in place", hint: "Defined, documented, implemented and reviewed" },
  { score: 2, label: "Partly in place", hint: "Exists, but with gaps in coverage, records or review" },
  { score: 1, label: "In progress", hint: "Being developed, not yet implemented" },
  { score: 0, label: "Not started", hint: "Not yet addressed" },
];

// Seven auditable clauses. Weights add up to 100 and favour the clauses
// that generate the most audit findings (6 Planning, 8 Operation, 9 Performance evaluation).
export const CLAUSES = [
  {
    id: "c4",
    number: 4,
    title: "Context of the organisation",
    weight: 10,
    questions: [
      "Have you identified the internal and external issues that affect your EMS, including environmental conditions such as climate change, pollution and biodiversity loss, and do you review them regularly?",
      "Is the scope of your EMS defined and documented, covering its boundaries, sites and activities, and taking a life cycle perspective into account?",
    ],
    advice:
      "Run a context review (e.g. PESTLE/SWOT including climate and biodiversity conditions) and document a clear EMS scope statement with site and activity boundaries.",
  },
  {
    id: "c5",
    number: 5,
    title: "Leadership",
    weight: 10,
    questions: [
      "Can top management show that it is accountable for the EMS: integrating it into business processes, supporting the people involved and driving continual improvement?",
      "Do you have an environmental policy with commitments to protecting the environment, meeting compliance obligations and continual improvement, communicated to staff and available to interested parties?",
    ],
    advice:
      "Put EMS performance on the leadership agenda, assign clear roles and authorities, and publish an environmental policy containing all of the required commitments.",
  },
  {
    id: "c6",
    number: 6,
    title: "Planning",
    weight: 25,
    questions: [
      "Have you identified the environmental aspects of your activities, products and services (including life cycle stages and emergency situations), their impacts, and which of them are significant?",
      "Have you identified your legal and other compliance obligations, worked out how they apply to you and built them into the EMS?",
      "Do you have measurable environmental objectives with planned actions, owners, timescales and a way of evaluating results?",
      "Do you plan and control changes that affect the EMS so that it keeps working as intended while they are introduced?",
    ],
    advice:
      "Build an aspects & impacts register with significance criteria, a compliance obligations register, SMART objectives with action plans, and a simple change-management procedure.",
  },
  {
    id: "c7",
    number: 7,
    title: "Support",
    weight: 10,
    questions: [
      "Have you defined the competence needed by people whose work affects environmental performance, and do you keep evidence that they meet it?",
      "Is the documented information required by the standard controlled, kept up to date and accessible to those who need it?",
    ],
    advice:
      "Create a competence matrix with training records, and introduce document control (versioning, approval and access) for EMS documents and records.",
  },
  {
    id: "c8",
    number: 8,
    title: "Operation",
    weight: 15,
    questions: [
      "Do you control processes that could affect the environment, including outsourced processes, products and services, using defined operating criteria?",
      "Do you have documented emergency preparedness and response plans that are tested and reviewed periodically?",
    ],
    advice:
      "Set operational controls for significant aspects, extend controls to contractors and suppliers, and test emergency response plans through drills with recorded reviews.",
  },
  {
    id: "c9",
    number: 9,
    title: "Performance evaluation",
    weight: 20,
    questions: [
      "Do you monitor and measure environmental performance using defined methods, and analyse and evaluate the results?",
      "Do you carry out planned internal audits and management reviews of the EMS, with documented outputs?",
    ],
    advice:
      "Define KPIs and monitoring methods, evaluate compliance, and run a scheduled internal audit programme followed by a minuted management review.",
  },
  {
    id: "c10",
    number: 10,
    title: "Improvement",
    weight: 10,
    questions: [
      "Do you identify and manage nonconformities, find their root causes and take corrective action?",
      "Do you check that corrective actions were effective, and keep records of nonconformities, actions and outcomes?",
    ],
    advice:
      "Introduce a nonconformity & corrective action log with root-cause analysis and a follow-up check that each action actually worked.",
  },
];

export const BANDS = [
  {
    min: 75,
    name: "Well positioned",
    color: "#16a34a",
    bg: "#f0fdf4",
    text: "Your EMS looks well aligned with ISO 14001:2026. Focus on closing the remaining gaps and gathering evidence before your certification or transition audit.",
  },
  {
    min: 40,
    name: "Developing",
    color: "#d97706",
    bg: "#fffbeb",
    text: "Good foundations are in place, but there are gaps an auditor is likely to raise. A structured gap analysis and targeted documentation will get you audit-ready.",
  },
  {
    min: 0,
    name: "At risk",
    color: "#dc2626",
    bg: "#fef2f2",
    text: "Significant parts of the EMS are not yet in place. Starting with a clear implementation plan will help you build a compliant system efficiently.",
  },
];

export const bandFor = (pct) => BANDS.find((b) => pct >= b.min);

// Scores every clause (0–100%) and the weighted overall score from an answers map
// of the form { "c4-0": 3, "c4-1": 2, ... }. Unanswered questions count as 0.
export function computeResults(answers) {
  const perClause = CLAUSES.map((c) => {
    const max = c.questions.length * 3;
    const got = c.questions.reduce((s, _, i) => s + (answers[`${c.id}-${i}`] ?? 0), 0);
    return { ...c, pct: Math.round((got / max) * 100) };
  });
  const overall = Math.round(perClause.reduce((s, c) => s + (c.pct * c.weight) / 100, 0));
  return { perClause, overall, band: bandFor(overall) };
}
