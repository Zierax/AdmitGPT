import { SITE_ORIGIN } from "@/lib/siteConfig";

interface QuickAnswerProps {
  /** Self-contained 134–167 word answer, citable by AI search (AI Overviews, ChatGPT, Perplexity). */
  children: React.ReactNode;
}

/**
 * A self-contained, quotable answer block placed near the top of a guide.
 * Structured (semantic <section> + <p>) so generative engines can extract it
 * without surrounding context. Keep the body 134–167 words.
 */
export function QuickAnswer({ children }: QuickAnswerProps) {
  return (
    <section
      aria-label="Quick answer"
      itemProp="mainEntity"
      style={{
        margin: "24px 0 36px",
        padding: "20px 22px",
        borderRadius: 14,
        border: "1px solid var(--color-border)",
        background: "var(--color-surface, rgba(255,255,255,0.03))",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-primary)",
          marginBottom: 10,
        }}
      >
        Quick answer
      </div>
      <p
        style={{
          fontSize: 15.5,
          lineHeight: 1.75,
          color: "var(--color-foreground)",
          margin: 0,
          maxWidth: "68ch",
        }}
        itemProp="text"
      >
        {children}
      </p>
    </section>
  );
}
