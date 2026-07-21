import { renderGuideOg } from "@/lib/guideOg";

export const alt = "Does Going Test-Optional Hurt Your Chances? — AdmitGPT Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGuideOg("Does Going Test-Optional Hurt Your Chances?");
}
