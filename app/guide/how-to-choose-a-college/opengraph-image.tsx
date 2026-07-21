import { renderGuideOg } from "@/lib/guideOg";

export const alt = "How to Choose a College — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("How to Choose a College");
}
