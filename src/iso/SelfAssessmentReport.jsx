"use client";

import React from "react";
import { CLAUSES, SCALE, bandFor } from "./iso14001AssessmentData";
import { companyWebsite, contactEmails, postalAddress, products } from "../seo";

// Printable ISO 14001:2026 self-assessment report.
// Hidden on screen (.print-only) and laid out for A4 by the print styles in app/globals.css:
// a full-bleed cover page, content pages with a repeating SafetyNett header/footer, and a back page.

const CLAUSE_REPORT = {
  c4: {
    measures:
      "Whether you understand the internal and external issues that shape your environmental management system, including environmental conditions such as climate change and biodiversity, and whether the scope of the EMS is clearly defined and documented.",
    steps: {
      high: "Re-confirm your scope statement and context review are current, and record when they were last reviewed.",
      mid: "Complete and document your context review, and make sure the scope statement covers all sites, activities and life cycle stages.",
      low: "Hold a context workshop (e.g. PESTLE / SWOT including climate and biodiversity) and write a formal EMS scope statement.",
    },
  },
  c5: {
    measures:
      "Whether top management takes real ownership of the EMS: building it into business processes, assigning roles and responsibilities, and setting an environmental policy with the commitments the standard requires.",
    steps: {
      high: "Keep evidence of leadership involvement (meeting minutes, decisions, resources) ready for the auditor.",
      mid: "Formalise roles and authorities, and make sure the environmental policy is communicated to staff and available to interested parties.",
      low: "Agree an environmental policy with top management, assign EMS responsibilities and put EMS performance on the leadership agenda.",
    },
  },
  c6: {
    measures:
      "One of the most closely audited areas: your environmental aspects and impacts, compliance obligations, measurable objectives and how changes to the EMS are planned. The 2026 revision puts more emphasis on life cycle thinking and controlled change.",
    steps: {
      high: "Check that your aspects register, compliance register and objectives reflect current operations and recent regulatory changes.",
      mid: "Close the gaps in your aspects and compliance registers, add targets and owners to objectives, and introduce a simple change procedure.",
      low: "Build an aspects and impacts register with significance criteria, a compliance obligations register, SMART objectives and a change-management procedure.",
    },
  },
  c7: {
    measures:
      "Whether the EMS has what it needs to keep working: competent people with evidence of that competence, awareness and communication, and documented information that is controlled and accessible.",
    steps: {
      high: "Sample your training records and document index to confirm they are current and match practice.",
      mid: "Complete a competence matrix with training evidence and tighten version control and access for EMS documents.",
      low: "Define competence requirements for key roles and set up document control (approval, versioning and access).",
    },
  },
  c8: {
    measures:
      "Whether processes that affect the environment, including outsourced processes and suppliers, are controlled against defined criteria, and whether emergency preparedness and response plans are documented, tested and reviewed.",
    steps: {
      high: "Make sure operational controls extend to contractors and suppliers, and keep records of recent emergency drills.",
      mid: "Set operating criteria for every significant aspect, extend controls to external providers and test your emergency plans.",
      low: "Introduce operational control procedures for significant aspects and write emergency response plans, then test them.",
    },
  },
  c9: {
    measures:
      "Whether you monitor, measure, analyse and evaluate environmental performance and compliance, carry out internal audits to a planned programme and hold management reviews with documented outputs.",
    steps: {
      high: "Confirm the audit programme covers all clauses and sites, and that management review outputs are tracked to completion.",
      mid: "Define KPIs and monitoring methods, complete a full internal audit cycle and minute a management review.",
      low: "Set up performance monitoring, plan an internal audit programme and schedule your first management review.",
    },
  },
  c10: {
    measures:
      "Whether nonconformities are identified and managed, root causes are found, corrective actions are taken and their effectiveness is checked, with records kept throughout.",
    steps: {
      high: "Review a sample of closed actions to confirm effectiveness was verified and recorded.",
      mid: "Add root-cause analysis and an effectiveness check to every corrective action, and keep the log up to date.",
      low: "Introduce a nonconformity and corrective action log with root-cause analysis and follow-up checks.",
    },
  },
};

const CLAUSE_BAND_TEXT = {
  high: "Your answers show that the requirements of this clause are largely in place. Before your audit, make sure the supporting records are current and that what is documented matches how work is actually done.",
  mid: "Some requirements of this clause are in place, but there are gaps in coverage, documentation or review. These are typical sources of minor nonconformities at audit and are usually quick to close with focused effort.",
  low: "Most requirements of this clause are not yet in place. This area is likely to produce significant audit findings and should be a priority in your implementation plan.",
};

const OVERALL_NEXT_STEP = {
  high: "Review any lower-scoring clauses, check that your evidence supports your answers, and close remaining gaps before booking your certification audit.",
  mid: "Commission a gap analysis to turn the findings below into a prioritised action plan, starting with the lowest-scoring and most heavily weighted clauses.",
  low: "Start with a structured implementation plan covering policy, aspects, compliance obligations and operational control, then build towards internal audit and management review.",
};

const levelKey = (pct) => (pct >= 75 ? "high" : pct >= 40 ? "mid" : "low");

const NAVY = "#0f1032";
const PURPLE = "#6C63FF";
const PURPLE_DARK = "#3F3DFF";
const ORANGE = "#FDA410";

function Donut({ value, size = 150, stroke = 22, color = PURPLE, track = "#e5e7f5", label = true, textColor = NAVY }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {label && (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={size * 0.2} fontWeight="800" fill={textColor}>
          {value}%
        </text>
      )}
    </svg>
  );
}

function Radar({ clauses }) {
  const size = 440;
  const cx = size / 2;
  const cy = size / 2 + 6;
  const R = 150;
  const n = clauses.length;
  const point = (i, pct) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + Math.cos(a) * R * (pct / 100), cy + Math.sin(a) * R * (pct / 100)];
  };
  const ring = (pct) => clauses.map((_, i) => point(i, pct).join(",")).join(" ");
  const shape = clauses.map((c, i) => point(i, c.pct).join(",")).join(" ");

  return (
    <svg width="100%" viewBox={`-70 0 ${size + 140} ${size}`} style={{ maxWidth: 520 }} role="img" aria-label="Readiness by clause">
      {[20, 40, 60, 80, 100].map((p) => (
        <polygon key={p} points={ring(p)} fill="none" stroke="#dfe1ee" strokeWidth="1" />
      ))}
      {clauses.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#dfe1ee" strokeWidth="1" />;
      })}
      {[20, 40, 60, 80].map((p) => (
        <text key={p} x={cx + 4} y={cy - (R * p) / 100 + 4} fontSize="10" fill="#94a3b8">
          {p}
        </text>
      ))}
      <polygon points={shape} fill="rgba(108, 99, 255, 0.18)" stroke={PURPLE} strokeWidth="2.5" strokeLinejoin="round" />
      {clauses.map((c, i) => {
        const [x, y] = point(i, c.pct);
        const [lx, ly] = point(i, 122);
        const anchor = Math.abs(lx - cx) < 10 ? "middle" : lx > cx ? "start" : "end";
        return (
          <g key={c.id}>
            <circle cx={x} cy={y} r="5" fill={bandFor(c.pct).color} stroke="#fff" strokeWidth="1.5" />
            <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="central" fontSize="13" fontWeight="600" fill={NAVY}>
              Clause {c.number}
            </text>
            <text x={lx} y={ly + 15} textAnchor={anchor} dominantBaseline="central" fontSize="12" fontWeight="700" fill={bandFor(c.pct).color}>
              {c.pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SelfAssessmentReport({ details, results, answers, completedAt }) {
  const date = (completedAt || new Date()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const site = companyWebsite;
  const name = `${details.firstName} ${details.lastName}`.trim();
  const scaleLabel = (score) => SCALE.find((x) => x.score === score)?.label ?? "Not answered";
  const overallKey = levelKey(results.overall);

  const strongest = results.perClause.reduce((best, c) => (c.pct > best.pct ? c : best));
  const priority = results.perClause.reduce((worst, c) =>
    c.pct < worst.pct || (c.pct === worst.pct && c.weight > worst.weight) ? c : worst
  );

  return (
    <div className="print-only sa-report">
      {/* ---------- Cover ---------- */}
      <section className="sa-cover">
        <div className="sa-cover-shape sa-cover-shape-1" />
        <div className="sa-cover-shape sa-cover-shape-2" />
        <div className="sa-cover-shape sa-cover-shape-3" />

        <div className="sa-cover-inner">
          <img src="/logo.png" alt="SafetyNett Consultancy" className="sa-cover-logo" />
          <div className="sa-cover-kicker">ISO 14001:2026</div>
          <div className="sa-cover-rule" />
          <h1 className="sa-cover-title">
            Your Self-Assessment
            <br />
            Report
          </h1>
          <p className="sa-cover-prepared">
            Prepared for <strong>{name}</strong>
            {details.company ? (
              <>
                {" "}of <strong>{details.company}</strong>
              </>
            ) : null}{" "}
            on <strong>{date}</strong>
          </p>

          <div className="sa-cover-card">
            <div className="sa-cover-card-score">
              <Donut value={results.overall} size={110} stroke={16} color={results.band.color} />
            </div>
            <div>
              <div className="sa-cover-card-label">Overall readiness</div>
              <div className="sa-cover-card-band" style={{ color: results.band.color }}>
                {results.band.name}
              </div>
              <table className="sa-cover-details">
                <tbody>
                  <tr><th>Email</th><td>{details.email}</td></tr>
                  <tr><th>Phone</th><td>{details.phone}</td></tr>
                  <tr><th>Country</th><td>{details.country}</td></tr>
                  <tr><th>SafetyNett client</th><td>{details.existingClient}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sa-cover-foot">Simplifying ISO management systems</div>
      </section>

      {/* ---------- Content pages ---------- */}
      <table className="sa-report-table">
        <thead>
          <tr>
            <td>
              <div className="sa-report-head">
                <img src="/logo.png" alt="SafetyNett" className="sa-report-logo" />
                <div className="sa-report-head-text">
                  <div className="sa-report-title">Self Assessment</div>
                  <div className="sa-report-sub">ISO 14001:2026 Readiness Report</div>
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td>
              <div className="sa-report-foot">
                SafetyNett Consultancy · {contactEmails.direct} · {site}
              </div>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>
              {/* Introduction */}
              <section className="sa-block">
                <h2 className="sa-h2">Introduction</h2>
                <p>
                  This report sets out the results of your ISO 14001:2026 readiness self-assessment. Each answer was scored on a
                  four-point scale (Fully in place, Partly in place, In progress, Not started) and combined into a readiness
                  percentage for each of the seven auditable clauses, plus a weighted overall score.
                </p>
                <p>
                  Planning (clause 6, 25%), Performance evaluation (clause 9, 20%) and Operation (clause 8, 15%) carry the most
                  weight because they produce the most findings at audit. The results reflect your own view of your EMS at the
                  time you completed the assessment; they are not an audit finding or a guarantee of certification.
                </p>

                <div className="sa-overall sa-keep">
                  <Donut value={results.overall} size={170} stroke={26} color={results.band.color} />
                </div>

                <div className="sa-panel sa-keep">
                  <div className="sa-panel-title">Overall readiness level: {results.band.name}</div>
                  <p>{results.band.text}</p>
                  <p>
                    <strong>Recommended next step:</strong> {OVERALL_NEXT_STEP[overallKey]}
                  </p>
                </div>

                <div className="sa-split sa-keep">
                  <div>
                    <div className="sa-split-title">Strongest area</div>
                    <div>
                      Clause {strongest.number}: {strongest.title} – {strongest.pct}%
                    </div>
                  </div>
                  <div>
                    <div className="sa-split-title">Priority improvement area</div>
                    <div>
                      Clause {priority.number}: {priority.title} – {priority.pct}%
                    </div>
                  </div>
                </div>
              </section>

              {/* Section breakdown */}
              <section className="sa-block sa-page-start">
                <h2 className="sa-h2">Section breakdown</h2>
                <table className="sa-breakdown">
                  <thead>
                    <tr>
                      <th>Clause</th>
                      <th>Weight</th>
                      <th style={{ width: "34%" }}>Readiness</th>
                      <th>Score</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.perClause.map((c) => {
                      const b = bandFor(c.pct);
                      return (
                        <tr key={c.id}>
                          <td>
                            <strong>Clause {c.number}:</strong> {c.title}
                          </td>
                          <td>{c.weight}%</td>
                          <td>
                            <div className="sa-bar">
                              <div style={{ width: `${c.pct}%`, background: b.color }} />
                            </div>
                          </td>
                          <td style={{ color: b.color, fontWeight: 700 }}>{c.pct}%</td>
                          <td>{b.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="sa-radar sa-keep">
                  <Radar clauses={results.perClause} />
                </div>
              </section>

              {/* Clause by clause */}
              {results.perClause.map((c, idx) => {
                const b = bandFor(c.pct);
                const key = levelKey(c.pct);
                const info = CLAUSE_REPORT[c.id];
                return (
                  <section key={c.id} className={`sa-clause sa-keep${idx === 0 ? " sa-page-start" : ""}`}>
                    <div className="sa-clause-num">Clause {c.number}</div>
                    <h2 className="sa-clause-title">{c.title}</h2>
                    <div className="sa-clause-sub">What this clause measures</div>
                    <p>{info.measures}</p>

                    <div className="sa-clause-panel">
                      <div className="sa-clause-score">
                        <Donut value={c.pct} size={112} stroke={18} color={b.color} track="rgba(255,255,255,0.25)" textColor="#ffffff" />
                      </div>
                      <div>
                        <div className="sa-panel-title">Your readiness level: {b.name}</div>
                        <p>{CLAUSE_BAND_TEXT[key]}</p>
                        <p>
                          <strong>Recommended next step:</strong> {info.steps[key]}
                        </p>
                      </div>
                    </div>

                    <ul className="sa-answers">
                      {c.questions.map((q, i) => (
                        <li key={i}>
                          <span className="sa-q">{q}</span>
                          <span className="sa-a">{scaleLabel(answers[`${c.id}-${i}`])}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              {/* Next steps */}
              <section className="sa-block sa-page-start">
                <h2 className="sa-h2">Your next steps</h2>
                <p>
                  This report gives you a clause-by-clause view of where your environmental management system is ready for
                  audit and where more work is needed. Whether you are building a new EMS or moving an existing one to
                  ISO 14001:2026, SafetyNett can help you close the gaps.
                </p>
                <ul className="sa-services">
                  <li>
                    <strong>Gap analysis:</strong> a SafetyNett consultant reviews your EMS against ISO 14001:2026 and gives you a
                    prioritised action plan.
                  </li>
                  <li>
                    <strong>Implementation and transition support:</strong> hands-on help to build or update your EMS, from
                    aspects and compliance registers to internal audit and management review.
                  </li>
                  <li>
                    <strong>ISO 14001:2026 document package:</strong> a ready-to-use, fully editable set of manuals, procedures,
                    registers and audit checklists.
                  </li>
                  <li>
                    <strong>iAudit Global:</strong> software for planning, running and reporting your ISO 14001 internal audits.
                  </li>
                </ul>
                <div className="sa-cta sa-keep">
                  <div className="sa-cta-title">Talk to a SafetyNett consultant</div>
                  <p>
                    Email <strong>{contactEmails.direct}</strong> or visit <strong>{site}</strong> to request a quote.
                  </p>
                </div>
                <p className="sa-disclaimer">
                  <strong>Important:</strong> this report is generated from self-reported answers. It is not an audit finding,
                  a formal gap analysis or a guarantee of certification. ISO 14001:2026 certification is granted only through
                  an audit by an accredited certification body.
                </p>
              </section>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ---------- Back page ---------- */}
      <section className="sa-back">
        <div className="sa-back-shape sa-back-shape-1" />
        <div className="sa-back-shape sa-back-shape-2" />
        <div className="sa-back-inner">
          <img src="/email-logo.png" alt="SafetyNett" className="sa-back-logo" />
          <h2 className="sa-back-h">About SafetyNett</h2>
          <p className="sa-back-lead">Your trusted partner in ISO consultancy and business solutions.</p>
          <p>
            SafetyNett simplifies ISO management systems and helps businesses manage risk through expert consultancy and
            SaaS solutions. We support organisations with ISO 9001, ISO 14001, ISO 45001, ISO 50001, ISO 27001 and
            ISO 14068, from first implementation through to certification.
          </p>
          <p>
            Our software includes {products.map((p) => p.name).join(" and ")}, covering QHSE management and ISO audits.
          </p>

          <h2 className="sa-back-h">Get in touch</h2>
          <p>
            Visit <strong>{site}</strong> or email <strong>{contactEmails.direct}</strong>
          </p>
          <address className="sa-back-address">
            SafetyNett Consultancy
            <br />
            {postalAddress.streetAddress}
            <br />
            {postalAddress.addressLocality}
            <br />
            {postalAddress.postalCode}
            <br />
            United Kingdom
          </address>
        </div>
      </section>
    </div>
  );
}
