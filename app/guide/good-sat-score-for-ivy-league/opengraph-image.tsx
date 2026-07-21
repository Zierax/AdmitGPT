import { renderGuideOg } from "@/lib/guideOg";

export const alt = "Good SAT Score for Ivy League Admission — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("Good SAT Score for Ivy League Admission");
}
