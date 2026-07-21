interface GuideTableProps {
  headers: string[];
  rows: (string | { text: string; strong?: boolean; primary?: boolean })[][];
  caption?: string;
}

type Cell = string | { text: string; strong?: boolean; primary?: boolean };

function renderCell(cell: Cell) {
  if (typeof cell === "string") return cell;
  if (cell.primary) {
    return <strong style={{ color: "var(--color-primary)" }}>{cell.text}</strong>;
  }
  if (cell.strong) return <strong>{cell.text}</strong>;
  return cell.text;
}

/**
 * A citable comparison/stat table. AI search engines (AI Overviews, Perplexity,
 * ChatGPT) extract tabular data at higher rates than prose — structured tables
 * are a genuine citability win for data-heavy guides.
 */
export function GuideTable({ headers, rows, caption }: GuideTableProps) {
  return (
    <div style={{ marginTop: 18, overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14.5,
          margin: 0,
        }}
      >
        {caption ? (
          <caption
            style={{
              textAlign: "left",
              fontSize: 12.5,
              fontStyle: "italic",
              color: "var(--color-muted)",
              paddingBottom: 8,
            }}
          >
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  color: "var(--color-foreground)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "10px 12px",
                    color: "var(--color-foreground)",
                    verticalAlign: "top",
                  }}
                >
                  {renderCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
