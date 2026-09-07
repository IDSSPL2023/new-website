import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const outputRoot = join(process.cwd(), "dist", "client");
const routes = [
  "/",
  "/about",
  "/products",
  "/products/next-gen-ai-core-banking",
  "/products/npci-products",
  "/products/digital-banking-products",
  "/products/enterprise-solution",
  "/products/merchant-management-solution",
  "/products/card-management",
  "/leadership",
  "/team",
  "/privacy-policy",
  "/terms-conditions",
];

const count = (html, pattern) => [...html.matchAll(pattern)].length;
const attribute = (html, pattern) => html.match(pattern)?.[1] ?? "";

test("every public route has complete, singular SEO metadata", () => {
  for (const route of routes) {
    const file =
      route === "/" ? join(outputRoot, "index.html") : join(outputRoot, route, "index.html");
    assert.ok(existsSync(file), `missing prerendered page: ${route}`);

    const html = readFileSync(file, "utf8");
    const title = attribute(html, /<title>(.*?)<\/title>/i);
    const description = attribute(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i,
    );

    assert.equal(count(html, /<title>/gi), 1, `${route} must have one title`);
    assert.ok(title.length > 15 && title.length <= 65, `${route} has an unsuitable title length`);
    assert.equal(
      count(html, /name=["']description["']/gi),
      1,
      `${route} must have one description`,
    );
    assert.ok(
      description.length >= 70 && description.length <= 165,
      `${route} has an unsuitable description length`,
    );
    assert.equal(count(html, /rel=["']canonical["']/gi), 1, `${route} must have one canonical`);
    assert.equal(count(html, /property=["']og:image["']/gi), 1, `${route} must have an OG image`);
    assert.equal(
      count(html, /name=["']twitter:image["']/gi),
      1,
      `${route} must have a Twitter image`,
    );
    assert.equal(count(html, /<h1(?:\s|>)/gi), 1, `${route} must have one H1`);
    assert.ok(html.includes("application/ld+json"), `${route} must include structured data`);
  }
});

test("robots and sitemap expose every canonical route", () => {
  const robots = readFileSync(join(outputRoot, "robots.txt"), "utf8");
  const sitemap = readFileSync(join(outputRoot, "sitemap.xml"), "utf8");

  assert.match(robots, /Sitemap: https:\/\/www\.idsspl\.com\/sitemap\.xml/);
  assert.match(robots, /Disallow: \/api\//);

  for (const route of routes) {
    const canonical = new URL(route, "https://www.idsspl.com").href.replace(
      /\/$/,
      route === "/" ? "/" : "",
    );
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap is missing ${canonical}`);
  }
});
