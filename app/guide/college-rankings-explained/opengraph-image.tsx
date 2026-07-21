import { renderGuideOg } from "@/lib/guideOg";

export const alt = "College Rankings Explained — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("College Rankings Explained");
}
