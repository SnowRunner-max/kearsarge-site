import { describe, it, expect } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
  it('renders headers with classes', () => {
    const html = renderMarkdown('# Title');
    expect(html).toContain('<h1');
    expect(html).toContain('Title');
  });

  it('renders bold and italic', () => {
    const html = renderMarkdown('**bold** and *italic*');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<em>italic</em>');
  });

  it('renders unordered lists', () => {
    const md = ['- one', '- two'].join('\n');
    const html = renderMarkdown(md);
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('one</li>');
    expect(html).toContain('two</li>');
  });

  it('escapes HTML input', () => {
    const html = renderMarkdown('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script>');
  });
});

