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
    assert.ok(title.length >= 30 && title.length <= 65, `${route} has an unsuitable title length`);
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

    const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
    for (const image of images) {
      assert.match(image, /\balt=["'][^"']+["']/i, `${route} has an image without useful alt text`);
      assert.match(image, /\bwidth=["']?\d+/i, `${route} has an image without a width`);
      assert.match(image, /\bheight=["']?\d+/i, `${route} has an image without a height`);
    }
  }
});

test("robots and sitemap expose every canonical route", () => {
  assert.ok(existsSync(join(outputRoot, "robots.txt")), "robots.txt is missing");
  assert.ok(existsSync(join(outputRoot, "sitemap.xml")), "sitemap.xml is missing");

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

test("llms.txt describes the official IDSSPL website and products", () => {
  const llmsFile = join(outputRoot, "llms.txt");
  assert.ok(existsSync(llmsFile), "llms.txt is missing");

  const llms = readFileSync(llmsFile, "utf8");
  assert.match(llms, /^# IDSSPL Technologies Private Limited/m);
  assert.match(llms, /https:\/\/www\.idsspl\.com\/products\/next-gen-ai-core-banking/);
  assert.match(llms, /https:\/\/www\.idsspl\.com\/products\/card-management/);
});

test("dark mode is the default regardless of device theme", () => {
  const html = readFileSync(join(outputRoot, "index.html"), "utf8");

  assert.match(html, /<html[^>]+class=["']dark["'][^>]+data-theme=["']dark["']/i);
  assert.ok(
    html.includes('var theme=saved==="light"||saved==="dark"?saved:"dark"'),
    "theme bootstrap must default to dark when no preference is saved",
  );
  assert.ok(
    !html.includes('matchMedia("(prefers-color-scheme: dark)")'),
    "theme bootstrap must not follow the device color scheme",
  );
});
