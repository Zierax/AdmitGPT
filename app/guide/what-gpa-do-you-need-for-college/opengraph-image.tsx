import { renderGuideOg } from "@/lib/guideOg";

export const alt = "What GPA Do You Need for College? — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("What GPA Do You Need for College?");
}
