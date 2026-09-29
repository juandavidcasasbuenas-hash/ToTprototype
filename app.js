/* Local-only prototype: no telemetry, services or network requests. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const recipes = window.NLF_RECIPES || [];
  const resources = window.NLF_RESOURCES || [];
  const key = 'nlf-recipe-builder-v1';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let storageOK = true;
  let state = {active: recipes[0]?.id, workshops: {}};
  try { const saved = JSON.parse(localStorage.getItem(key)); if (saved && typeof saved === 'object' && saved.workshops && typeof saved.workshops === 'object') state = saved; } catch (_) { storageOK = false; }
  if (!recipes.length) { $('agenda').textContent = 'The sample recipes could not be loaded. Keep all prototype files together and reopen index.html.'; return; }
  if (!recipes.some(recipe => recipe.id === state.active)) state.active = recipes[0].id;
  function recipe() { return recipes.find(item => item.id === state.active); }
  function defaults(item) { return {title:item.title,startTime:'09:00',budget:item.defaultBudget,notes:'',selections:Object.fromEntries(item.blocks.map(block => [block.id,{variant:block.defaultVariant || block.variants[0].id,enabled:block.required || block.enabled !== false}]))}; }
  function settings() {
    const r = recipe();
    if (!state.workshops[r.id] || typeof state.workshops[r.id] !== 'object') state.workshops[r.id] = defaults(r);
    const s = state.workshops[r.id], d = defaults(r);
    if (typeof s.title !== 'string') s.title = d.title;
    if (typeof s.notes !== 'string') s.notes = '';
    if (typeof s.startTime !== 'string') s.startTime = '09:00';
    if (typeof s.budget !== 'number' || !Number.isFinite(s.budget)) s.budget = r.defaultBudget;
    if (!s.selections || typeof s.selections !== 'object') s.selections = {};
    for (const block of r.blocks) {
      let chosen = s.selections[block.id];
      if (!chosen || typeof chosen !== 'object') chosen = s.selections[block.id] = d.selections[block.id];
      if (!block.variants.some(v => v.id === chosen.variant)) chosen.variant = d.selections[block.id].variant;
      chosen.enabled = block.required || chosen.enabled !== false;
    }
    s.title = s.title.slice(0,120); s.notes = s.notes.slice(0,3000);
    return s;
  }
  function save() {
    try { localStorage.setItem(key,JSON.stringify(state)); storageOK = true; } catch (_) { storageOK = false; }
    $('save-state').textContent = storageOK ? 'Saved on this device' : 'This session only';
  }
  function duration(minutes) { return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2,'0')}m`; }
  function clock(base,offset) {
    const parts = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(base);
    const start = parts ? Number(parts[1])*60+Number(parts[2]) : 540;
    const time = start + offset;
    return `${String(Math.floor(time/60)%24).padStart(2,'0')}:${String(time%60).padStart(2,'0')}${time>=1440?` (+${Math.floor(time/1440)}d)`:''}`;
  }
  function getPlan() {
    const r = recipe(), s = settings();
    let elapsed = 0;
    const blocks = r.blocks.filter(block => s.selections[block.id].enabled).map(block => {
      const v = block.variants.find(v => v.id === s.selections[block.id].variant);
      const start = clock(s.startTime,elapsed); elapsed += v.minutes;
      return {...v,id:block.id,title:block.title,variantTitle:v.title,kind:block.kind,start,end:clock(s.startTime,elapsed)};
    });
    const warnings = [];
    if (elapsed > s.budget) warnings.push(`${elapsed - s.budget} minutes over the available time. Choose shorter activities, remove optional extensions or allow more time before delivery.`);
    if (!validSettings()) warnings.push('Enter a valid start time and time budget between 30 and 1440 minutes.');
    const used = new Set(blocks.flatMap(block => block.materials || []));
    const covered = new Set(blocks.flatMap(block => block.objectives || []));
    return {title:s.title.trim() || r.title,recipeTitle:r.title,audience:r.audience,process:r.process,description:r.description,output:r.output,limitations:r.limitations,notes:s.notes,startTime:s.startTime,budget:s.budget,total:elapsed,preparation:r.preparation,objectives:r.objectives.filter(obj=>covered.has(obj.id)),blocks,resources:resources.filter(item => used.has(item.id)),warnings,sourceNote:window.NLF_SOURCE_NOTE,contentVersion:'Prototype content v1 · September 2026'};
  }
  function validSettings() {
    const s = state.workshops[state.active];
    return s && /^([01]\d|2[0-3]):[0-5]\d$/.test(s.startTime) && Number.isInteger(s.budget) && s.budget>=30 && s.budget<=1440;
  }
  function renderRecipes() {
    const descriptions = ['Draft an anchoring proposal and plan the next steps.', 'Practise assessment and prioritise capacity needs.', 'Practise facilitation with observation and peer feedback.'];
    $('recipes').innerHTML = recipes.map((r,index) => `<button class="recipe-card ${r.id===state.active?'active':''}" data-recipe="${escape(r.id)}" aria-pressed="${r.id===state.active}"><div class="recipe-top"><span class="recipe-number">${duration(r.defaultBudget)} · ${index===2?'Trainer practice':'Shared content'}</span><span class="recipe-check" aria-hidden="true">✓</span></div><h3>${escape(r.shortTitle || r.title)}</h3><p>${descriptions[index] || escape(r.description)}</p></button>`).join('');
  }
  function renderAgenda() {
    const r = recipe(), s = settings(), plan = getPlan();
    const focusId = document.activeElement?.id;
    const openDetails = new Set([...$('agenda').querySelectorAll('details[open]')].map(el => el.dataset.block));
    let cursor = 0;
    $('agenda').innerHTML = r.blocks.map(block => {
      const chosen = s.selections[block.id], v = block.variants.find(v => v.id === chosen.variant);
      const start = clock(s.startTime,cursor);
      if (chosen.enabled) cursor += v.minutes;
      const utility = block.kind !== 'activity';
      const selector = block.variants.length>1 ? `<div class="variant-field"><label class="sr-only" for="variant-${escape(block.id)}">Activity for ${escape(block.title)}</label><select id="variant-${escape(block.id)}" data-variant="${escape(block.id)}" ${!chosen.enabled?'disabled':''}>${block.variants.map(option => `<option value="${escape(option.id)}" ${option.id===v.id?'selected':''}>${escape(option.title)} · ${option.minutes} min${option.minutes<v.minutes?' (save '+(v.minutes-option.minutes)+' min)':''}</option>`).join('')}</select></div>` : '';
      const title = !block.required ? `<label class="optional-label"><input id="enable-${escape(block.id)}" type="checkbox" data-enable="${escape(block.id)}" ${chosen.enabled?'checked':''}>${escape(block.title)} <span class="small-note">Optional</span></label>` : `<h4>${escape(block.title)}</h4>`;
      return `<article class="activity ${utility?'utility':''} ${!chosen.enabled?'disabled-activity':''}"><div class="activity-time">${chosen.enabled?escape(start):'—'}</div><div class="activity-card"><div class="activity-top">${title}<span class="minutes">${v.minutes} min</span></div>${!utility?`${selector}<details data-block="${escape(block.id)}" ${openDetails.has(block.id)?'open':''}><summary>Guidance & resources <span aria-hidden="true">+</span></summary><p class="activity-description">${escape(v.description)}</p><h5>Steps</h5><ol>${(v.steps||[]).map(text=>`<li>${escape(text)}</li>`).join('')}</ol><p><strong>Leave with:</strong> ${escape(v.output)}</p>${v.debrief?.length?`<h5>Debrief</h5><ul>${v.debrief.map(text=>`<li>${escape(text)}</li>`).join('')}</ul>`:''}<p class="small-note">Learning focus: ${(v.objectives||[]).map(escape).join(', ') || 'Workshop logistics'}</p><div class="resource-links">${(v.materials||[]).map(id=>{const resource=resources.find(r=>r.id===id);return `<button class="resource-link" data-resource="${escape(id)}">${escape(resource?.title||id)} ↗</button>`;}).join('')}</div></details>`:''}</div></article>`;
    }).join('');
    if (focusId) $(focusId)?.focus({preventScroll:true});
    $('objectives-list').innerHTML = plan.objectives.map(o=>`<li><strong>${escape(o.id)}</strong> ${escape(o.label)}</li>`).join('');
  }
  function renderSummary() {
    const p = getPlan(), valid = validSettings(), diff = p.budget-p.total;
    $('planned-time').textContent = duration(p.total);
    $('time-comparison').textContent = `${p.budget || '—'} min available`;
    $('time-fill').style.width = `${p.budget>0?Math.min(100,p.total/p.budget*100):100}%`;
    const summary = document.querySelector('.time-summary'); summary.classList.toggle('over',diff<0 || !valid);
    $('time-status').textContent = !valid ? 'Enter a start time and a budget of 30–1440 minutes.' : diff<0 ? `${-diff} min over your time. Try a shorter option or allow more time.` : diff===0 ? `Fits your time, including scheduled breaks. Ends ${clock(p.startTime,p.total)}.` : `${diff} min unallocated. Your planned activities end ${clock(p.startTime,p.total)}.`;
    $('pack-description').textContent = `${p.blocks.filter(b=>b.kind==='activity').length} activities and ${p.resources.length} printable worksheet templates, with your chosen timings.`;
    $('download-btn').disabled = $('preview-btn').disabled = !valid;
    document.querySelectorAll('[data-budget]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.budget)===p.budget)));
    $('time-budget').setAttribute('aria-invalid',String(!Number.isInteger(p.budget)||p.budget<30||p.budget>1440));
    $('start-time').setAttribute('aria-invalid',String(!/^([01]\d|2[0-3]):[0-5]\d$/.test(p.startTime)));
  }
  function renderAll() {
    const r = recipe(), s = settings();
    renderRecipes();
    $('workshop-title').value = s.title;
    $('start-time').value = s.startTime;
    $('time-budget').value = s.budget;
    $('workshop-notes').value = s.notes;
    $('route-output').textContent = r.output;
    $('route-audience').textContent = r.audience;
    document.querySelector('.notes-details').open = Boolean(s.notes);
    $('route-limitations').textContent = r.limitations;
    $('preparation-list').innerHTML = r.preparation.map(text=>`<li>${escape(text)}</li>`).join('');
    renderAgenda(); renderSummary(); save();
  }
  function worksheetHTML(resource) {
    return `<h3>${escape(resource.title)}</h3><p>${escape(resource.description)}</p>${resource.prompts?.length?`<ul>${resource.prompts.map(text=>`<li>${escape(text)}</li>`).join('')}</ul>`:''}<table class="worksheet"><thead><tr>${resource.columns.map(col=>`<th>${escape(col)}</th>`).join('')}</tr></thead><tbody>${Array.from({length:resource.rows||4},()=>`<tr>${resource.columns.map(()=>'<td>&nbsp;</td>').join('')}</tr>`).join('')}</tbody></table><p class="doc-meta">Resource ${escape(resource.id)} · Prototype template. Add verified country evidence where required.</p>`;
  }
  function documentHTML(plan) {
    return `<h1>${escape(plan.title)}</h1><p class="doc-meta">${escape(plan.recipeTitle)} · ${escape(plan.audience)}<br>${escape(plan.process)}<br>Start ${escape(plan.startTime)} · Planned ${plan.total} minutes · Available ${plan.budget} minutes</p><p class="doc-notice">Illustrative NLF workshop plan. Timings and activity variants need testing. Supplied worksheets are draft templates; the trainer must prepare the country evidence and cases listed below.</p>${plan.warnings.map(text=>`<p class="doc-notice">${escape(text)}</p>`).join('')}<h2>Purpose and scope</h2><p>${escape(plan.description)}</p><p><strong>Intended output:</strong> ${escape(plan.output)}</p><p>${escape(plan.limitations)}</p>${plan.notes?`<h2>Notes for this group</h2><p class="doc-note">${escape(plan.notes)}</p>`:''}<h2>Preparation</h2><ul>${plan.preparation.map(text=>`<li>${escape(text)}</li>`).join('')}</ul><h2>Learning focus</h2><ul>${plan.objectives.map(o=>`<li><strong>${escape(o.id)}</strong> ${escape(o.label)}</li>`).join('')}</ul><p class="doc-meta">Coverage indicates planned practice, not certified competence or institutional approval.</p><h2>Timed runsheet</h2><table class="agenda-table"><thead><tr><th>Time</th><th>Min</th><th>Activity</th><th>Output</th></tr></thead><tbody>${plan.blocks.map(block=>`<tr><td>${escape(block.start)}–${escape(block.end)}</td><td>${block.minutes}</td><td><strong>${escape(block.title)}</strong><br>${escape(block.variantTitle)}</td><td>${escape(block.output)}</td></tr>`).join('')}</tbody></table><h2>Facilitator guidance</h2>${plan.blocks.filter(b=>b.kind==='activity').map(block=>`<section class="doc-block"><h3>${escape(block.title)} · ${block.minutes} minutes</h3><p>${escape(block.variantTitle)}. ${escape(block.description)}</p><ol>${(block.steps||[]).map(text=>`<li>${escape(text)}</li>`).join('')}</ol><p><strong>Output:</strong> ${escape(block.output)}</p>${block.debrief?.length?`<p><strong>Debrief questions</strong></p><ul>${block.debrief.map(text=>`<li>${escape(text)}</li>`).join('')}</ul>`:''}<p class="doc-meta">Learning focus: ${(block.objectives||[]).map(escape).join(', ')}<br>Resources: ${(block.materials||[]).map(id=>escape(resources.find(r=>r.id===id)?.title||id)).join('; ')}</p></section>`).join('')}${plan.resources.map(resource=>`<section><h2 class="worksheet-title">Participant worksheet</h2>${worksheetHTML(resource)}</section>`).join('')}<h2>Source and use notes</h2><p class="doc-meta">Adapted from the two supplied draft LO and activity summaries for Political Ownership and Anchoring, Processes 1 and 2. These are prototype recipes, not reviewed or approved training materials. Check against the current NLF handbook and adapt with appropriate support before use.</p>`;
  }
  let undoAction = null;
  function toast(message,undo) {
    $('toast-message').textContent=message;
    undoAction=undo || null;
    $('undo-btn').hidden=!undoAction;
    $('toast').classList.add('visible');
    clearTimeout(toast.timer);
    toast.timer=setTimeout(()=>{$('toast').classList.remove('visible');undoAction=null;$('undo-btn').hidden=true;},undo?10000:4200);
  }
  $('undo-btn').addEventListener('click',()=>{if(undoAction){undoAction();toast('Your previous plan is restored.');}});
  document.querySelector('.time-presets').addEventListener('click',event=>{
    const button=event.target.closest('[data-budget]');if(!button)return;
    settings().budget=Number(button.dataset.budget);$('time-budget').value=settings().budget;save();renderSummary();
  });
  function info(title,html) { $('info-title').textContent=title;$('info-content').innerHTML=html;if(!$('info-dialog').open)$('info-dialog').showModal(); }
  $('recipes').addEventListener('click',event=>{const target=event.target.closest('[data-recipe]');if(!target || target.dataset.recipe===state.active)return;state.active=target.dataset.recipe;renderAll();document.querySelector(`[data-recipe="${state.active}"]`)?.focus({preventScroll:true});});
  $('agenda').addEventListener('change',event=>{const el=event.target,s=settings();if(el.dataset.variant)s.selections[el.dataset.variant].variant=el.value;if(el.dataset.enable)s.selections[el.dataset.enable].enabled=el.checked;save();renderAgenda();renderSummary();});
  $('agenda').addEventListener('click',event=>{const target=event.target.closest('[data-resource]');if(!target)return;const resource=resources.find(r=>r.id===target.dataset.resource);if(resource)info('Worksheet preview',worksheetHTML(resource));});
  for(const [id,field] of [['workshop-title','title'],['start-time','startTime'],['time-budget','budget'],['workshop-notes','notes']]) {
    $(id).addEventListener('input',event=>{settings()[field]=field==='budget'?Number(event.target.value):event.target.value;save();if(field==='startTime')renderAgenda();renderSummary();});
  }
  $('reset-btn').addEventListener('click',()=>{const id=state.active,previous=JSON.parse(JSON.stringify(settings()));state.workshops[id]=defaults(recipe());renderAll();toast('Recipe reset to its starting plan.',()=>{state.workshops[id]=previous;if(state.active===id)renderAll();else save();});});
  $('download-btn').addEventListener('click',()=>{
    if(!validSettings())return;
    try{if(!window.NLFExport)throw new Error('Exporter unavailable');const plan=getPlan();window.NLFExport.downloadDocx(plan);toast(plan.total>plan.budget?'Word pack downloaded with the time warning included.':'Your editable Word pack has been downloaded.');}
    catch(error){console.error(error);toast('The Word download could not start. Try Preview & print, or keep all prototype files together.');}
  });
  $('preview-btn').addEventListener('click',()=>{if(!validSettings())return;$('preview-content').innerHTML=documentHTML(getPlan());$('preview-dialog').showModal();});
  $('print-btn').addEventListener('click',()=>{$('print-content').innerHTML=documentHTML(getPlan());window.print();});
  window.addEventListener('beforeprint',()=>{$('print-content').innerHTML=documentHTML(getPlan());});
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>$(button.dataset.close).close()));
  for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  $('about-btn').addEventListener('click',()=>info('A recipe, then your decisions',`<p>This is a basic demonstration of the first proposed model: start with a reviewed workshop route, then swap compatible activities. The routes here are <strong>illustrative drafts</strong>; they have not yet been reviewed or piloted.</p><h3>Try the full flow</h3><ol><li>Choose one of the three recipes.</li><li>Set your available time and choose activity variants.</li><li>Read the facilitator notes or preview a worksheet.</li><li>Download an editable Word pack or print to PDF.</li></ol><h3>What this version does</h3><p>Keeps the sequence and essential blocks in place, recalculates timings, flags an overfull agenda, saves your choices on this device and includes the selected worksheets in your download.</p><h3>What still needs preparing</h3><p>Country evidence, case facts, role cards and current handbook materials must be supplied by the trainer as described in each recipe. The prototype provides blank worksheet templates. It does not include official handbook extracts, approve a training plan or certify learning.</p><p>No AI, account or internet connection is required. Your entries stay in this browser; they are not sent to a server. Word edits do not update the builder.</p>`));
  $('sources-btn').addEventListener('click',()=>info('Sources & assumptions',`<p>The sample content is adapted from your draft learning objectives and activities for:</p><ul><li><strong>Process 1:</strong> Institutional Anchoring and Political Mobilisation.</li><li><strong>Process 2:</strong> Scoping and Capacity Diagnostics.</li></ul><p>The original files are “NLF Capacity Building - summary .md” and “NLF Capacity Building - summary  (1).md”. The workshop-builder options proposal supplies the recipe concept.</p><h3>Design assumptions</h3><ul><li>Timings are estimates for a small in-person workshop and need a dry run.</li><li>Shorter variants reduce the depth of practice; they do not imply equivalent proficiency.</li><li>Breaks, buffers and preparation are visible. Optional extensions can be removed.</li><li>Trainer rehearsal includes facilitation, observation and feedback. Country workshops focus on the shared content objectives.</li><li>Country proposals and readiness findings need the appropriate institutional validation outside the workshop.</li></ul><p>Sample content version 1 · September 2026.</p>`));
  window.NLFBuilder = {getPlan};
  renderAll();
})();
