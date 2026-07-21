import { renderGuideOg } from "@/lib/guideOg";

export const alt = "Harvard vs Stanford vs MIT — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("Harvard vs Stanford vs MIT");
}
