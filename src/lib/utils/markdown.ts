// Minimal markdown converter for trusted content (headers, bold, italics, lists, paragraphs)
export function renderMarkdown(md: string): string {
  // Normalize line endings
  md = md.replace(/\r\n?/g, '\n').trim();

  // Escape HTML minimally (content is trusted, but avoid accidents)
  md = md.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string));

  // Restore markdown syntax markers that should not be escaped inside our replacements
  // We'll convert inline first, then block structures.

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
      if (/^<h\d|^<ul>|^<\/ul>|^<li>|^<blockquote>|^<p>|^<details>|^<summary>/.test(block)) {
        return block;
      }
      return `<p class=\"mt-2\">${block.replace(/\n/g, '<br/>')}<\/p>`;
    })
    .join('\n');

  return html;
}
