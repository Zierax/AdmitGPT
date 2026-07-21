import { renderGuideOg } from "@/lib/guideOg";

export const alt = "College Application Checklist — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("College Application Checklist");
}
