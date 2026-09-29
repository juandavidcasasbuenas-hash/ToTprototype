# NLF Workshop Builder prototype

Open `index.html` in a current browser. Keep `index.html`, `styles.css`, `app.js`, `recipes.js` and `export.js` together. No installation, account, API key or internet connection is required.

1. Choose a sample workshop recipe.
2. Set a name, start time and time budget.
3. Swap activity variants, inspect facilitation notes and include optional extensions.
4. Download a genuine editable `.docx` pack, or use Preview & print / PDF and choose Save as PDF in your browser's print window.

Choices are saved to this browser's local storage when available. Each recipe keeps its own choices. Reset this recipe restores its defaults. No data is transmitted. Editing an exported Word file does not change the builder.

## Scope

This demonstrates the recipe-and-swaps interaction. Recipes, timing estimates, activity variants and blank worksheets are illustrative drafts, not approved NLF training materials. Trainers must supply country evidence, case facts, role cards and current handbook materials as identified in preparation notes. Full ready-to-deliver case packs and official handbook extracts are not included.

Core sequence and required blocks stay fixed. The prototype recalculates time and warns when a plan is over budget; it does not compress activities automatically. Word exports retain those warnings. The trainer rehearsal recipe has its own audience and practice requirements.

## Development

This is plain HTML, CSS and JavaScript, without network dependencies or a build step. Optionally serve the folder with Python's HTTP server. `recipes.js` holds the content, `app.js` the interaction and print view, and `export.js` a minimal OOXML exporter. `NLFBuilder.getPlan()` exposes the selected plan for development checks.

The current content uses the two supplied draft summaries for Political Ownership and Anchoring, Processes 1 and 2. Source notes are available within the prototype.
