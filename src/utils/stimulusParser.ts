export type StimulusSegment =
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'arabic';
      content: string;
    }
  | {
      type: 'table';
      headers: string[];
      rows: string[][];
    };

const ARABIC_CHAR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

function isPipeTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2;
}

function isMarkdownTableSeparator(cells: string[]): boolean {
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c.trim()));
}

function splitPipeRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
}

/**
 * Parses a question stimulus string into structured segments:
 * - 'table' for pipe-delimited tables (| Kolom 1 | Kolom 2 |)
 * - 'arabic' for lines containing vocalized Arabic Qur'an/Hadis text
 * - 'text' for standard narrative, introductory sentences, or numbered statements
 */
export function parseStimulusSegments(stimulus: string): StimulusSegment[] {
  if (!stimulus || !stimulus.trim()) {
    return [];
  }

  const lines = stimulus.split(/\r?\n/);
  const segments: StimulusSegment[] = [];
  let textBuffer: string[] = [];
  let tableBuffer: string[] = [];

  const flushTextBuffer = () => {
    if (textBuffer.length > 0) {
      segments.push({
        type: 'text',
        content: textBuffer.join('\n'),
      });
      textBuffer = [];
    }
  };

  const flushTableBuffer = () => {
    if (tableBuffer.length > 0) {
      const parsedRows = tableBuffer
        .map(splitPipeRow)
        .filter((cells) => !isMarkdownTableSeparator(cells));

      if (parsedRows.length >= 2) {
        segments.push({
          type: 'table',
          headers: parsedRows[0],
          rows: parsedRows.slice(1),
        });
      } else if (parsedRows.length === 1) {
        segments.push({
          type: 'table',
          headers: [],
          rows: parsedRows,
        });
      }
      tableBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      continue;
    }

    if (isPipeTableRow(line)) {
      flushTextBuffer();
      tableBuffer.push(line);
      continue;
    }

    flushTableBuffer();

    if (ARABIC_CHAR_REGEX.test(line)) {
      flushTextBuffer();
      segments.push({
        type: 'arabic',
        content: line.trim(),
      });
      continue;
    }

    textBuffer.push(line);
  }

  flushTableBuffer();
  flushTextBuffer();

  return segments;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Renders a stimulus string into rich HTML (with real <table> borders for pipe tables
 * and right-to-left Arabic typography for Qur'an/Hadis verses) for Word (.doc) and Rich Text Clipboard.
 */
export function renderStimulusHtmlString(stimulus: string): string {
  const segments = parseStimulusSegments(stimulus);
  if (segments.length === 0) return '';

  return segments
    .map((seg) => {
      if (seg.type === 'table') {
        const theadHtml =
          seg.headers.length > 0
            ? `<thead>
                <tr style="background-color:#f1f5f9; font-weight:bold;">
                  ${seg.headers
                    .map(
                      (h, idx) =>
                        `<th style="border:1px solid #000000; padding:4pt 6pt; text-align:${
                          idx === 0 && h.length <= 6 ? 'center' : 'left'
                        };">${escapeHtml(h)}</th>`
                    )
                    .join('')}
                </tr>
              </thead>`
            : '';

        const tbodyHtml = `<tbody>
          ${seg.rows
            .map(
              (row) =>
                `<tr>
                  ${row
                    .map(
                      (cell, idx) =>
                        `<td style="border:1px solid #000000; padding:4pt 6pt; vertical-align:top; text-align:${
                          idx === 0 && cell.length <= 4 ? 'center' : 'left'
                        };">${escapeHtml(cell)}</td>`
                    )
                    .join('')}
                </tr>`
            )
            .join('')}
        </tbody>`;

        return `<table style="width:100%; border-collapse:collapse; border:1px solid #000000; margin-top:4pt; margin-bottom:6pt; font-family:'Times New Roman', Times, serif; font-size:11pt;">
          ${theadHtml}
          ${tbodyHtml}
        </table>`;
      }

      if (seg.type === 'arabic') {
        return `<div dir="rtl" style="margin:6pt 0; text-align:right; font-family:'Traditional Arabic', 'Amiri', 'Times New Roman', serif; font-size:16pt; line-height:1.9; font-weight:bold;">${escapeHtml(
          seg.content
        )}</div>`;
      }

      return `<div style="margin-bottom:4pt; text-align:justify; line-height:1.45;">${escapeHtml(
        seg.content
      ).replace(/\n/g, '<br/>')}</div>`;
    })
    .join('');
}
