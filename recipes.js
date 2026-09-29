/* Illustrative workshop routes assembled from the user's draft learning objectives.
   No route or timing has been reviewed or approved by UN-Habitat. */
window.NLF_SOURCE_NOTE = "Prototype content based on the two supplied draft learning-objective and activity summaries. Recipes are illustrative, not reviewed or approved. Timings are indicative, include only the stated practice scope, and need piloting. These worksheets are prototype aids, not the official NLF toolkits. Use verified country evidence or a clearly labelled practice case; workshop proposals do not constitute institutional decisions.";
window.NLF_SOURCE_REFERENCES = [
  { title: "Process 1: Institutional Anchoring and Political Mobilisation", file: "NLF Capacity Building - summary .md", note: "User-supplied draft; objective IDs are prefixed P1 to distinguish them from Process 2." },
  { title: "Process 2: Scoping and Capacity Diagnostics", file: "NLF Capacity Building - summary  (1).md", note: "User-supplied draft; objective IDs are prefixed P2. Consult the current handbook and official templates before delivery." }
];

window.NLF_RECIPES = [
  {
    id: "anchoring-clinic",
    title: "Anchoring proposal clinic",
    shortTitle: "Anchoring proposal",
    process: "Process 1 · Political ownership and anchoring",
    audience: "Trainers and implementers · 6–18 participants in groups of 3–6",
    description: "Work through a prepared country case to draft an institutional anchoring proposal, test the reasoning and identify decisions that need authorised actors.",
    output: "A draft anchoring proposal, with supporting evidence, engagement steps, an action plan and unresolved readiness questions.",
    limitations: "Illustrative 4-hour practice route. Requires preparation and a shared case; it cannot establish political agreement or confer a mandate. It covers selected shared-content objectives and is not a complete ToT. P1-B6 catalogue analysis and P1-B10 real-world follow-through are outside the default route.",
    defaultBudget: 240,
    preparation: [
      "Prepare a verified country evidence pack or a clearly labelled fictional practice case. Include available pathway, mandates, institutions, coordination arrangements and known uncertainties. Do not fill missing evidence with assumptions.",
      "Bring the current handbook, a process map and any relevant official tools. The prototype worksheets support practice and do not replace those resources.",
      "Print one worksheet pack per group; agree working language, accessibility support and a route for matters outside participants’ authority.",
      "If the institutional home is already decided, select the 'Stress-test the existing anchor' variant before delivery."
    ],
    objectives: [
      { id: "P1-B1", label: "Explain how anchoring connects to later NLF processes." },
      { id: "P1-B2", label: "Explain the roles of an institutional home, mandate and political ownership." },
      { id: "P1-B3", label: "Diagnose the starting position using evidence and gaps." },
      { id: "P1-B4", label: "Distinguish leadership, decision authority, consultation and missing voices." },
      { id: "P1-B5", label: "Recommend an anchoring option and explain trade-offs." },
      { id: "P1-B7", label: "Draft engagement steps and a credible endorsement route." },
      { id: "P1-B8", label: "Translate the proposal into actions, owners and dependencies." },
      { id: "P1-B9", label: "Identify readiness evidence and unresolved conditions." }
    ],
    blocks: [
      {
        id: "anchor-orientation", title: "Frame the anchoring challenge", required: true, kind: "activity", defaultVariant: "anchor-map",
        variants: [
          { id: "anchor-map", title: "Process map and paired explanation", minutes: 15, description: "Locate anchoring in the NLF process and distinguish a named home from a mandate and political backing.", objectives: ["P1-B1", "P1-B2"], steps: ["Use the handbook process map to locate anchoring and the decisions it enables.", "In pairs, explain what an institutional home, convening authority and broad ownership each contribute.", "Record the workshop purpose and boundaries in the proposal canvas."], output: "A shared purpose statement and initial assumptions on the proposal canvas.", materials: ["case-evidence", "anchoring-proposal"], debrief: ["What can this group propose today?", "Which decisions need actors who are not in the room?"] },
          { id: "anchor-check", title: "Preparation check and focused framing", minutes: 10, description: "For participants who have already read the process map; check understanding rather than teach it from scratch.", objectives: ["P1-B1", "P1-B2"], steps: ["Ask pairs to explain how anchoring enables the next NLF process.", "Check that institutional home, mandate and ownership are distinguished; correct misunderstandings.", "Record the practice purpose and decision boundaries."], output: "A shared purpose statement and any orientation gaps needing follow-up.", materials: ["case-evidence", "anchoring-proposal"], debrief: ["What distinction still needs clarification before practice?"] }
        ]
      },
      {
        id: "anchor-evidence", title: "Diagnose the starting position", required: true, kind: "activity", defaultVariant: "anchor-evidence-sort",
        variants: [
          { id: "anchor-evidence-sort", title: "Evidence-and-gap sort", minutes: 35, description: "Review the prepared evidence pack and identify what it does and does not establish.", objectives: ["P1-B3"], steps: ["Sort evidence across pathway, mandates, planning, coordination and reforms.", "Record sources and distinguish confirmed facts, missing information and conflicting claims.", "Identify the three gaps most likely to affect an anchoring proposal; add them to the canvas."], output: "An evidence-and-gap matrix with priority verification questions.", materials: ["case-evidence", "evidence-gap", "anchoring-proposal"], debrief: ["Which gap limits the confidence of your recommendation?", "Is this a learning gap or a mandate, political or resource constraint?"] },
          { id: "anchor-evidence-review", title: "Challenge a prepared evidence matrix", minutes: 20, description: "Uses a matrix prepared before the workshop; practises checking the evidence for the three most consequential claims.", objectives: ["P1-B3"], steps: ["Read the prepared matrix and select three consequential claims.", "Trace those claims to sources and flag unsupported or conflicting evidence.", "Revise the priority verification questions and transfer the limits to the canvas."], output: "A revised evidence-and-gap matrix; unreviewed claims remain explicitly marked.", materials: ["case-evidence", "evidence-gap", "anchoring-proposal"], debrief: ["Which parts of this matrix remain unreviewed?"] }
        ]
      },
      {
        id: "anchor-actors", title: "Map authority and participation", required: true, kind: "activity", defaultVariant: "anchor-role-map",
        variants: [
          { id: "anchor-role-map", title: "Stakeholder and role map", minutes: 25, description: "Map actors who lead, authorise, contribute and need to be heard.", objectives: ["P1-B4"], steps: ["Map relevant institutions and national–subnational roles using the evidence pack.", "Distinguish confirmed decision authority from proposed roles and consultation.", "Identify missing voices and add an engagement step for each priority omission."], output: "A stakeholder map showing role evidence, missing voices and proposed participation.", materials: ["stakeholder-map", "anchoring-proposal"], debrief: ["Whose authority have you assumed?", "Who needs an accessible way to contribute?"] },
          { id: "anchor-role-audit", title: "Audit a prepared role map", minutes: 15, description: "Use only where a draft stakeholder map is available; check authority and the most important omissions.", objectives: ["P1-B4"], steps: ["Check the evidence for the proposed lead and endorsement roles.", "Test national–subnational representation and identify the two most consequential missing voices.", "Annotate uncertainties and add follow-up engagement steps."], output: "An annotated stakeholder map focused on authority and priority omissions.", materials: ["stakeholder-map", "anchoring-proposal"], debrief: ["Which roles still need confirmation?"] }
        ]
      },
      {
        id: "anchor-options", title: "Test an anchoring proposal", required: true, kind: "activity", defaultVariant: "anchor-compare",
        variants: [
          { id: "anchor-compare", title: "Compare two viable options", minutes: 40, description: "Compare two possible institutional homes and defend a provisional recommendation.", objectives: ["P1-B5"], steps: ["Agree two plausible options based on the case; avoid inventing institutions or powers.", "Compare mandate, convening authority, support, continuity and fit with existing arrangements.", "Ask another group to challenge the evidence and trade-offs.", "Record a provisional recommendation, uncertainties and decisions requiring authority."], output: "An options matrix and a reasoned draft recommendation.", materials: ["anchoring-options", "anchoring-proposal"], debrief: ["What evidence could change the recommendation?", "Which trade-off remains unresolved?"] },
          { id: "anchor-existing", title: "Stress-test the existing anchor", minutes: 30, description: "For a context where the institutional home is already decided; assess the conditions needed for it to work.", objectives: ["P1-B5"], steps: ["Record the source and status of the existing anchoring decision.", "Test the arrangement against mandate, convening authority, support, continuity and fit.", "Use a peer challenge to identify necessary safeguards or unresolved conditions.", "Draft a recommendation for strengthening the arrangement within participants’ authority."], output: "An options matrix focused on the existing arrangement and a draft strengthening recommendation.", materials: ["anchoring-options", "anchoring-proposal"], debrief: ["What is settled, and what still needs work?", "What must be escalated to an authorised actor?"] }
        ]
      },
      { id: "anchor-break", title: "Break", required: true, kind: "break", defaultVariant: "anchor-break-15", variants: [{ id: "anchor-break-15", title: "Refreshment break", minutes: 15, description: "Pause before engagement and action planning.", objectives: [], steps: ["Take a break and display the restart time."], output: "Participants return ready for the next activity.", materials: [], debrief: [] }] },
      {
        id: "anchor-mobilisation", title: "Plan engagement and endorsement", required: true, kind: "activity", defaultVariant: "anchor-messages",
        variants: [
          { id: "anchor-messages", title: "Stakeholder messages and endorsement route", minutes: 30, description: "Turn the role map into a practical mobilisation approach.", objectives: ["P1-B7"], steps: ["Choose three priority stakeholders, including a missing or underrepresented voice.", "Record their likely concerns as hypotheses unless evidence is available; formulate messages and engagement steps.", "Map a proposed endorsement route, responsible actors and points needing verification."], output: "A draft engagement plan with an explicit proposed endorsement route.", materials: ["stakeholder-map", "mobilisation-plan", "anchoring-proposal"], debrief: ["How will you check whether these messages address real concerns?", "Who can confirm the endorsement route?"] },
          { id: "anchor-one-message", title: "One priority engagement worked example", minutes: 20, description: "Develop one stakeholder engagement in depth, then outline the endorsement route; other engagements remain follow-up work.", objectives: ["P1-B7"], steps: ["Choose the highest-priority engagement and develop the concern, message, channel and owner.", "Sketch the endorsement route and flag unknown authorities.", "List other stakeholder engagements to develop after the workshop."], output: "An engagement plan with one worked action and an initial endorsement route.", materials: ["stakeholder-map", "mobilisation-plan", "anchoring-proposal"], debrief: ["What participation work is still missing from the plan?"] }
        ]
      },
      {
        id: "anchor-roadmap", title: "Build the action roadmap", required: true, kind: "activity", defaultVariant: "anchor-roadmap-full",
        variants: [
          { id: "anchor-roadmap-full", title: "Roadmap with owners and dependencies", minutes: 35, description: "Sequence the next actions without treating workshop proposals as institutional commitments.", objectives: ["P1-B8"], steps: ["Translate review–assess–agree–formalise into a practical sequence for the agreed planning period.", "For each priority action, record proposed owner, prerequisite, milestone and evidence of completion.", "Separate actions within participants’ roles from decisions that require confirmation.", "Transfer the immediate next steps to the proposal canvas."], output: "A draft action roadmap with decision status, owners and dependencies.", materials: ["action-plan", "anchoring-proposal"], debrief: ["What must happen first?", "Which owner has actually accepted responsibility?"] },
          { id: "anchor-roadmap-first", title: "Plan the first three actions", minutes: 20, description: "Create a credible first-step roadmap; later milestones remain explicitly unfinished.", objectives: ["P1-B8"], steps: ["Select three immediate actions needed to advance the proposal.", "Specify proposed owner, prerequisite, first milestone and completion evidence for each.", "Mark later planning work and decisions requiring authority."], output: "A draft roadmap with three detailed first actions and a later-work list.", materials: ["action-plan", "anchoring-proposal"], debrief: ["What could prevent the first action from starting?"] }
        ]
      },
      {
        id: "anchor-readiness", title: "Challenge readiness and close", required: true, kind: "activity", defaultVariant: "anchor-readiness-peer",
        variants: [
          { id: "anchor-readiness-peer", title: "Peer challenge against five readiness checks", minutes: 30, description: "Assess the proposal’s evidence and clearly record what remains unresolved.", objectives: ["P1-B9"], steps: ["Swap proposals and apply all five checks, recording evidence and uncertainty.", "Discuss differences between a practice judgement and an authorised institutional decision.", "Revise unsupported claims, assign follow-up questions and confirm the draft status of the proposal.", "Ask each participant to explain one readiness gap and the next step to address it."], output: "A revised draft proposal and readiness-check record with follow-up actions.", materials: ["anchoring-proposal", "anchoring-checks", "action-plan"], debrief: ["Which check has insufficient evidence?", "What would make a future proceed judgement defensible?"] },
          { id: "anchor-readiness-self", title: "Facilitated self-check and spot challenge", minutes: 20, description: "Review all five checks within each group, with the facilitator challenging its most consequential claim.", objectives: ["P1-B9"], steps: ["Apply all five checks, using 'not enough evidence' where appropriate.", "Invite the facilitator to challenge one consequential readiness claim.", "Revise the draft and record owners and next steps for unresolved items."], output: "A self-checked draft proposal and readiness record with a limited facilitator challenge.", materials: ["anchoring-proposal", "anchoring-checks", "action-plan"], debrief: ["What further independent scrutiny would improve this draft?"] }
        ]
      },
      { id: "anchor-buffer", title: "Reserved contingency", required: true, kind: "buffer", defaultVariant: "anchor-buffer-15", variants: [{ id: "anchor-buffer-15", title: "Overrun allowance", minutes: 15, description: "Protected time at the end of the schedule to absorb earlier overruns or unresolved questions.", objectives: [], steps: ["Use this reserved time if earlier activities overrun; finish early if it is not needed."], output: "Protected contingency; no additional required learning.", materials: [], debrief: [] }] }
    ]
  },
  {
    id: "diagnostic-clinic",
    title: "Diagnostic practice clinic",
    shortTitle: "Readiness diagnostics",
    process: "Process 2 · Scoping and capacity diagnostics",
    audience: "Trainers and implementers · 8–20 participants in groups of 4–5",
    description: "Use one prepared evidence pack to practise review, assess, prioritise and validate, then assemble a short draft readiness report.",
    output: "A practice readiness report covering all four enablers, with evidence limits, priority needs and follow-up actions.",
    limitations: "Illustrative 4-hour practice route. This is a worked diagnostic exercise, not a completed country assessment or formal stakeholder validation. Use the current official assessment tools for real ratings. P2-B6 catalogue appraisal is outside the default route; shared-content practice alone is not a complete ToT.",
    defaultBudget: 240,
    preparation: [
      "Prepare one verified country pack or labelled practice case covering all four enablers. Include source dates, conflicting accounts and explicit evidence gaps.",
      "Supply the current handbook, Toolkit 3 and Institutional Scorecards Template where available. This prototype offers an evidence worksheet and does not invent a scoring scale.",
      "Prepare role prompts for national and local perspectives without presenting role-play statements as verified facts.",
      "Print a pack for each group and confirm how participants will contribute and access the material."
    ],
    objectives: [
      { id: "P2-B1", label: "Explain how diagnostics informs the next NLF decisions." },
      { id: "P2-B2", label: "Distinguish known, missing and uncertain country information." },
      { id: "P2-B3", label: "Identify who leads, contributes evidence, assesses and checks findings." },
      { id: "P2-B4", label: "Record evidence-based findings across all four enablers." },
      { id: "P2-B5", label: "Separate capability gaps from mandate, resource and system constraints." },
      { id: "P2-B7", label: "Prioritise needs and identify dependencies." },
      { id: "P2-B8", label: "Practise checking contested findings and revising them." },
      { id: "P2-B9", label: "Assemble an evidence-based draft readiness report." },
      { id: "P2-B10", label: "Apply five readiness checks and identify unresolved evidence." },
      { id: "P2-B11", label: "Draft follow-up actions with owners and dependencies." }
    ],
    blocks: [
      {
        id: "diag-orientation", title: "Frame the diagnostic task", required: true, kind: "activity", defaultVariant: "diag-start",
        variants: [{ id: "diag-start", title: "Purpose and assessment participation", minutes: 15, description: "Locate the report in the NLF sequence and clarify who should supply and check evidence.", objectives: ["P2-B1", "P2-B3"], steps: ["Explain the sequence review–assess–prioritise–validate and its connection to later decisions.", "Map who leads, provides evidence, assesses and checks findings, including national and local actors.", "Identify missing participants and agree the limits of the practice case."], output: "A purpose statement and assessment participation map.", materials: ["case-evidence", "stakeholder-map", "readiness-report"], debrief: ["Whose evidence is essential but missing today?"] }]
      },
      {
        id: "diag-evidence", title: "Review the evidence", required: true, kind: "activity", defaultVariant: "diag-sort",
        variants: [
          { id: "diag-sort", title: "Known, missing and uncertain sort", minutes: 30, description: "Build a shared evidence base from the prepared case.", objectives: ["P2-B2"], steps: ["Sort statements and documents into known, missing and uncertain.", "Record sources, dates, contradictory claims and information needed for all four enablers.", "Identify which claims require stakeholder verification."], output: "An evidence-and-gap matrix for the assessment.", materials: ["case-evidence", "evidence-gap"], debrief: ["Which claim looks plausible but lacks evidence?"] },
          { id: "diag-review", title: "Audit a pre-sorted evidence pack", minutes: 20, description: "Requires a prepared matrix; focus on consequential claims while retaining a record of unreviewed material.", objectives: ["P2-B2"], steps: ["Check at least one consequential claim for each enabler against its source.", "Flag conflicts and mark the remaining claims as reviewed or unreviewed.", "Revise the follow-up questions."], output: "An annotated evidence-and-gap matrix with explicit review limits.", materials: ["case-evidence", "evidence-gap"], debrief: ["What still needs checking before this pack supports a real decision?"] }
        ]
      },
      {
        id: "diag-assess", title: "Assess all four enablers", required: true, kind: "activity", defaultVariant: "diag-four-enablers",
        variants: [
          { id: "diag-four-enablers", title: "Four-enabler evidence workshop", minutes: 50, description: "Develop a supported finding for each enabler and distinguish learning needs from other constraints.", objectives: ["P2-B4", "P2-B5"], steps: ["Assign pairs or small groups to inspect evidence for the four enablers.", "Record strengths, gaps, sources, uncertainty and what must be in place before action.", "Use official criteria if supplied; otherwise record qualitative findings without inventing numerical ratings.", "Share findings so every group examines all four enablers; mark missing evidence as 'not enough information'."], output: "A diagnostic evidence worksheet covering all four enablers and constraint types.", materials: ["diagnostic-scorecard", "evidence-gap"], debrief: ["Which gaps could training address?", "Where is the problem evidence availability rather than low capacity?"] },
          { id: "diag-four-snapshot", title: "One finding per enabler", minutes: 35, description: "A narrower practice exercise covering all four enablers; work through one finding per enabler, not a full assessment.", objectives: ["P2-B4", "P2-B5"], steps: ["Choose one evidence-backed issue for each of the four enablers.", "Record a finding, source, uncertainty, constraint type and dependency for each.", "Cross-check the findings and label the work as a four-finding practice snapshot."], output: "A diagnostic evidence worksheet with four worked findings and explicit scope limits.", materials: ["diagnostic-scorecard", "evidence-gap"], debrief: ["What assessment coverage remains outside this snapshot?"] }
        ]
      },
      { id: "diag-break", title: "Break", required: true, kind: "break", defaultVariant: "diag-break-15", variants: [{ id: "diag-break-15", title: "Refreshment break", minutes: 15, description: "Pause before prioritisation and validation.", objectives: [], steps: ["Take a break and display the restart time."], output: "Participants return ready for the next activity.", materials: [], debrief: [] }] },
      {
        id: "diag-priorities", title: "Prioritise needs and dependencies", required: true, kind: "activity", defaultVariant: "diag-priority-cards",
        variants: [
          { id: "diag-priority-cards", title: "Needs cards and peer challenge", minutes: 30, description: "Agree a shortlist using explicit criteria and prerequisite relationships.", objectives: ["P2-B7"], steps: ["Agree criteria such as pathway importance, urgency, seriousness and feasibility.", "Compare needs across all four enablers; identify which must be addressed before others.", "Present a short priority list to another group and record trade-offs, uncertainty and dissent."], output: "A justified priority shortlist with dependencies and unresolved disagreement.", materials: ["diagnostic-scorecard", "diagnostic-priorities"], debrief: ["Which high-priority need depends on something else happening first?"] },
          { id: "diag-priority-three", title: "Rank the three most consequential needs", minutes: 20, description: "Create a limited shortlist using the findings already generated; retain other needs for later deliberation.", objectives: ["P2-B7"], steps: ["Agree the priority criteria.", "Choose three consequential needs and document the rationale and dependencies.", "Have another group challenge the top choice; record remaining needs and disagreement."], output: "A three-need shortlist with reasons and a deferred-needs list.", materials: ["diagnostic-scorecard", "diagnostic-priorities"], debrief: ["Whose judgement is missing from this ranking?"] }
        ]
      },
      {
        id: "diag-validation", title: "Practise checking disputed findings", required: true, kind: "activity", defaultVariant: "diag-roleplay",
        variants: [
          { id: "diag-roleplay", title: "Stakeholder validation role-play", minutes: 30, description: "Use national and local perspectives to challenge the evidence without implying formal validation.", objectives: ["P2-B8"], steps: ["Assign stakeholder roles and mark role-play evidence as simulated.", "Discuss two contested findings, asking for evidence and inviting quieter voices.", "Revise supported conclusions and record changes, unresolved differences and verification owners."], output: "A validation log showing revised findings and remaining verification work.", materials: ["stakeholder-map", "diagnostic-scorecard", "validation-log"], debrief: ["What changed because of evidence?", "Who must actually validate these findings outside the practice session?"] },
          { id: "diag-one-dispute", title: "One disputed finding roundtable", minutes: 20, description: "Practise checking one contested finding; other findings remain unvalidated.", objectives: ["P2-B8"], steps: ["Select one consequential disputed finding and assign contrasting stakeholder roles.", "Ask for evidence, distinguish assumptions and record unresolved differences.", "Revise that finding and name who should check it in a real assessment."], output: "A validation log with one worked dispute and the remaining validation scope.", materials: ["diagnostic-scorecard", "validation-log"], debrief: ["Which claims still lack stakeholder checking?"] }
        ]
      },
      {
        id: "diag-report", title: "Assemble the readiness report", required: true, kind: "activity", defaultVariant: "diag-report-peer",
        variants: [
          { id: "diag-report-peer", title: "Report canvas and evidence review", minutes: 35, description: "Build the report from earlier worksheets and check whether its conclusions can be traced to evidence.", objectives: ["P2-B9"], steps: ["Summarise the case, methods, scope and limitations.", "Include findings for all four enablers, strengths, gaps, dependencies and justified priorities.", "Swap drafts and trace two priority conclusions to their evidence.", "Revise unsupported conclusions and attach the relevant worksheets."], output: "A short practice readiness report with traceable evidence and limitations.", materials: ["readiness-report", "diagnostic-scorecard", "diagnostic-priorities", "validation-log"], debrief: ["Could someone outside the group trace the top priority to its evidence?"] },
          { id: "diag-report-summary", title: "Structured report summary and spot check", minutes: 25, description: "Compile a concise report canvas from completed worksheets; use one cross-group evidence check.", objectives: ["P2-B9"], steps: ["Complete every report section using the earlier worksheets.", "Ask another group to trace the leading priority to its evidence.", "Revise unsupported claims and list sections that need fuller drafting."], output: "A concise practice report canvas with linked evidence and further-drafting notes.", materials: ["readiness-report", "diagnostic-scorecard", "diagnostic-priorities", "validation-log"], debrief: ["Where does a short summary risk hiding uncertainty?"] }
        ]
      },
      {
        id: "diag-close", title: "Check readiness and plan follow-up", required: true, kind: "activity", defaultVariant: "diag-check-plan",
        variants: [{ id: "diag-check-plan", title: "Five checks and first actions", minutes: 20, description: "Apply all five checks and specify a limited set of next actions.", objectives: ["P2-B10", "P2-B11"], steps: ["Review all five checks using 'met', 'not yet met' or 'not enough evidence', with reasons.", "Draft the first three follow-up actions, proposed owners, dependencies and completion evidence.", "Separate training support from mandate, staffing, finance and system changes.", "Label the output as a practice draft requiring appropriate stakeholder review."], output: "A readiness-check record and three-action follow-up plan.", materials: ["readiness-report", "diagnostic-checks", "action-plan"], debrief: ["What still prevents a defensible next-stage decision?", "Who needs to agree to the proposed actions?"] }]
      },
      { id: "diag-buffer", title: "Reserved contingency", required: true, kind: "buffer", defaultVariant: "diag-buffer-15", variants: [{ id: "diag-buffer-15", title: "Overrun allowance", minutes: 15, description: "Protected time at the end of the schedule to absorb earlier overruns or unresolved questions.", objectives: [], steps: ["Use this reserved time if earlier activities overrun; finish early if it is not needed."], output: "Protected contingency; no additional required learning.", materials: [], debrief: [] }] }
    ]
  },
  {
    id: "trainer-rehearsal",
    title: "Trainer facilitation rehearsal",
    shortTitle: "Facilitation rehearsal",
    process: "Process 2 · Trainer development",
    audience: "Exactly 6 trainers in two parallel triads · one lead facilitator",
    description: "Adapt a short diagnostic exercise, rehearse it in triads and improve the facilitator notes using observed evidence.",
    output: "An adapted exercise excerpt, an observation record for every trainer and revised facilitator notes with a personal next step.",
    limitations: "Illustrative 2-hour ToT practice segment for six trainers. All six facilitate one 10-minute excerpt in parallel triads; this does not establish competence to deliver a full workshop. The short practice cannot represent every stakeholder perspective at once. Larger groups require additional triads, observers and facilitation support or a longer schedule. This is not a complete ToT or formal assessment.",
    defaultBudget: 120,
    preparation: [
      "Use a diagnostic exercise and a case pack already checked for accuracy, accessibility and suitability; supply a sample disputed finding and two contrasting stakeholder perspectives.",
      "Arrange two spaces for triads of three. Every round rotates trainer, participant and observer; the participant can voice the two supplied perspectives in turn.",
      "Provide one observation sheet per trainer, one adaptation sheet per triad, and the current official diagnostic materials.",
      "The lead facilitator briefs both triads and samples their practice; peer feedback is the main evidence in this short segment."
    ],
    objectives: [
      { id: "P2-A2", label: "Adapt one diagnostic exercise excerpt and flag unverified country assumptions." },
      { id: "P2-A4", label: "Rehearse evidence-based, inclusive facilitation and revise facilitator notes." },
      { id: "P2-A5", label: "Give specific feedback on a diagnostic finding and check a revision." }
    ],
    blocks: [
      {
        id: "tot-brief", title: "Brief the practice and feedback", required: true, kind: "activity", defaultVariant: "tot-brief-10",
        variants: [{ id: "tot-brief-10", title: "Agree the focus and observation criteria", minutes: 10, description: "Calibrate the narrow practice task and explain the triad rotations.", objectives: ["P2-A4", "P2-A5"], steps: ["Explain that each trainer will facilitate one excerpt, participate once and observe once.", "Review the checklist: ask for evidence, check assumptions, invite participation, handle disagreement and record a justified finding.", "Model one specific observation and one actionable improvement; explain the time signals."], output: "A shared practice focus and agreed peer-feedback criteria.", materials: ["observation-sheet", "case-evidence"], debrief: ["What observable behaviour will show that the trainer checked the evidence?"] }]
      },
      {
        id: "tot-adapt", title: "Adapt the exercise excerpt", required: true, kind: "activity", defaultVariant: "tot-adapt-20",
        variants: [
          { id: "tot-adapt-20", title: "Adapt one case prompt and facilitator note", minutes: 20, description: "Create a short exercise that lets each trainer practise facilitating a disputed diagnostic finding.", objectives: ["P2-A2", "P2-A4"], steps: ["Select one diagnostic finding and identify the required learner output.", "Adapt the case prompt, terms and access support; keep the evidence question and decision boundary visible.", "Prepare the two participant perspectives, questions and recording method.", "Agree which assumptions remain unverified; each trainer chooses a personal practice focus."], output: "An adapted exercise excerpt and initial facilitator notes.", materials: ["adaptation-sheet", "case-evidence", "diagnostic-scorecard"], debrief: ["Which adaptation changes the learning task, and which just changes the language?"] },
          { id: "tot-adapt-audit", title: "Review a pre-adapted excerpt", minutes: 15, description: "Requires an excerpt prepared in advance; practise checking its suitability and improving one facilitator prompt.", objectives: ["P2-A2", "P2-A4"], steps: ["Check the prepared excerpt against the learner output, evidence needs and audience.", "Flag unverified assumptions and improve one facilitation prompt.", "Confirm role perspectives and recording method."], output: "An annotated adapted excerpt with one improved facilitator prompt.", materials: ["adaptation-sheet", "case-evidence", "diagnostic-scorecard"], debrief: ["What still needs checking before this excerpt is used in a country workshop?"] }
        ]
      },
      {
        id: "tot-rehearse", title: "Rehearse in two parallel triads", required: true, kind: "activity", defaultVariant: "tot-three-rounds",
        variants: [
          { id: "tot-three-rounds", title: "Three rounds · 10-minute facilitation each", minutes: 54, description: "Two triads run simultaneously. Each 18-minute round includes 10 minutes of practice, 6 of feedback and 2 to rotate; all six trainers facilitate once.", objectives: ["P2-A4", "P2-A5"], steps: ["Round 1: one trainer facilitates, one participant uses the supplied perspectives and one observer records evidence.", "Use 10 minutes to facilitate the finding discussion, 6 for self-reflection and peer feedback, and 2 to reset.", "Rotate roles and repeat for rounds 2 and 3 so every person facilitates, participates and observes once.", "During feedback, identify one strength, one specific improvement and one revision to the finding or facilitator notes."], output: "Six observed facilitation excerpts and an individual feedback record for every trainer.", materials: ["adaptation-sheet", "observation-sheet", "diagnostic-scorecard"], debrief: ["What question elicited evidence rather than opinion?", "How did the trainer respond to uncertainty or disagreement?"] },
          { id: "tot-short-rounds", title: "Three rounds · 7-minute facilitation each", minutes: 42, description: "For a narrower excerpt. Each 14-minute round includes 7 minutes of practice, 5 of feedback and 2 to rotate; all six still facilitate once.", objectives: ["P2-A4", "P2-A5"], steps: ["Limit practice to checking one contested claim and recording a justified next step.", "Run three parallel triad rounds, each with 7 minutes of facilitation, 5 of feedback and 2 to rotate.", "Rotate roles so everyone facilitates once; record one observed strength and one improvement each.", "State that broader participation and group-dynamics skills remain outside this short practice."], output: "Six shorter observed excerpts and individual feedback focused on one contested claim.", materials: ["adaptation-sheet", "observation-sheet", "diagnostic-scorecard"], debrief: ["What could you not observe in a seven-minute excerpt?"] }
        ]
      },
      { id: "tot-break", title: "Break", required: true, kind: "break", defaultVariant: "tot-break-10", variants: [{ id: "tot-break-10", title: "Short break", minutes: 10, description: "Pause before revising the materials.", objectives: [], steps: ["Take a break and display the restart time."], output: "Participants return ready to revise.", materials: [], debrief: [] }] },
      {
        id: "tot-revise", title: "Revise and check the materials", required: true, kind: "activity", defaultVariant: "tot-revise-16",
        variants: [{ id: "tot-revise-16", title: "Feedback-led revision and partner check", minutes: 16, description: "Use observed practice to improve the excerpt and give feedback on a revised finding.", objectives: ["P2-A2", "P2-A4", "P2-A5"], steps: ["Each trainer revises one prompt or facilitator note in response to observed feedback.", "In pairs, review a diagnostic finding for evidence, uncertainty and clarity; give a specific improvement suggestion.", "Check the revision and identify any country facts or official criteria needing further confirmation."], output: "Revised facilitator notes and a checked example of feedback on a diagnostic finding.", materials: ["adaptation-sheet", "observation-sheet", "diagnostic-scorecard"], debrief: ["What changed in the material because of the rehearsal?"] }]
      },
      {
        id: "tot-next", title: "Agree the next practice step", required: true, kind: "activity", defaultVariant: "tot-next-10",
        variants: [{ id: "tot-next-10", title: "Personal practice commitment and close", minutes: 10, description: "Capture the limits of this rehearsal and plan the next supported practice.", objectives: ["P2-A4", "P2-A5"], steps: ["Each trainer records one strength, one development need and one next rehearsal action.", "Specify who can give feedback, when practice can happen and what evidence will show improvement.", "Confirm the materials’ draft status and unresolved checks before country delivery."], output: "Six personal next-step records linked to observed feedback.", materials: ["learning-action"], debrief: ["Which facilitation demand still needs a longer rehearsal?"] }]
      },
      {
        id: "tot-extension", title: "Optional second attempt", required: false, enabled: false, kind: "activity", defaultVariant: "tot-retry",
        variants: [{ id: "tot-retry", title: "Retry one facilitation move", minutes: 20, description: "Optional extension beyond the 2-hour route: all six trainers retry one prompt in their triads, then compare changes.", objectives: ["P2-A4", "P2-A5"], steps: ["In parallel triads, give each trainer a 3-minute retry and 2 minutes of feedback, rotating through all three people (15 minutes).", "Use the remaining 5 minutes to note what improved and what still needs practice."], output: "A second brief observation for each trainer and updated development notes.", materials: ["adaptation-sheet", "observation-sheet", "learning-action"], debrief: ["What observable difference did the revision make?"] }]
      }
    ]
  }
];

window.NLF_RESOURCES = [
  {
    id: "case-evidence", title: "Case and evidence pack checklist",
    description: "A preparation aid. Attach actual sources or a clearly labelled fictional practice case; this blank checklist is not an evidence pack.",
    columns: ["Case component / claim", "Source and date / practice assumption", "Missing information or limitation"], rows: 8,
    prompts: ["Write the country or case name and mark VERIFIED COUNTRY MATERIAL or FICTIONAL PRACTICE CASE.", "Include pathway and purpose, relevant institutions, mandates and national–subnational roles.", "For diagnostics, include evidence for multilevel governance and coordination; policies and planning; partnerships and investment; data and monitoring.", "Record contradictory accounts and unknowns. Do not treat fictional role statements or unsupported assumptions as facts.", "Attach accessible source extracts and the current official handbook/tools needed for the selected activities."]
  },
  {
    id: "anchoring-proposal", title: "Draft anchoring proposal canvas",
    description: "Bring the workshop’s working outputs together. Mark the status as PRACTICE DRAFT or DRAFT FOR REVIEW, not an institutional decision.",
    columns: ["Proposal section", "Draft statement and supporting evidence", "Open question / proposed owner"], rows: 8,
    prompts: ["Complete these sections: purpose and scope; starting position; stakeholder roles; anchoring recommendation; trade-offs and uncertainty; engagement and endorsement route; immediate actions; readiness evidence and unresolved conditions.", "Reference the supporting worksheets and evidence sources.", "Separate confirmed arrangements from proposed changes and identify who has the authority to decide.", "Record the date, participants, case limitations and required reviewers."]
  },
  {
    id: "evidence-gap", title: "Evidence-and-gap matrix",
    description: "Distinguish known, missing and uncertain information before drawing conclusions.",
    columns: ["Question / theme", "Evidence, source and date", "Known / missing / uncertain", "Check needed and owner"], rows: 8,
    prompts: ["Cover pathway, mandates, institutions, planning and coordination; include all four enablers when doing diagnostics.", "Write the source of each claim and note conflicting information.", "Do not interpret missing information as proof of low capacity.", "Identify the evidence gaps that most affect your next decision."]
  },
  {
    id: "stakeholder-map", title: "Stakeholder and participation map",
    description: "Clarify roles, authority, contribution and missing voices.",
    columns: ["Actor / level", "Role and evidence of authority", "Contribution or missing voice", "Engagement / verification step"], rows: 8,
    prompts: ["For anchoring, distinguish lead, endorsement or decision authority, and consultation; do not assign authority without evidence.", "For diagnostics, identify who leads, provides evidence, assesses and checks findings.", "Include national and subnational actors and relevant voices across all four enablers.", "Mark roles as confirmed or proposed, and record access or participation support needed."]
  },
  {
    id: "anchoring-options", title: "Anchoring options and conditions",
    description: "Compare two possible homes, or stress-test a home already selected. Use qualitative evidence rather than an invented scoring system.",
    columns: ["Criterion", "Option A / existing anchor", "Option B / condition to strengthen", "Evidence and uncertainty"], rows: 6,
    prompts: ["Use the criteria: mandate, convening authority, political support, continuity and fit with existing national and territorial arrangements.", "State the source and status of any decision already made.", "Record trade-offs and a provisional recommendation; where the home is settled, recommend conditions needed for it to work.", "Identify who can decide on the recommendation and what evidence could change it."]
  },
  {
    id: "mobilisation-plan", title: "Engagement and endorsement plan",
    description: "Plan engagement with priority actors and make the proposed route to endorsement explicit.",
    columns: ["Actor and concern / evidence", "Message and engagement step", "Proposed owner and timing", "Decision / confirmation needed"], rows: 5,
    prompts: ["Treat stakeholder concerns as hypotheses unless supported by evidence.", "Include a missing or underrepresented voice and the support needed to participate.", "Below the table, sketch the endorsement route: who considers the proposal, who advises, who decides, and what must happen first.", "Distinguish a proposed owner from an actor who has accepted the responsibility."]
  },
  {
    id: "action-plan", title: "Actions, owners and dependencies",
    description: "Record feasible next steps within participants’ responsibilities and identify decisions needing others.",
    columns: ["Action / first step", "Proposed owner / confirmation", "Prerequisite or decision needed", "Milestone / completion evidence"], rows: 6,
    prompts: ["Set a planning period and sequence actions so prerequisites happen first.", "Separate training or coaching from changes to mandates, staffing, finance, coordination and data systems.", "Mark actions as proposed or agreed; record who must confirm ownership.", "Include evidence gaps, consultation and formal review in the action plan where required."]
  },
  {
    id: "anchoring-checks", title: "Anchoring readiness checks",
    description: "A practice record derived from the supplied draft summary; verify wording against the current handbook before delivery.",
    columns: ["Readiness check", "Met / not yet / not enough evidence", "Reason and evidence", "Next step / proposed owner"], rows: 5,
    prompts: ["Check 1: a clear institutional home and mandate.", "Check 2: ability to convene relevant actors.", "Check 3: clear national–subnational roles.", "Check 4: broad political ownership.", "Check 5: links to existing systems.", "Complete all five checks. A workshop judgement is provisional and does not replace institutional authority or real-world verification."]
  },
  {
    id: "diagnostic-scorecard", title: "Diagnostic evidence worksheet",
    description: "A prototype evidence worksheet, not the official Institutional Scorecards Template. Use official criteria if making formal ratings.",
    columns: ["Enabler and finding", "Source / confidence / uncertainty", "Strength or gap / constraint type", "Prerequisite / further check"], rows: 8,
    prompts: ["Cover all four enablers: multilevel governance and coordination; policies and planning; partnerships and investment; data and monitoring.", "For each finding, state the evidence and uncertainty. Mark absent evidence as 'not enough information'.", "Distinguish trainable skills from mandate, staffing, resource and system constraints; flag explanations that need verification.", "Record qualitative findings unless the current official tool and criteria are available. Do not invent numerical readiness scores.", "A four-finding practice snapshot does not constitute a complete institutional assessment."]
  },
  {
    id: "diagnostic-priorities", title: "Priority needs and dependencies",
    description: "Make the reasoning behind the shortlist visible.",
    columns: ["Need / enabler", "Why it is a priority / evidence", "Prerequisite / trade-off", "Dissent or uncertainty"], rows: 6,
    prompts: ["State agreed criteria before ranking: for example, pathway importance, urgency, seriousness and feasibility.", "Consider findings across all four enablers and identify needs that unlock or depend on other actions.", "Record whose perspective informed the ranking and whose is missing.", "List deferred needs and their reasons; a shorter practice shortlist must not imply that other needs are irrelevant."]
  },
  {
    id: "validation-log", title: "Findings check and revision log",
    description: "Capture evidence challenges, changes and disagreement. Label simulated validation as a role-play.",
    columns: ["Finding / challenge", "Evidence or assumption", "Revision / unresolved disagreement", "Who checks next / when"], rows: 6,
    prompts: ["Record whether this is a practice role-play or a discussion with actual stakeholders.", "Ask for evidence and invite national and local perspectives, including quieter voices.", "Explain why a finding changed or why disagreement remains.", "Identify conclusions still requiring formal review or approval; do not describe role-play agreement as country validation."]
  },
  {
    id: "readiness-report", title: "Practice readiness report canvas",
    description: "A structured draft to assemble from the preceding worksheets. It is not a completed country assessment.",
    columns: ["Report section", "Summary / supporting worksheet or source", "Limitations and follow-up"], rows: 8,
    prompts: ["Complete: purpose and scope; case and method; overview of institutional readiness; findings for each of the four enablers; strengths and capacity gaps; critical dependencies; justified priorities; validation status and next steps.", "For each priority, make the chain from evidence to finding to recommendation traceable.", "Include missing evidence, uncertainty, disagreement and unrepresented stakeholders.", "Add author(s), date, practice or country context, and required reviewers. Attach the evidence, diagnostic and priority worksheets."]
  },
  {
    id: "diagnostic-checks", title: "Diagnostic readiness checks",
    description: "Check all five conditions in the supplied draft summary and record what remains unresolved.",
    columns: ["Readiness check", "Met / not yet / not enough evidence", "Reason and evidence", "Next step / proposed owner"], rows: 5,
    prompts: ["Check 1: all four enablers assessed within the stated scope.", "Check 2: strengths and gaps are clear.", "Check 3: critical dependencies are understood.", "Check 4: priority needs have been agreed by the relevant actors; practice-group agreement alone is insufficient for a real country judgement.", "Check 5: findings can guide action selection and sequence.", "Record limits of practice evidence and further checks needed before a real next-stage decision."]
  },
  {
    id: "adaptation-sheet", title: "Exercise adaptation and facilitator notes",
    description: "Keep the required learner output and evidence standard visible while adapting the exercise.",
    columns: ["Exercise element", "Adapted wording / facilitation choice", "Evidence or assumption to check"], rows: 7,
    prompts: ["Record the learning objective, participant profile and exact output for the short excerpt.", "Specify the case prompt, two stakeholder perspectives, facilitator questions, recording method, timing and language or access support.", "Include prompts that ask for evidence, check assumptions, invite participation and record disagreement.", "Flag unverified country facts and decision boundaries. Keep the practice scope narrower when choosing a shorter variant.", "After rehearsal, record what changed and which observation prompted the revision."]
  },
  {
    id: "observation-sheet", title: "Facilitation observation and feedback",
    description: "One sheet per trainer. Peer observations support development and are not a certification decision.",
    columns: ["Observable behaviour", "What happened / example", "Specific feedback or next attempt"], rows: 6,
    prompts: ["Record trainer, observer, round and personal practice focus.", "Observe: asks for evidence; checks assumptions; invites participation; handles uncertainty or disagreement; keeps the learner output clear; records a justified conclusion or next step.", "Mark 'not observed' when the short excerpt provides no opportunity; do not infer competence from silence.", "Give one evidenced strength and one actionable improvement. Ask the trainer to identify a revision.", "The default schedule uses two parallel triads and three 18-minute rounds: 10 minutes practice, 6 feedback, 2 reset."]
  },
  {
    id: "learning-action", title: "Trainer development next step",
    description: "Connect the next practice action to observed feedback.",
    columns: ["Observed strength / development need", "Next practice action", "Feedback partner / timing", "Evidence of improvement"], rows: 3,
    prompts: ["Record one strength and one development need from your observation sheet.", "Choose a feasible next rehearsal and name a feedback partner.", "Identify facilitation demands that this short excerpt did not test, such as managing a larger group or completing the full diagnostic sequence.", "List unresolved material checks before any country delivery."]
  }
];
