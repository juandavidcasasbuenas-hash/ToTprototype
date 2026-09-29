/* Offline DOCX export. No libraries, service calls or remote assets required. */
(function (global) {
  'use strict';

  const NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const WIDTH = 9866;
  const encoder = new TextEncoder();
  const list = value => Array.isArray(value) ? value : [];
  const xml = value => String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const clean = value => String(value == null ? '' : value).trim();

  function run(text, props) {
    return '<w:r>' + (props ? '<w:rPr>' + props + '</w:rPr>' : '') +
      String(text == null ? '' : text).split(/\r?\n/).map((line, i) =>
        (i ? '<w:br/>' : '') + '<w:t xml:space="preserve">' + xml(line) + '</w:t>'
      ).join('') + '</w:r>';
  }

  function paragraph(text, style, options) {
    options = options || {};
    const props = '<w:pStyle w:val="' + (style || 'Normal') + '"/>' +
      (options.pageBreak ? '<w:pageBreakBefore/>' : '') +
      (options.keep ? '<w:keepNext/>' : '') +
      (options.center ? '<w:jc w:val="center"/>' : '');
    return '<w:p><w:pPr>' + props + '</w:pPr>' + run(text, options.bold ? '<w:b/>' : '') + '</w:p>';
  }

  function field(label, value) {
    if (!clean(value)) return '';
    return '<w:p><w:pPr><w:pStyle w:val="Normal"/></w:pPr>' +
      run(label + ' ', '<w:b/>') + run(value) + '</w:p>';
  }

  function bullets(items) {
    return list(items).filter(item => clean(item)).map(item =>
      '<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/>' +
      '<w:numId w:val="1"/></w:numPr></w:pPr>' + run(item) + '</w:p>'
    ).join('');
  }

  function table(headers, rows, widths, blank) {
    if (!headers.length) return '';
    widths = widths || headers.map((_, i) => Math.floor(WIDTH / headers.length) +
      (i === headers.length - 1 ? WIDTH % headers.length : 0));
    const borders = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(edge =>
      '<w:' + edge + ' w:val="single" w:sz="4" w:color="D9D9D9"/>'
    ).join('');
    const all = [headers].concat(rows);
    return '<w:tbl><w:tblPr><w:tblW w:w="' + WIDTH + '" w:type="dxa"/>' +
      '<w:tblLayout w:type="fixed"/><w:tblBorders>' + borders + '</w:tblBorders>' +
      '<w:tblCellMar><w:top w:w="100" w:type="dxa"/><w:left w:w="110" w:type="dxa"/>' +
      '<w:bottom w:w="100" w:type="dxa"/><w:right w:w="110" w:type="dxa"/></w:tblCellMar>' +
      '</w:tblPr><w:tblGrid>' + widths.map(w => '<w:gridCol w:w="' + w + '"/>').join('') +
      '</w:tblGrid>' + all.map((row, rowIndex) => {
        const header = rowIndex === 0;
        return '<w:tr><w:trPr><w:cantSplit/>' +
          (header ? '<w:tblHeader/>' : '') +
          (blank && !header ? '<w:trHeight w:val="650" w:hRule="atLeast"/>' : '') +
          '</w:trPr>' + headers.map((_, columnIndex) => {
            const fill = header ? '34433E' : rowIndex % 2 === 0 ? 'F5F7F6' : 'FFFFFF';
            const alignment = !blank && columnIndex < 2 ? 'center' : 'left';
            return '<w:tc><w:tcPr><w:tcW w:w="' + widths[columnIndex] + '" w:type="dxa"/>' +
              '<w:shd w:val="clear" w:color="auto" w:fill="' + fill + '"/>' +
              '<w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr>' +
              '<w:pStyle w:val="TableText"/><w:jc w:val="' + alignment + '"/>' +
              '</w:pPr>' + run(row[columnIndex] || '', header ? '<w:b/><w:color w:val="FFFFFF"/>' : '') +
              '</w:p></w:tc>';
          }).join('') + '</w:tr>';
      }).join('') + '</w:tbl>' + paragraph('', 'Normal');
  }

  function documentXml(plan) {
    const blocks = list(plan.blocks);
    const resourceMap = new Map();
    list(plan.resources).forEach(resource => {
      if (!resourceMap.has(resource.id)) resourceMap.set(resource.id, resource);
    });
    const resources = Array.from(resourceMap.values());
    const objectives = list(plan.objectives);
    const parts = [];
    parts.push(paragraph(plan.title || 'NLF workshop facilitator pack', 'Title'));
    parts.push(paragraph('Facilitator runsheet and participant worksheets', 'Subtitle'));
    parts.push(paragraph('Prototype workshop plan. Activity durations and adaptations are estimates for trainer review. Confirm the sequence, local evidence and materials before delivery.', 'Notice'));
    if (plan.description) parts.push(paragraph(plan.description));
    parts.push(field('Recipe', plan.recipeTitle));
    parts.push(field('Process', plan.process));
    parts.push(field('Audience', plan.audience));
    parts.push(field('Workshop output', plan.output));
    parts.push(field('Time', 'Starts ' + (plan.startTime || 'to be confirmed') + ' · ' +
      (plan.total == null ? blocks.reduce((sum, block) => sum + (Number(block.minutes) || 0), 0) : plan.total) +
      ' minutes scheduled · ' + (plan.budget == null ? 'No time budget set' : plan.budget + ' minutes available')));
    if (plan.limitations) parts.push(field('Scope', Array.isArray(plan.limitations) ? plan.limitations.join(' ') : plan.limitations));

    if (list(plan.warnings).length) {
      parts.push(paragraph('Review before delivery', 'Heading1'));
      parts.push(bullets(plan.warnings));
    }
    if (objectives.length) {
      parts.push(paragraph('Learning objectives', 'Heading1'));
      parts.push(bullets(objectives.map(objective => objective.id + ' — ' + objective.label)));
    }
    if (list(plan.preparation).length) {
      parts.push(paragraph('Preparation', 'Heading1'));
      parts.push(bullets(plan.preparation));
    }
    if (clean(plan.notes)) {
      parts.push(paragraph('Trainer notes', 'Heading1'));
      parts.push(paragraph(plan.notes));
    }

    parts.push(paragraph('Workshop runsheet', 'Heading1', {pageBreak: true}));
    parts.push(paragraph('Use this agenda during delivery. Detailed activity guidance and the selected worksheets follow.'));
    parts.push(table(['Time', 'Min', 'Activity', 'Output'], blocks.map(block => [
      [block.start, block.end].filter(Boolean).join('–'), String(block.minutes == null ? '' : block.minutes),
      block.title + (block.variantTitle ? '\n' + block.variantTitle : ''), block.output || (block.kind === 'break' ? 'Break' : '')
    ]), [1350, 600, 3716, 4200]));

    parts.push(paragraph('Activity guidance', 'Heading1', {pageBreak: true}));
    blocks.forEach((block, index) => {
      parts.push(paragraph((index + 1) + ' ' + block.title, 'Heading2'));
      parts.push(paragraph([block.start && block.end ? block.start + '–' + block.end : '',
        block.minutes + ' minutes', block.variantTitle].filter(Boolean).join(' · '), 'Caption'));
      if (block.description) parts.push(paragraph(block.description));
      if (list(block.objectives).length) parts.push(field('Objectives', block.objectives.join(', ')));
      if (list(block.materials).length) {
        parts.push(field('Resources', block.materials.map(id => {
          const resource = resourceMap.get(id);
          return resource ? resource.title + ' (' + id + ')' : id;
        }).join('; ')));
      }
      list(block.steps).forEach((step, stepIndex) => parts.push(paragraph((stepIndex + 1) + '. ' + step, 'Step')));
      if (list(block.debrief).length) {
        parts.push(paragraph('Debrief prompts', 'Label', {keep: true}));
        parts.push(bullets(block.debrief));
      }
      if (block.output) parts.push(field('Capture', block.output));
    });

    if (clean(plan.sourceNote) || clean(plan.contentVersion)) {
      parts.push(paragraph('Source and use notes', 'Heading1'));
      if (clean(plan.sourceNote)) parts.push(paragraph(plan.sourceNote));
      if (clean(plan.contentVersion)) parts.push(field('Content version', plan.contentVersion));
    }

    resources.forEach((resource, index) => {
      parts.push(paragraph('Worksheet ' + (index + 1) + ' ' + resource.title, 'Heading1', {pageBreak: true}));
      parts.push(paragraph('Resource ' + resource.id + ' · Name or group ____________________ · Date __________', 'Caption'));
      if (resource.description) parts.push(paragraph(resource.description));
      if (list(resource.prompts).length) parts.push(bullets(resource.prompts));
      const columns = list(resource.columns).length ? resource.columns : ['Notes and responses'];
      const count = Math.max(1, Math.min(12, Number(resource.rows) || 4));
      parts.push(table(columns, Array.from({length: count}, () => columns.map(() => '')), null, true));
      parts.push(paragraph('Next step or owner', 'Label'));
      parts.push(paragraph('____________________________________________________________________________'));
    });
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="' + NS + '" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<w:body>' + parts.join('') + '<w:sectPr><w:footerReference w:type="default" r:id="rId3"/>' +
      '<w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1020" w:right="1020" w:bottom="1020" w:left="1020" w:header="400" w:footer="500"/>' +
      '</w:sectPr></w:body></w:document>';
  }

  function stylesXml() {
    const style = (id, name, size, options) => {
      options = options || {};
      return '<w:style w:type="paragraph" w:styleId="' + id + '"><w:name w:val="' + name + '"/>' +
        (id !== 'Normal' ? '<w:basedOn w:val="Normal"/>' : '') + '<w:next w:val="Normal"/>' +
        '<w:pPr><w:spacing w:before="' + (options.before || 0) + '" w:after="' + (options.after == null ? 120 : options.after) +
        '" w:line="264" w:lineRule="auto"/>' + (options.keep ? '<w:keepNext/>' : '') +
        (options.level != null ? '<w:outlineLvl w:val="' + options.level + '"/>' : '') +
        (options.indent ? '<w:ind w:left="300"/>' : '') + '</w:pPr>' +
        '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:color w:val="000000"/>' +
        '<w:sz w:val="' + size + '"/>' + (options.bold ? '<w:b/>' : '') +
        (options.italic ? '<w:i/>' : '') + '</w:rPr></w:style>';
    };
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="' + NS + '">' +
      '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>' +
      '<w:sz w:val="21"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:widowControl/></w:pPr></w:pPrDefault></w:docDefaults>' +
      style('Normal', 'Normal', 21) + style('Title', 'Title', 46, {bold: true, after: 180, keep: true}) +
      style('Subtitle', 'Subtitle', 25, {after: 200, keep: true}) +
      style('Heading1', 'heading 1', 32, {bold: true, before: 260, after: 140, keep: true, level: 0}) +
      style('Heading2', 'heading 2', 25, {bold: true, before: 220, after: 100, keep: true, level: 1}) +
      style('Label', 'Label', 21, {bold: true, before: 80, after: 70, keep: true}) +
      style('Caption', 'Caption', 19, {after: 120, keep: true}) +
      style('Notice', 'Notice', 20, {italic: true, after: 180}) +
      style('ListParagraph', 'List Paragraph', 21, {after: 70}) +
      style('Step', 'Facilitation Step', 21, {after: 85, indent: true}) +
      style('TableText', 'Table Text', 19, {after: 25}) + '</w:styles>';
  }

  const crcTable = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) crc = crcTable[(crc ^ bytes[i]) & 255] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function zip(files) {
    const chunks = [], central = [];
    let offset = 0, centralLength = 0;
    const now = new Date();
    const time = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
    const date = ((Math.max(1980, now.getFullYear()) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    function header(size) {
      const bytes = new Uint8Array(size);
      const view = new DataView(bytes.buffer);
      return {bytes, u16: (at, value) => view.setUint16(at, value, true), u32: (at, value) => view.setUint32(at, value, true)};
    }
    files.forEach(([name, content]) => {
      const nameBytes = encoder.encode(name), data = encoder.encode(content), crc = crc32(data);
      const local = header(30);
      local.u32(0, 0x04034B50); local.u16(4, 20); local.u16(6, 0x0800); local.u16(10, time); local.u16(12, date);
      local.u32(14, crc); local.u32(18, data.length); local.u32(22, data.length); local.u16(26, nameBytes.length);
      chunks.push(local.bytes, nameBytes, data);
      const entry = header(46);
      entry.u32(0, 0x02014B50); entry.u16(4, 20); entry.u16(6, 20); entry.u16(8, 0x0800);
      entry.u16(12, time); entry.u16(14, date); entry.u32(16, crc); entry.u32(20, data.length); entry.u32(24, data.length);
      entry.u16(28, nameBytes.length); entry.u32(42, offset);
      central.push(entry.bytes, nameBytes);
      centralLength += 46 + nameBytes.length;
      offset += 30 + nameBytes.length + data.length;
    });
    const end = header(22);
    end.u32(0, 0x06054B50); end.u16(8, files.length); end.u16(10, files.length);
    end.u32(12, centralLength); end.u32(16, offset);
    return new Blob(chunks.concat(central, [end.bytes]), {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  }

  function buildDocxBlob(plan) {
    if (!plan || typeof plan !== 'object') throw new TypeError('A workshop plan is required.');
    const relNS = 'http://schemas.openxmlformats.org/package/2006/relationships';
    const officeRel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/';
    const typeBase = 'application/vnd.openxmlformats-officedocument.wordprocessingml.';
    return zip([
      ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
        [['document', 'document.main'], ['styles', 'styles'], ['numbering', 'numbering'], ['footer1', 'footer']].map(([name, type]) =>
          '<Override PartName="/word/' + name + '.xml" ContentType="' + typeBase + type + '+xml"/>').join('') + '</Types>'],
      ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + relNS + '"><Relationship Id="rId1" Type="' + officeRel + 'officeDocument" Target="word/document.xml"/></Relationships>'],
      ['word/document.xml', documentXml(plan)],
      ['word/styles.xml', stylesXml()],
      ['word/_rels/document.xml.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="' + relNS + '">' +
        '<Relationship Id="rId1" Type="' + officeRel + 'styles" Target="styles.xml"/>' +
        '<Relationship Id="rId2" Type="' + officeRel + 'numbering" Target="numbering.xml"/>' +
        '<Relationship Id="rId3" Type="' + officeRel + 'footer" Target="footer1.xml"/></Relationships>'],
      ['word/numbering.xml', '<?xml version="1.0" encoding="UTF-8"?><w:numbering xmlns:w="' + NS + '"><w:abstractNum w:abstractNumId="0">' +
        '<w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/>' +
        '<w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="300"/></w:tabs><w:ind w:left="300" w:hanging="220"/></w:pPr>' +
        '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr></w:lvl></w:abstractNum>' +
        '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>'],
      ['word/footer1.xml', '<?xml version="1.0" encoding="UTF-8"?><w:ftr xmlns:w="' + NS + '"><w:p><w:pPr><w:jc w:val="right"/></w:pPr>' +
        run('NLF workshop plan · ', '<w:sz w:val="18"/>') + '<w:fldSimple w:instr="PAGE"><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>']
    ]);
  }

  function downloadDocx(plan) {
    const blob = buildDocxBlob(plan);
    const filename = (clean(plan.title || plan.recipeTitle || 'NLF workshop plan')
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '').replace(/\s+/g, ' ').replace(/[. ]+$/g, '').slice(0, 100) || 'NLF workshop plan') + '.docx';
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return {filename, blob};
  }

  global.NLFExport = Object.freeze({downloadDocx, buildDocxBlob});
})(typeof window !== 'undefined' ? window : globalThis);
