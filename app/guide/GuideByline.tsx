import Image from "next/image";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/siteConfig";

interface GuideBylineProps {
  /** ISO date, e.g. "2026-01-15" */
  updated: string;
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function GuideByline({ updated }: GuideBylineProps) {
  const label = DATE_FMT.format(new Date(updated + "T00:00:00Z"));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "18px 0 28px",
        paddingBottom: 20,
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Image
        src="/assets/Ziad_Salah_Photo.jpg"
        alt="Ziad Salah, creator of AdmitGPT"
        width={40}
        height={40}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      <div style={{ fontSize: 13, lineHeight: 1.5 }}>
        <div style={{ color: "var(--color-foreground)", fontWeight: 600 }}>
          By{" "}
          <Link
            href="/about"
            rel="author"
            style={{ color: "var(--color-primary)", textDecoration: "none" }}
          >
            Ziad Salah
          </Link>
        </div>
        <div className="ag-muted">
          Creator of AdmitGPT &middot; Last reviewed{" "}
          <time dateTime={updated}>{label}</time>
        </div>
      </div>
    </div>
  );
}
