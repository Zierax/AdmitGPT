interface GuideFAQProps {
  items: { q: string; a: string }[];
}

/**
 * A visible, citable FAQ block at the end of a guide. AI search engines
 * (ChatGPT, Perplexity, AI Overviews) heavily cite Q&A-formatted content.
 * Rendered as plain semantic HTML so it is extractable without schema.
 */
export function GuideFAQ({ items }: GuideFAQProps) {
  return (
    <section className="tp-section" aria-label="Frequently asked questions">
      <h2 className="tp-h2">Frequently asked questions</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "16px 18px",
              borderRadius: 12,
              border: "1px solid var(--color-border)",
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-foreground)",
                margin: "0 0 8px",
                lineHeight: 1.4,
              }}
            >
              {item.q}
            </h3>
            <p
              className="ag-muted"
              style={{ fontSize: 14.5, lineHeight: 1.75, margin: 0 }}
            >
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
