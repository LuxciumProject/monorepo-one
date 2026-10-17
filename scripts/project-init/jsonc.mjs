// Dependency-free JSONC reader and comment-preserving root-array insertion.
export function tokenize(text) {
  const tokens = [];
  for (let i = 0; i < text.length;) {
    const start = i;
    if (/\s/.test(text[i])) { i++; continue; }
    if (text.slice(i, i + 2) === '//') { i = text.indexOf('\n', i); if (i < 0) break; continue; }
    if (text.slice(i, i + 2) === '/*') {
      const end = text.indexOf('*/', i + 2);
      if (end < 0) throw new Error('Unclosed JSONC comment');
      i = end + 2; continue;
    }
    if (text[i] === '"') {
      i++;
      while (i < text.length && text[i] !== '"') { if (text[i] === '\\') i++; i++; }
      if (i === text.length) throw new Error('Unclosed JSONC string');
      i++; tokens.push({ start, end: i, raw: text.slice(start, i), kind: 'string' }); continue;
    }
    if ('{}[]:,'.includes(text[i])) { i++; tokens.push({ start, end: i, raw: text[start] }); continue; }
    const match = /^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(text.slice(i));
    if (!match) throw new Error(`Invalid JSONC at offset ${i}`);
    i += match[0].length; tokens.push({ start, end: i, raw: match[0] });
  }
  return tokens;
}

export function parseJsonc(text) {
  const tokens = tokenize(text);
  const normalized = tokens.filter((t, i) => !(t.raw === ',' && ['}', ']'].includes(tokens[i + 1]?.raw)))
    .map(t => t.raw).join(' ');
  return JSON.parse(normalized);
}

export function appendRootArray(text, key, entry) {
  const data = parseJsonc(text);
  if (!Array.isArray(data[key])) throw new Error(`Missing root array: ${key}`);
  const tokens = tokenize(text);
  let depth = 0, start = -1;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (depth === 1 && t.kind === 'string' && JSON.parse(t.raw) === key && tokens[i + 1]?.raw === ':') {
      if (tokens[i + 2]?.raw !== '[') throw new Error(`Not an array: ${key}`);
      start = i + 2; break;
    }
    if (['{', '['].includes(t.raw)) depth++;
    if (['}', ']'].includes(t.raw)) depth--;
  }
  if (start < 0) throw new Error(`Root array not found: ${key}`);
  let n = 1, end = start + 1;
  for (; end < tokens.length; end++) {
    if (['{', '['].includes(tokens[end].raw)) n++;
    if (['}', ']'].includes(tokens[end].raw)) n--;
    if (!n) break;
  }
  const prev = tokens[end - 1];
  const needsComma = prev.raw !== '[' && prev.raw !== ',';
  const item = JSON.stringify(entry, null, 2).split('\n').map(line => `    ${line}`).join('\n');
  let changed = text.slice(0, tokens[end].start) + '\n' + item + '\n  ' + text.slice(tokens[end].start);
  if (needsComma) changed = changed.slice(0, prev.end) + ',' + changed.slice(prev.end);
  const result = parseJsonc(changed);
  if (result[key].length !== data[key].length + 1) throw new Error('JSONC insertion verification failed');
  return changed;
}
