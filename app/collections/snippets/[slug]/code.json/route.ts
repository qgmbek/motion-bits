import { codeToHtml } from "shiki";
import { ANIMATIONS_BY_ID, type AnimationSlug } from "../../../../animations/registry";
import { ANIMATION_USAGE } from "../../../../animations/usage";

// Next exports one JSON file per animation; no handler runs on the static host.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ANIMATIONS_BY_ID).map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!Object.hasOwn(ANIMATIONS_BY_ID, slug)) {
    return new Response(null, { status: 404 });
  }

  const animation = ANIMATIONS_BY_ID[slug as AnimationSlug];
  const usage = ANIMATION_USAGE[slug as AnimationSlug];
  const [code, css, usageHtml] = await Promise.all([
    codeToHtml(animation.code, { lang: "tsx", theme: "aurora-x" }),
    animation.css
      ? codeToHtml(animation.css, { lang: "css", theme: "aurora-x" })
      : null,
    codeToHtml(usage.code, { lang: "tsx", theme: "aurora-x" }),
  ]);

  return Response.json({ code, css, usage: usageHtml });
}
