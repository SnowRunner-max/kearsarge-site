// Minimal markdown converter for trusted content (headers, bold, italics, lists, paragraphs)
export function renderMarkdown(md: string): string {
  // Normalize line endings
  md = md.replace(/\r\n?/g, '\n').trim();

  // Escape HTML minimally (content is trusted, but avoid accidents)
  md = md.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string));

  // Restore markdown syntax markers that should not be escaped inside our replacements
  // We'll convert inline first, then block structures.

  // Inline images (![alt](src))
  const escapeAttribute = (value: string): string =>
    value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const isAllowedSrc = (rawSrc: string): boolean => {
    const trimmed = rawSrc.trim();
    if (!trimmed || trimmed.startsWith('//')) {
      return false;
    }

    const schemeMatch = trimmed.match(/^[a-zA-Z][\w+.-]*:/);
    if (!schemeMatch) {
      return true;
    }

    const scheme = schemeMatch[0].slice(0, -1).toLowerCase();
    return scheme === 'http' || scheme === 'https';
  };

  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, body) => {
    let altText = alt;
    const classes = ['md-image'];

    if (altText.includes('|right')) {
      altText = altText.replace(/\|right/g, '').trim();
      classes.push('md-image-right');
    }

    const trimmedBody = body.trim();
    const titleMatch = trimmedBody.match(/\s+"([^"]+)"\s*$/);
    const title = titleMatch ? titleMatch[1] : '';
    const src = titleMatch
      ? trimmedBody.slice(0, trimmedBody.length - titleMatch[0].length).trim()
      : trimmedBody;

    const cleanAlt = escapeAttribute(altText);
    const classAttr = ` class="${classes.join(' ')}"`;

    if (!src || /\s/.test(src) || !isAllowedSrc(src)) {
      const placeholderLabel = cleanAlt || 'Unsupported image reference';
      return `<span${classAttr} data-md-image-placeholder="true" aria-label="${placeholderLabel}"></span>`;
    }

    const cleanSrc = escapeAttribute(src);
    const cleanTitle = title ? escapeAttribute(title) : '';
    const titleAttr = cleanTitle ? ` title="${cleanTitle}"` : '';

    return `<img src="${cleanSrc}" alt="${cleanAlt}" loading="lazy"${classAttr}${titleAttr} />`;
  });

  // Inline strong (**bold**)
  md = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1<\/strong>');
  // Inline em (*italic*) — avoid matching inside strong we just emitted
  md = md.replace(/(^|[^*])\*(?!\*)([^\n*][\s\S]*?)\*(?!\*)/g, '$1<em>$2<\/em>');

  // Block: headers at line start
  md = md.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-semibold mt-4">$1<\/h6>')
         .replace(/^#####\s+(.+)$/gm, '<h5 class="text-base font-semibold mt-4">$1<\/h5>')
         .replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-semibold mt-4">$1<\/h4>')
         .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold mt-4">$1<\/h3>')
         .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-semibold mt-4">$1<\/h2>')
         .replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold mt-4">$1<\/h1>');

  // Block: unordered lists (consecutive - item lines)
  md = md.replace(/(^|\n)(-\s+.*(?:\n-\s+.*)*)/g, (_m, prefix, list) => {
    const items = list
      .split(/\n/)
      .map((line: string) => line.replace(/^-\s+/, ''))
      .map((text: string) => `<li class=\"mt-1\">${text}<\/li>`) 
      .join('');
    return `${prefix}<ul class=\"list-disc pl-6 mt-2\">${items}<\/ul>`;
  });

  // Paragraphs: wrap leftover text blocks separated by blank lines
  const lines = md.split(/\n\n+/);
  const html = lines
    .map((block) => {
      if (/^<h\d|^<ul>|^<\/ul>|^<li>|^<blockquote>|^<p>|^<details>|^<summary>|^<img|^<span/.test(block)) {
        return block;
      }
      return `<p class=\"mt-2\">${block.replace(/\n/g, '<br/>')}<\/p>`;
    })
    .join('\n');

  return html;
}
