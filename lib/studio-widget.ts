import { SITE_URL } from "@/lib/content";
import { studio } from "@/lib/studio";

export type StudioWidgetChannel = "kit" | "linkedin";

const { primaryOffer, widget } = studio;

const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif";
const FONT_SERIF = "Charter, Georgia, Times, 'Times New Roman', serif";
const FONT_MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const NAVY = "#0b1623";
const GOLD = "#f0a11f";
const GOLD_INK = "#1a1206";
const SILVER = "#e4ebf1";
const SLATE = "#96a6b6";

export function studioWidgetUrl(channel: StudioWidgetChannel): string {
  const url = new URL(widget.href, SITE_URL);
  url.searchParams.set("utm_source", channel === "kit" ? "kit" : "linkedin");
  url.searchParams.set("utm_medium", channel === "kit" ? "email" : "social");
  url.searchParams.set("utm_campaign", "demo-sprint");
  url.searchParams.set("utm_content", "newsletter-widget");
  return url.toString();
}

export function studioWidgetIncludesLine(): string {
  return widget.includes.join(" · ");
}

export function studioWidgetLinkedInCaption(): string {
  const href = studioWidgetUrl("linkedin");

  return [
    "Studio",
    "",
    `${primaryOffer.name} — ${primaryOffer.priceLabel}`,
    "",
    widget.hook[0],
    widget.hook[1],
    "",
    widget.pitch,
    "",
    `${studioWidgetIncludesLine()}.`,
    "",
    `${widget.ctaLabel} → ${href}`,
  ].join("\n");
}

export function studioWidgetLinkedInAlt(): string {
  return `${primaryOffer.name}, ${primaryOffer.priceLabel}. ${widget.pitch}`;
}

/** 16:9 card for LinkedIn newsletter inserts. */
export function studioWidgetCardSvg(): string {
  const includes = studioWidgetIncludesLine();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="628" viewBox="0 0 1200 628" role="img" aria-labelledby="title desc">
  <title id="title">${escapeHtml(primaryOffer.name)}</title>
  <desc id="desc">${escapeHtml(studioWidgetLinkedInAlt())}</desc>
  <rect width="1200" height="628" fill="${NAVY}"/>
  <rect x="0" y="620" width="1200" height="8" fill="${GOLD}"/>
  <g transform="translate(1118 28) scale(0.22)" aria-hidden="true">
    <defs>
      <path id="segment" d="M138 30a98 98 0 0 1 88 88l-32 5a66 66 0 0 0-60-61z"/>
    </defs>
    <use href="#segment" fill="#F0A11F"/>
    <use href="#segment" transform="rotate(90 128 128)" fill="#E4EBF1"/>
    <use href="#segment" transform="rotate(180 128 128)" fill="#B8791C"/>
    <use href="#segment" transform="rotate(270 128 128)" fill="#96A6B6"/>
    <path fill="#F0A11F" d="M101 101h22v22h-22zm32 32h22v22h-22z"/>
    <path fill="#D9E2EA" d="M133 101h22v22h-22zm-32 32h22v22h-22z"/>
  </g>
  <text x="72" y="96" fill="${GOLD}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="16" font-weight="600" letter-spacing="3.2">STUDIO</text>
  <text x="1096" y="100" text-anchor="end" fill="${GOLD}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="32" font-weight="700" letter-spacing="-0.8">${escapeHtml(primaryOffer.priceLabel)}</text>
  <text x="72" y="186" fill="#ffffff" font-family="Inter, Arial, Helvetica, sans-serif" font-size="42" font-weight="700" letter-spacing="-1">${escapeHtml(primaryOffer.name)}</text>
  <text x="72" y="254" fill="${SILVER}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="24" font-weight="500">${escapeHtml(widget.hook[0])}</text>
  <text x="72" y="292" fill="${SILVER}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="24" font-weight="500">${escapeHtml(widget.hook[1])}</text>
  <text x="72" y="356" fill="${SLATE}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="22">${escapeHtml(widget.pitch)}</text>
  <text x="72" y="408" fill="${SILVER}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="18">${escapeHtml(includes)}</text>
  <rect x="72" y="456" width="268" height="54" rx="8" fill="${GOLD}"/>
  <text x="206" y="490" text-anchor="middle" fill="${GOLD_INK}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="17" font-weight="700">${escapeHtml(widget.ctaLabel)} →</text>
  <text x="72" y="560" fill="#60778a" font-family="Inter, Arial, Helvetica, sans-serif" font-size="16">technicaltrust.org/studio</text>
</svg>
`;
}

/** Email-safe table card for Kit broadcasts. */
export function studioWidgetEmailHtml(): string {
  const href = studioWidgetUrl("kit");
  const includes = studioWidgetIncludesLine();

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;margin:28px 0;border-collapse:collapse">
  <tr>
    <td style="padding:0">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;background-color:${NAVY}">
        <tr>
          <td bgcolor="${NAVY}" style="background-color:${NAVY};padding:28px 28px 26px 28px">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse">
              <tr>
                <td align="left" style="padding:0 12px 0 0;font-family:${FONT_MONO};font-size:12px;letter-spacing:0.14em;line-height:1.4;color:${GOLD}">
                  STUDIO
                </td>
                <td align="right" style="padding:0;font-family:${FONT_SANS};font-size:18px;font-weight:700;letter-spacing:-0.03em;line-height:1.2;color:${GOLD}">
                  ${escapeHtml(primaryOffer.priceLabel)}
                </td>
              </tr>
            </table>
            <h2 style="margin:18px 0 0 0;font-family:${FONT_SERIF};font-size:26px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;color:#ffffff">
              ${escapeHtml(primaryOffer.name)}
            </h2>
            <p style="margin:16px 0 0 0;font-family:${FONT_SANS};font-size:17px;line-height:1.45;color:${SILVER}">
              ${escapeHtml(widget.hook[0])}<br>
              ${escapeHtml(widget.hook[1])}
            </p>
            <p style="margin:14px 0 0 0;font-family:${FONT_SANS};font-size:16px;line-height:1.5;color:${SLATE}">
              ${escapeHtml(widget.pitch)}
            </p>
            <p style="margin:14px 0 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.5;color:${SILVER}">
              ${escapeHtml(includes)}
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 0 0;border-collapse:collapse">
              <tr>
                <td bgcolor="${GOLD}" style="background-color:${GOLD};border-radius:8px">
                  <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 18px;font-family:${FONT_SANS};font-size:15px;font-weight:600;line-height:1.2;color:${GOLD_INK};text-decoration:none">
                    ${escapeHtml(widget.ctaLabel)}&nbsp;&rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${GOLD}" height="4" style="background-color:${GOLD};height:4px;font-size:0;line-height:0">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
